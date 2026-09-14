import type { IconName } from '../components/icons';

export type Lang = 'ru' | 'ar';

export interface Photo {
  alt: string;
  caption?: string;
}

export type SignatureKey = 'cookies' | 'hibiscus' | 'matcha' | 'cheesecake';

export interface Dict {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  home: string;
  meta: { title: string; description: string };
  langSwitch: { label: string; lang: Lang; href: string };
  nav: { label: string; toggle: string; items: { id: string; label: string }[] };
  header: { cta: string };
  status: {
    fallback: string;
    open: string;
    closed: string;
    closeTime: string;
    // Индекс — день недели JS (0 = воскресенье)
    openTimes: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    ctaMenu: string;
    ctaBooking: string;
    chips: { icon: IconName; label: string }[];
    ratingLabel: string;
    photo: Photo;
  };
  atmosphere: {
    eyebrow: string;
    title: string;
    text: string;
    facts: { value: string; label: string }[];
    interior: Photo;
    terrace: Photo;
    breakfast: Photo;
  };
  signature: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      key: SignatureKey;
      title: string;
      original: string;
      text: string;
      price?: string;
      note?: string;
      alt: string;
    }[];
  };
  menu: {
    eyebrow: string;
    title: string;
    intro: string;
    currency: string;
    kcal: string;
    also: string;
    source: string;
    photo: Photo;
  };
  booking: {
    eyebrow: string;
    title: string;
    text: string;
    photo: Photo;
    labels: {
      name: string;
      phone: string;
      date: string;
      time: string;
      guests: string;
      occasion: string;
      comment: string;
      optional: string;
    };
    placeholders: { name: string; phone: string; comment: string };
    occasions: string[];
    consent: string;
    submit: string;
    demoNote: string;
    successTitle: string;
    successText: string;
    again: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    outOf: string;
    ratingLabel: string;
    tagsTitle: string;
    tags: { label: string; count: number }[];
    quotes: { text: string; author: string; source: string }[];
    link: string;
  };
  visit: {
    eyebrow: string;
    title: string;
    hoursTitle: string;
    today: string;
    days: { day: number; label: string; range: string }[];
    addressTitle: string;
    address: string[];
    plusCode: string;
    route: string;
    call: string;
    formatsTitle: string;
    formats: { icon: IconName; title: string; text: string }[];
    terrace: Photo;
    drive: Photo;
  };
  footer: { sloganNote: string; demo: string; rights: string };
  mobileBar: { route: string; call: string };
}
