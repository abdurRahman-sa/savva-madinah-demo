// Факты о кафе — только проверенные (см. ../content-sources.md; сверено с Google Maps 2026-09-17).

export const cafe = {
  phone: '+966 56 437 0303',
  phoneHref: 'tel:+966564370303',
  instagramUrl: 'https://www.instagram.com/savva_cafe/',
  instagramHandle: '@savva_cafe',
  plusCode: 'FHVJ+3W Madinah',
  routeUrl: 'https://www.google.com/maps/dir/?api=1&destination=24.4926931,39.5823565',
  mapsUrl:
    'https://www.google.com/maps/place/%D8%B3%D8%A7%D9%81%D8%A7+savva%E2%80%AD/@24.4926931,39.5823565,17z/data=!3m1!4b1!4m6!3m5!1s0x15bdbf7c00dd71e3:0x8c75251d63b13c1!8m2!3d24.4926931!4d39.5823565',
  rating: '4.7',
  reviewCount: 730,
  // Темы отзывов в Google Maps: сколько отзывов упоминают тему.
  reviewTopics: { quietness: 51, cheesecake: 36, madiniCookies: 15, outdoorSeating: 12 },
  timeZone: 'Asia/Riyadh',
  // Открытие в минутах от полуночи; пятница с 13:00, остальные дни с 6:30. Закрытие всегда в 02:00.
  opensAt: 390,
  opensAtFriday: 780,
  closesAt: 120,
};

export type MenuItem = {
  ru: string;
  /** Арабское название — только из меню или подписей кафе */
  ar?: string;
  en: string;
  /** Цена в SAR; нет цены — «у стойки» */
  price?: number;
  kcal?: number;
  /** Подпись вместо калорийности */
  note?: string;
};

// Холодные напитки — по фото меню в Google Maps. Остальное — позиции с фото и карточки, без цен.
const drinks = {
  americano: { en: 'Iced Americano', ru: 'Айс американо', ar: 'ايس أمريكانو', price: 15, kcal: 2 },
  alfredo: { en: 'Alfredo', ru: 'Альфредо', ar: 'ألفريدو', price: 14, kcal: 100 },
  latte: { en: 'Iced Latte', ru: 'Айс латте', ar: 'ايس لاتيه', price: 17, kcal: 100 },
  spanishLatte: { en: 'Iced Spanish Latte', ru: 'Айс спаниш латте', ar: 'ايس سبانيش لاتيه', price: 19, kcal: 230 },
  matchaLatte: { en: 'Iced Matcha Latte', ru: 'Айс матча латте', ar: 'ايس ماتشا لاتيه', price: 17, kcal: 130 },
  matchaSpanish: { en: 'Iced Matcha Spanish Latte', ru: 'Айс матча спаниш латте', ar: 'ايس ماتشا سبانيش لاتيه', price: 19, kcal: 230 },
  savvaMatcha: { en: 'Savva Matcha', ru: 'Матча Savva', ar: 'سافا ماتشا', price: 22, kcal: 2 },
  matchaBerry: { en: 'Matcha Berry', ru: 'Матча берри', ar: 'ماتشا بيري', price: 24, kcal: 230 },
  iceTea: { en: 'Ice Tea Savva', ru: 'Холодный чай Savva', ar: 'ايس تي سافا', price: 17, kcal: 189 },
  hibiscus: { en: 'Ice Hibiscus Savva', ru: 'Каркаде Savva', ar: 'ايس كركديه سافا', price: 17, kcal: 180 },
  slush: { en: 'Hibiscus Slush Savva', ru: 'Слаш из каркаде Savva', ar: 'سلاش كركديه سافا', price: 17, kcal: 180 },
  shaken: { en: 'Ice Shaken', ru: 'Айс шейкен', ar: 'ايس شيكن', price: 20, kcal: 231 },
  whiteMocha: { en: 'Ice White Mocha', ru: 'Айс уайт мока', ar: 'ايس وايت موكا', price: 19, kcal: 230 },
  chocolate: { en: 'Ice Chocolate', ru: 'Холодный шоколад', ar: 'ايس شوكلت', price: 17, kcal: 230 },
  melon: { en: 'Savva Melon', ru: 'Дыня Savva', ar: 'شمام سافا', price: 16, kcal: 50 },
} satisfies Record<string, MenuItem>;

const food = {
  madiniCookies: { en: 'Madini Cookies', ru: 'Мединское печенье', ar: 'كوكيز مديني', note: 'финики, кардамон, чёрный тмин' },
  cheesecake: { en: 'Blueberry Cheesecake', ru: 'Черничный чизкейк', note: 'популярное на картах' },
  cappuccino: { en: 'Cappuccino', ru: 'Капучино', note: 'популярное на картах' },
  sandwich: { en: 'Breakfast sandwich', ru: 'Сэндвич на завтрак' },
} satisfies Record<string, MenuItem>;

export const menu = { ...drinks, ...food };

export const menuGroups: { id: string; items: MenuItem[] }[] = [
  { id: 'own', items: [drinks.hibiscus, drinks.slush, drinks.savvaMatcha, drinks.iceTea, drinks.melon, food.madiniCookies] },
  { id: 'cold', items: [drinks.americano, drinks.alfredo, drinks.latte, drinks.spanishLatte, drinks.shaken, drinks.whiteMocha] },
  { id: 'matcha', items: [drinks.matchaLatte, drinks.matchaSpanish, drinks.matchaBerry, drinks.chocolate] },
  { id: 'hot', items: [food.cappuccino] },
  { id: 'sweet', items: [food.cheesecake, food.madiniCookies, food.sandwich] },
];

// Отзывы — дословно с Google Maps (оригинал на английском), см. content-sources.md.
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
