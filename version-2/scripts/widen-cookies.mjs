// Фото «печенье стопкой» снято вплотную и в коллаже сильно режется сверху и снизу.
// Срезаем светлую полосу слева (5 px) и продолжаем стену влево до пропорций плитки коллажа (~0,84):
// печенье видно целиком по высоте и выглядит чуть дальше. Тёмные пиксели перчатки в фон не берём.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(root, 'photo-originals', 'cookies-stack.jpg');
const target = path.join(root, '..', 'src', 'assets', 'photos', 'cookies-stack.jpg');

const CUT = 5;
const RATIO = 0.84;
const SEAM = 40;

const meta = await sharp(source).metadata();
const w = meta.width - CUT;
const h = meta.height;
const add = Math.round(h * RATIO) - w;
const cropped = await sharp(source).extract({ left: CUT, top: 0, width: w, height: h }).raw().toBuffer();

// столбец стены: по каждой строке — пиксель у левого края, тёмные (перчатка) заменяем последним светлым
const column = Buffer.alloc(h * 3);
let last = [146, 148, 163];
for (let y = 0; y < h; y++) {
  const i = y * w * 3;
  const px = [cropped[i], cropped[i + 1], cropped[i + 2]];
  if ((px[0] + px[1] + px[2]) / 3 > 110) last = px;
  column.set(last, y * 3);
}
const wall = await sharp(column, { raw: { width: 1, height: h, channels: 3 } })
  .resize(add + SEAM, h, { fit: 'fill', kernel: 'nearest' })
  .blur(12)
  .png()
  .toBuffer();

// левые SEAM пикселей фото плавно проявляются поверх стены — шва не видно
const alpha = Buffer.alloc(w * h);
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) alpha[y * w + x] = Math.min(255, Math.round((x / SEAM) * 255));
const photo = await sharp(cropped, { raw: { width: w, height: h, channels: 3 } })
  .joinChannel(alpha, { raw: { width: w, height: h, channels: 1 } })
  .png()
  .toBuffer();

await sharp({ create: { width: w + add, height: h, channels: 3, background: { r: last[0], g: last[1], b: last[2] } } })
  .composite([
    { input: wall, left: 0, top: 0 },
    { input: photo, left: add, top: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(target);
console.log(`Готово: печенье ${w + add}×${h}, стена продлена на ${add} px.`);
