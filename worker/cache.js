// Кеш результатів аналізу (Durable Object).
// Один об'єкт на ключ: ID оголошення Otomoto або відбиток тексту + версія бази знань.
// Результат живе CACHE_TTL_HOURS годин (за замовчуванням 24), потім видаляється сам.
import { DurableObject } from "cloudflare:workers";

export class AnalysisCache extends DurableObject {
  async get(maxAgeMs) {
    const item = await this.ctx.storage.get("item");
    if (!item || Date.now() - item.at > maxAgeMs) return null;
    return item;
  }
  async put(data, ttlMs) {
    const item = { at: Date.now(), data };
    await this.ctx.storage.put("item", item);
    await this.ctx.storage.setAlarm(Date.now() + ttlMs);
    return item;
  }
  async alarm() {
    await this.ctx.storage.deleteAll();
  }
}

const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
export async function sha256(text) {
  return hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)));
}

function ttl(env) {
  const h = Number(env.CACHE_TTL_HOURS);
  return (Number.isFinite(h) && h > 0 ? h : 24) * 3600 * 1000;
}

// Ключ кешу: для посилання без тексту — ID оголошення, для тексту — його відбиток.
// dataVersion змінюється разом з базою знань, тож після оновлення бази старі результати не віддаються.
export async function cacheKey({ url, text, dataVersion }) {
  const id = !text && url ? (url.match(/-ID([0-9A-Za-z]+)\.html/) || [])[1] : null;
  const base = id ? "otomoto:" + id : "text:" + await sha256(text.replace(/\s+/g, " ").trim() + "|" + (url || ""));
  return dataVersion + ":" + base;
}

export async function cacheGet(env, key) {
  if (!env.ANALYSIS_CACHE) return null;
  const stub = env.ANALYSIS_CACHE.get(env.ANALYSIS_CACHE.idFromName(key));
  return stub.get(ttl(env));
}

export async function cachePut(env, key, data) {
  if (!env.ANALYSIS_CACHE) return;
  const stub = env.ANALYSIS_CACHE.get(env.ANALYSIS_CACHE.idFromName(key));
  await stub.put(data, ttl(env));
}
