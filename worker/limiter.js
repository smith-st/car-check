// Обмеження кількості аналізів (Durable Object).
// Один об'єкт на IP-адресу + один спільний на весь сайт («global»).
// Зберігає час останніх запитів і перевіряє правила виду { window: секунди, max: кількість }.
import { DurableObject } from "cloudflare:workers";

export class RateLimiter extends DurableObject {
  // Повертає { allowed: true } або { allowed: false, retryAfter: секунди }
  async hit(rules) {
    const now = Date.now();
    const longest = Math.max(...rules.map(r => r.window)) * 1000;
    let stamps = (await this.ctx.storage.get("stamps")) || [];
    stamps = stamps.filter(t => now - t < longest);

    for (const r of rules) {
      const inWindow = stamps.filter(t => now - t < r.window * 1000);
      if (inWindow.length >= r.max) {
        const oldest = Math.min(...inWindow);
        return { allowed: false, retryAfter: Math.ceil((oldest + r.window * 1000 - now) / 1000) };
      }
    }
    stamps.push(now);
    await this.ctx.storage.put("stamps", stamps);
    return { allowed: true };
  }
}

const num = (v, d) => (Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : d);

// Перевірка лімітів для запиту. Без прив'язки LIMITER (локально чи в Pages) — пропускає.
// Ліміти можна змінити змінними в Cloudflare: RATE_PER_10MIN, RATE_PER_DAY, RATE_GLOBAL_PER_DAY.
export async function checkRateLimit(request, env) {
  if (!env.LIMITER) return { allowed: true };
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";

  const perIp = env.LIMITER.get(env.LIMITER.idFromName("ip:" + ip));
  const ipRes = await perIp.hit([
    { window: 600, max: num(env.RATE_PER_10MIN, 5) },
    { window: 86400, max: num(env.RATE_PER_DAY, 20) }
  ]);
  if (!ipRes.allowed) return { ...ipRes, scope: "ip" };

  const global = env.LIMITER.get(env.LIMITER.idFromName("global"));
  const gRes = await global.hit([{ window: 86400, max: num(env.RATE_GLOBAL_PER_DAY, 300) }]);
  if (!gRes.allowed) return { ...gRes, scope: "global" };
  return { allowed: true };
}
