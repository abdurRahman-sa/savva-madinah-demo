// Корзина гостя: живёт только в этом браузере (localStorage) и 15 минут с последней правки,
// как и черновик форм развилки. Никуда не отправляется. Любое изменение — событие savva:cart.
import { menuById, type MenuItem } from '../data/cafe';

const KEY = 'savva-cart';
const TTL = 15 * 60 * 1000;
export const CART_EVENT = 'savva:cart';

type Stored = { savedAt: number; lines: Record<string, number> };
export type CartLine = { item: MenuItem; qty: number };

let expiry: number | undefined;

function read(): Record<string, number> {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Stored | null;
    if (!stored) return {};
    if (Date.now() - stored.savedAt > TTL) {
      localStorage.removeItem(KEY);
      return {};
    }
    armExpiry(TTL - (Date.now() - stored.savedAt));
    return stored.lines;
  } catch {
    return {};
  }
}

function armExpiry(ms: number) {
  clearTimeout(expiry);
  expiry = window.setTimeout(() => clearCart(), Math.max(0, ms));
}

function write(lines: Record<string, number>) {
  try {
    if (Object.keys(lines).length) {
      localStorage.setItem(KEY, JSON.stringify({ savedAt: Date.now(), lines } satisfies Stored));
      armExpiry(TTL);
    } else {
      localStorage.removeItem(KEY);
      clearTimeout(expiry);
    }
  } catch {
    /* хранилище недоступно: корзина живёт до перезагрузки */
  }
  memory = lines;
  window.dispatchEvent(new CustomEvent(CART_EVENT));
}

let memory: Record<string, number> = read();

export function qtyOf(id: string) {
  return memory[id] ?? 0;
}

export function changeQty(id: string, delta: number) {
  const next = { ...memory };
  const qty = Math.max(0, Math.min(20, (next[id] ?? 0) + delta));
  if (qty) next[id] = qty;
  else delete next[id];
  write(next);
}

export function clearCart() {
  write({});
}

export function cartLines(): CartLine[] {
  return Object.entries(memory)
    .map(([id, qty]) => ({ item: menuById.get(id)!, qty }))
    .filter((line) => line.item);
}

/** Сумма только по позициям с точной ценой; остальные — «цена у стойки» */
export function cartTotals() {
  const lines = cartLines();
  return {
    count: lines.reduce((n, l) => n + l.qty, 0),
    sum: lines.reduce((n, l) => n + (l.item.price ?? 0) * l.qty, 0),
    unpriced: lines.some((l) => l.item.price === undefined),
  };
}

export function onCart(callback: () => void) {
  window.addEventListener(CART_EVENT, callback);
  // корзина, изменённая в другой вкладке
  window.addEventListener('storage', (e) => {
    if (e.key !== KEY) return;
    memory = read();
    callback();
  });
}
