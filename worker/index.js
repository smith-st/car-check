// Точка входу Cloudflare Worker.
// Статичні файли сайту віддає Cloudflare сам (див. "assets" у wrangler.jsonc);
// сюди потрапляють лише запити, для яких файлу немає, — тобто /api/*.
import { onRequestPost, onRequest } from "../functions/api/analyze.js";
export { RateLimiter } from "./limiter.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/analyze") {
      const context = { request, env, ctx };
      return request.method === "POST" ? onRequestPost(context) : onRequest(context);
    }
    return env.ASSETS.fetch(request);
  }
};
