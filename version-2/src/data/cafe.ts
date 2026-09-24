// Факты о кафе — только проверенные (см. ../content-sources.md; сверено с Google Maps 2026-09-17).

export const cafe = {
  phone: '+966 56 437 0303',
  phoneHref: 'tel:+966564370303',
  instagramUrl: 'https://www.instagram.com/savva_cafe/',
  instagramHandle: '@savva_cafe',
  tiktokUrl:
    'https://www.tiktok.com/@savva_cafe?_t=8eScuanBsSg&_r=1&fbclid=PAcGRvZgRleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAwyNTYyODEwNDA1NTgAAadMhStWGKb7J7tdMGkXLqyh9Cq67dbV0DVc0CzLYlJVvNNZ5ERvG16dEMXzUw_aem_wRYA1x3U1YVLRYhWfaWxCw',
  tiktokHandle: '@savva_cafe',
  plusCode: 'FHVJ+3W Madinah',
  routeUrl: 'https://www.google.com/maps/dir/?api=1&destination=24.4926931,39.5823565',
  mapsUrl:
    'https://www.google.com/maps/place/%D8%B3%D8%A7%D9%81%D8%A7+savva%E2%80%AD/@24.4926931,39.5823565,17z/data=!3m1!4b1!4m6!3m5!1s0x15bdbf7c00dd71e3:0x8c75251d63b13c1!8m2!3d24.4926931!4d39.5823565',
  rating: '4.7',
  reviewCount: 730,
  // Темы отзывов в Google Maps: сколько отзывов упоминают тему.
  // «Атмосфера» объединяет 51 упоминание тишины и 12 упоминаний веранды.
  reviewTopics: { atmosphere: 63, cheesecake: 36, madiniCookies: 15 },
  timeZone: 'Asia/Riyadh',
  // Открытие в минутах от полуночи; пятница с 13:00, остальные дни с 6:30. Закрытие всегда в 02:00.
  opensAt: 390,
  opensAtFriday: 780,
  closesAt: 120,
};

export type MenuItem = {
  /** Ключ позиции для корзины: группа и имя, например cold-hibiscus */
  id?: string;
  ru: string;
  /** Арабское название — как в меню кафе */
  ar: string;
  en: string;
  /** Цена в SAR; нет цены — «у стойки» */
  price?: number;
  /** Цена диапазоном, как в меню (кофе дня) */
  priceText?: string;
  kcal?: number;
  /** Фото позиции: имя файла в src/assets/photos или src/assets/menu (без .jpg). Нет фото — плашка */
  photo?: string;
  /** Как кадрировать фото в карточке (object-position) */
  focus?: string;
};

// Всё меню — из хайлайта «Muno» в Instagram кафе (скриншоты references/меню, 2026-09-19);
// холодные напитки совпадают с фото меню в Google Maps. Калорийность — как в их меню.
// Фото привязаны только там, где позиция на кадре точно известна (подпись кафе или однозначный вид).
const cold = {
  americano: { en: 'Iced Americano', ru: 'Айс американо', ar: 'ايس أمريكانو', price: 15, kcal: 2, photo: 'iced-americano' },
  alfredo: { en: 'Alfredo', ru: 'Альфредо', ar: 'ألفريدو', price: 14, kcal: 100, photo: 'alfredo' },
  latte: { en: 'Iced Latte', ru: 'Айс латте', ar: 'ايس لاتيه', price: 17, kcal: 100, photo: 'iced-latte' },
  spanishLatte: { en: 'Iced Spanish Latte', ru: 'Айс спаниш латте', ar: 'ايس سبانيش لاتيه', price: 19, kcal: 230, photo: 'iced-spanish-latte' },
  matchaLatte: { en: 'Iced Matcha Latte', ru: 'Айс матча латте', ar: 'ايس ماتشا لاتيه', price: 17, kcal: 130, photo: 'iced-matcha-latte' },
  matchaSpanish: { en: 'Iced Matcha Spanish Latte', ru: 'Айс матча спаниш латте', ar: 'ايس ماتشا سبانيش لاتيه', price: 19, kcal: 230, photo: 'iced-matcha-spanish-latte' },
  savvaMatcha: { en: 'Savva Matcha', ru: 'Матча Savva', ar: 'سافا ماتشا', price: 22, kcal: 2, photo: 'savva-matcha' },
  matchaBerry: { en: 'Matcha Berry', ru: 'Матча берри', ar: 'ماتشا بيري', price: 24, kcal: 230, photo: 'matcha-berry-vs-melon', focus: '22% 60%' },
  iceTea: { en: 'Ice Tea Savva', ru: 'Холодный чай Savva', ar: 'ايس تي سافا', price: 17, kcal: 189, photo: 'savva-iced-tea' },
  hibiscus: { en: 'Ice Hibiscus Savva', ru: 'Каркаде Savva', ar: 'ايس كركديه سافا', price: 17, kcal: 180, photo: 'hibiscus-pour', focus: '50% 70%' },
  slush: { en: 'Hibiscus Slush Savva', ru: 'Слаш из каркаде Savva', ar: 'سلاش كركديه سافا', price: 17, kcal: 180, photo: 'hibiscus-slush' },
  shaken: { en: 'Ice Shaken', ru: 'Айс шейкен', ar: 'ايس شيكن', price: 20, kcal: 231, photo: 'ice-shaken' },
  whiteMocha: { en: 'Ice White Mocha', ru: 'Айс уайт мока', ar: 'ايس وايت موكا', price: 19, kcal: 230, photo: 'iced-white-mocha' },
  chocolate: { en: 'Ice Chocolate', ru: 'Холодный шоколад', ar: 'ايس شوكلت', price: 17, kcal: 230, photo: 'iced-chocolate' },
  melon: { en: 'Savva Melon', ru: 'Дыня Savva', ar: 'شمام سافا', price: 16, kcal: 50, photo: 'melon-drink' },
} satisfies Record<string, MenuItem>;

const hot = {
  espresso: { en: 'Espresso', ru: 'Эспрессо', ar: 'إسبريسو', price: 11, kcal: 2, photo: 'espresso' },
  americano: { en: 'Americano', ru: 'Американо', ar: 'أمريكانو', price: 12, kcal: 2, photo: 'americano' },
  cortado: { en: 'Cortado', ru: 'Кортадо', ar: 'كورتادو', price: 14, kcal: 50, photo: 'cortado' },
  macchiato: { en: 'Macchiato', ru: 'Макиато', ar: 'ميكاتو', price: 13, kcal: 13, photo: 'macchiato' },
  flatWhite: { en: 'Flat White', ru: 'Флэт уайт', ar: 'فلات وايت', price: 15, kcal: 50, photo: 'flat-white' },
  latte: { en: 'Latte', ru: 'Латте', ar: 'لاتيه', price: 16, kcal: 75, photo: 'latte' },
  cappuccino: { en: 'Cappuccino', ru: 'Капучино', ar: 'كابتشينو', price: 16, kcal: 60, photo: 'cappuccino', focus: '30% 75%' },
  spanishLatte: { en: 'Spanish Latte', ru: 'Спаниш латте', ar: 'سبانش لاتيه', price: 18, kcal: 178, photo: 'spanish-latte' },
  matchaLatte: { en: 'Matcha Latte', ru: 'Матча латте', ar: 'ماتشا لاتيه', price: 16, kcal: 75, photo: 'matcha-latte' },
  whiteMocha: { en: 'White Mocha', ru: 'Уайт мока', ar: 'وايت موكا', price: 16, kcal: 230, photo: 'white-mocha' },
  hotChocolate: { en: 'Hot Chocolate', ru: 'Горячий шоколад', ar: 'هوت شوكليت', price: 15, kcal: 237, photo: 'hot-chocolate' },
  englishTea: { en: 'English Tea', ru: 'Английский чай', ar: 'شاي انجليزي', price: 6, kcal: 2, photo: 'english-tea' },
  turkish: { en: 'Turkish Coffee', ru: 'Турецкий кофе', ar: 'تركي سادة', price: 11, kcal: 50, photo: 'turkish-coffee' },
  turkishMilk: { en: 'Turkish Coffee with Milk', ru: 'Турецкий кофе с молоком', ar: 'تركي حليب', price: 13, kcal: 50, photo: 'turkish-coffee-milk' },
  coffeeOfDay: { en: 'Coffee of the Day, hot / ice', ru: 'Кофе дня, горячий или со льдом', ar: 'قهوة اليوم بارد / حار', priceText: '10–13', photo: 'coffee-of-day' },
  // цена в меню закрыта полем ответа Instagram
  drip: { en: 'Drip', ru: 'Дрип', ar: 'قهوة المقطرة', photo: 'drip-coffee' },
} satisfies Record<string, MenuItem>;

const sweet = {
  madiniCookies: { en: 'Madini Cookies', ru: 'Мединское печенье', ar: 'مديني كوكيز', price: 12, kcal: 170, photo: 'madini-cookies' },
  cinnamonDanish: { en: 'Cinnamon Danish', ru: 'Даниш с корицей', ar: 'دانيش سينابون', price: 19, kcal: 170, photo: 'cinnamon-danish' },
  marbleCake: { en: 'Marble Cake', ru: 'Мраморный кекс', ar: 'ماربل كيك', price: 11, kcal: 170, photo: 'marble-cake' },
  crunchyChocolate: { en: 'Crunchy Chocolate', ru: 'Кранчи шоколад', ar: 'كرانشي شوكلت', price: 8, kcal: 170, photo: 'crunchy-chocolate' },
  cheesecake: { en: 'Blueberry Cheesecake', ru: 'Черничный чизкейк', ar: 'تشيز كيك بلوبيري', price: 27, kcal: 170, photo: 'blueberry-cheesecake', focus: '50% 70%' },
  pecanCake: { en: 'Pecan Cake', ru: 'Кейк с пеканом', ar: 'كيكة البيكان', price: 21, kcal: 170, photo: 'cake-cup', focus: '60% 80%' },
  chocolateCake: { en: 'Chocolate Cake', ru: 'Шоколадный кейк', ar: 'كيكة شوكلت', price: 17, kcal: 170, photo: 'choco-cake-fork', focus: '50% 75%' },
} satisfies Record<string, MenuItem>;

const breakfast = {
  turkey: { en: 'Turkey Sandwich', ru: 'Сэндвич с индейкой', ar: 'ساندوتش تركي', price: 19, kcal: 300, photo: 'turkey-sandwich' },
  halloumi: { en: 'Halloumi Sandwich', ru: 'Сэндвич с халуми', ar: 'ساندوتش حلوم', price: 18, kcal: 300, photo: 'sandwich-plate' },
} satisfies Record<string, MenuItem>;

export const menu = { cold, hot, sweet, breakfast };

// У каждой позиции свой ключ; фирменная группа ссылается на те же объекты, ключ общий
for (const [group, items] of Object.entries(menu)) {
  for (const [key, item] of Object.entries(items)) (item as MenuItem).id = `${group}-${key}`;
}
/** Все позиции меню по ключу — для корзины */
export const menuById = new Map(
  Object.values(menu).flatMap((items) => Object.values(items as Record<string, MenuItem>).map((item) => [item.id!, item] as const)),
);

// Внутри группы сначала позиции с фото, потом плашки
const withPhotosFirst = (items: MenuItem[]) => [...items.filter((i) => i.photo), ...items.filter((i) => !i.photo)];

export const menuGroups: { id: string; items: MenuItem[] }[] = [
  { id: 'own', items: withPhotosFirst([cold.hibiscus, cold.slush, cold.melon, sweet.madiniCookies, cold.savvaMatcha, cold.iceTea]) },
  { id: 'cold', items: withPhotosFirst(Object.values(cold)) },
  { id: 'hot', items: withPhotosFirst(Object.values(hot)) },
  { id: 'sweet', items: withPhotosFirst(Object.values(sweet)) },
  { id: 'breakfast', items: Object.values(breakfast) },
];

export const reviews = [
  {
    author: 'Mani',
    original:
      'A cozy and beautifully designed cafe with a calm and inviting atmosphere. I especially appreciated how comfortable and aesthetically pleasing the space was. The coffee was well balanced and tasted just the way i wanted neither too sweet nor too bitter. Overall, it is a pleasant place to relax and enjoy some quiet time.',
  },
  {
    author: 'Family Doctor',
    original:
      'This place is located near a walkway near sultana street, they have renewed the decoration and the place looks amazing, there are indoor and outdoor Seats, the seats are comfy and the decoration is amazing, the service is great and the coffee taste is not bad at all and they sweets are delicious',
  },
];
