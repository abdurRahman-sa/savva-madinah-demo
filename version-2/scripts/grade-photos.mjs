// Цветокоррекция фото блока «развилка» под палитру сайта.
// Оригиналы лежат в scripts/photo-originals, результат пишется в src/assets/photos.
// Запуск: node scripts/grade-photos.mjs <пресет>   пресеты: оригинал, мягкий, средний, сильный
//         node scripts/grade-photos.mjs --preview   все варианты в scripts/photo-grades для примерки в панели твиков
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const root = path.dirname(fileURLToPath(import.meta.url));
// Все фото блока «развилка»: забрать с собой, заказать, прийти (зал и веранда)
const files = ['takeaway-1', 'takeaway-2', 'order-1', 'order-2', 'order-3', 'order-4', 'hall-1', 'hall-2', 'terrace-1', 'terrace-2'];

// Цвета палитры: тени уходят в кофейный, света — в сливочный, поверх — тёплый песок
const coffeeDeep = [0x47, 0x30, 0x1f];
const cream = [0xf7, 0xef, 0xe0];
const linen = [0xf2, 0xeb, 0xdc];

// fade — насколько тени и света тянутся к кофейному и сливочному (0 — никак, 1 — полностью)
// saturation — насыщенность, cool — насколько гасим синеву (неон, бирюзовые подушки, холодный вечер)
// sand — плотность тёплого песочного слоя в режиме soft-light
const presets = {
  мягкий: { fade: 0.18, saturation: 0.92, cool: 0.05, sand: 0.12 },
  средний: { fade: 0.3, saturation: 0.84, cool: 0.1, sand: 0.22 },
  сильный: { fade: 0.42, saturation: 0.74, cool: 0.16, sand: 0.34 },
};

// Латинские имена папок для примерки: панель твиков подставляет их в адрес картинки
const folders = { оригинал: 'original', мягкий: 'soft', средний: 'medium', сильный: 'strong' };

async function grade(name, file, output) {
  const input = path.join(root, 'photo-originals', `${file}.jpg`);
  if (name === 'оригинал') {
    await sharp(input).toFile(output);
    return;
  }
  const p = presets[name];
  // out = тень + вход × (свет − тень) / 255; синий канал дополнительно приглушён
  const shadow = coffeeDeep.map((c) => c * p.fade);
  const light = cream.map((c) => 255 - (255 - c) * p.fade);
  const warm = [1 + p.cool * 0.3, 1, 1 - p.cool];
  const a = shadow.map((s, i) => ((light[i] - s) / 255) * warm[i]);

  const { width, height } = await sharp(input).metadata();
  const sandLayer = await sharp({
    create: { width, height, channels: 4, background: { r: linen[0], g: linen[1], b: linen[2], alpha: p.sand } },
  })
    .png()
    .toBuffer();

  await sharp(input)
    .modulate({ saturation: p.saturation })
    .linear(a, shadow)
    .composite([{ input: sandLayer, blend: 'soft-light' }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(output);
}

const arg = process.argv[2] ?? 'средний';
if (arg === '--preview') {
  for (const [name, folder] of Object.entries(folders)) {
    const dir = path.join(root, 'photo-grades', folder);
    await mkdir(dir, { recursive: true });
    for (const file of files) await grade(name, file, path.join(dir, `${file}.jpg`));
  }
  console.log('Готово: все варианты для примерки лежат в scripts/photo-grades.');
} else {
  if (!folders[arg]) {
    console.error(`Нет пресета «${arg}». Есть: ${Object.keys(folders).join(', ')}`);
    process.exit(1);
  }
  for (const file of files) await grade(arg, file, path.join(root, '..', 'src', 'assets', 'photos', `${file}.jpg`));
  console.log(`Готово: пресет «${arg}» применён к ${files.length} фото.`);
}
