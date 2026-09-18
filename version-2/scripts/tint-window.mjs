// Тонировка стекла в обоих арочных окнах на фото «зал 2»: за правым виден силуэт человека,
// левое тонируется так же, чтобы окна были одинаковыми.
// Дерево рамы остаётся как есть, стёкла размываются и темнеют, как тонированные.
// Исходник — hall-2-source.jpg (references/зал 2.avif, переведённый в JPEG через sips: sharp читает
// этот avif с другим кадрированием). Результат — photo-originals/hall-2.jpg, дальше grade-photos.mjs.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(root, 'photo-originals', 'hall-2-source.jpg');
const target = path.join(root, 'photo-originals', 'hall-2.jpg');

// Проёмы окон в пикселях оригинала 800×1422: полукруг сверху и прямоугольник ниже
// keep — что внутри проёма не трогать: дерево рамы (и листья растения перед левым окном)
const arches = [
  {
    // правое: рама светло-рыжая, стекло за ней красное — отличаем по зелёному каналу
    cx: 619, cy: 356, r: 80, left: 539, right: 698, bottom: 648,
    keep: (r, g, b) => r > g * 1.22 && g > r * 0.45 && b < g * 0.7 && r > 70,
  },
  {
    // левое: стекло серое, переплёты тёмно-коричневые, перед окном зелёные листья
    cx: 310, cy: 399, r: 44, left: 266, right: 354, bottom: 578,
    keep: (r, g, b) => r - b > 25 || (r + g + b) / 3 < 45 || (g > r * 1.2 && g > b * 1.5),
  },
];
const smoke = [74, 58, 48]; // тёплое тёмное стекло, в тон кофейного
const strength = 0.45;

const img = sharp(source).removeAlpha();
const { width, height } = await img.metadata();
const base = await img.clone().raw().toBuffer();
const blurred = await img.clone().blur(14).raw().toBuffer();

const archAt = (x, y) =>
  arches.find(
    (a) => x >= a.left && x <= a.right && y <= a.bottom && (y >= a.cy || (x - a.cx) ** 2 + (y - a.cy) ** 2 <= a.r ** 2),
  );

const wood = Buffer.alloc(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 3;
    const arch = archAt(x, y);
    if (arch && arch.keep(base[i], base[i + 1], base[i + 2])) wood[y * width + x] = 255;
  }
}
// раму защищаем с запасом в 1–2 пикселя, чтобы переплёты не истончались
const woodWide = await sharp(wood, { raw: { width, height, channels: 1 } }).blur(1.5).extractChannel(0).raw().toBuffer();

const mask = Buffer.alloc(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const p = y * width + x;
    if (archAt(x, y) && woodWide[p] < 40) mask[p] = 255;
  }
}
// мягкий край, чтобы не было ступенек у рамы
const soft = await sharp(mask, { raw: { width, height, channels: 1 } }).blur(1.2).extractChannel(0).raw().toBuffer();

const out = Buffer.from(base);
for (let p = 0; p < width * height; p++) {
  const m = soft[p] / 255;
  if (!m) continue;
  for (let c = 0; c < 3; c++) {
    const tinted = blurred[p * 3 + c] * (1 - strength) + smoke[c] * strength;
    out[p * 3 + c] = Math.round(base[p * 3 + c] * (1 - m) + tinted * m);
  }
}

await sharp(out, { raw: { width, height, channels: 3 } }).jpeg({ quality: 90, mozjpeg: true }).toFile(target);
console.log('Готово: стекло окна на «зал 2» тонировано.');
