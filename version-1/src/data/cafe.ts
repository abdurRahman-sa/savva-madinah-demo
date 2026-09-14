// Факты о кафе — только проверенные (см. ../content-sources.md, проверено 2026-09-14).

export const cafe = {
  phone: '+966 56 437 0303',
  phoneHref: 'tel:+966564370303',
  instagramUrl: 'https://www.instagram.com/savva_cafe/',
  instagramHandle: '@savva_cafe',
  mapsUrl:
    'https://www.google.com/maps/place/%D8%B3%D8%A7%D9%81%D8%A7+savva%E2%80%AD/@24.4926931,39.5823565,17z/data=!3m1!4b1!4m6!3m5!1s0x15bdbf7c00dd71e3:0x8c75251d63b13c1!8m2!3d24.4926931!4d39.5823565!16s%2Fg%2F11kj12kz9s',
  rating: '4.7',
  reviewCount: 729,
  timeZone: 'Asia/Riyadh',
  // Время открытия в минутах от полуночи; индекс — день недели JS (0 = воскресенье).
  // Пятница — с 13:00, остальные дни — с 6:30.
  opensAt: [390, 390, 390, 390, 390, 780, 390],
  // Все дни закрываются в 02:00 следующих суток.
  closesAt: 120,
};

// Холодные напитки — по фото меню в Google Maps. Цена в SAR, калорийность — как в меню.
export const coldDrinks = [
  { en: 'Iced Americano', ru: 'Айс американо', ar: 'ايس أمريكانو', price: 15, kcal: 2 },
  { en: 'Alfredo', ru: 'Альфредо', ar: 'ألفريدو', price: 14, kcal: 100 },
  { en: 'Iced Latte', ru: 'Айс латте', ar: 'ايس لاتيه', price: 17, kcal: 100 },
  { en: 'Iced Spanish Latte', ru: 'Айс спаниш латте', ar: 'ايس سبانيش لاتيه', price: 19, kcal: 230 },
  { en: 'Iced Matcha Latte', ru: 'Айс матча латте', ar: 'ايس ماتشا لاتيه', price: 17, kcal: 130 },
  { en: 'Iced Matcha Spanish Latte', ru: 'Айс матча спаниш латте', ar: 'ايس ماتشا سبانيش لاتيه', price: 19, kcal: 230 },
  { en: 'Savva Matcha', ru: 'Матча Savva', ar: 'سافا ماتشا', price: 22, kcal: 2 },
  { en: 'Matcha Berry', ru: 'Матча берри', ar: 'ماتشا بيري', price: 24, kcal: 230 },
  { en: 'Ice Tea Savva', ru: 'Холодный чай Savva', ar: 'ايس تي سافا', price: 17, kcal: 189 },
  { en: 'Ice Hibiscus Savva', ru: 'Холодный каркаде Savva', ar: 'ايس كركديه سافا', price: 17, kcal: 180 },
  { en: 'Hibiscus Slush Savva', ru: 'Слаш из каркаде Savva', ar: 'سلاش كركديه سافا', price: 17, kcal: 180 },
  { en: 'Ice Shaken', ru: 'Айс шейкен', ar: 'ايس شيكن', price: 20, kcal: 231 },
  { en: 'Ice White Mocha', ru: 'Айс уайт мока', ar: 'ايس وايت موكا', price: 19, kcal: 230 },
  { en: 'Ice Chocolate', ru: 'Холодный шоколад', ar: 'ايس شوكلت', price: 17, kcal: 230 },
  { en: 'Savva Melon', ru: 'Дыня Savva', ar: 'شمام سافا', price: 16, kcal: 50 },
];
