# Розгортання на Cloudflare

Сайт і бекенд живуть в одному репозиторії й розгортаються як один Cloudflare Worker. Після кожного пушу в `master` Cloudflare сам оновлює сайт.

- Статичні файли (`index.html`, `car.html`, `data/`, `scripts/`, `styles/`) віддаються як є (налаштування — `wrangler.jsonc`, виключення — `.assetsignore`).
- `worker/index.js` обробляє `POST /api/analyze` (аналіз оголошення через Claude); сама логіка — у `functions/api/analyze.js`.

## 1. Підключити репозиторій

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Compute** → **Workers & Pages** → **Create** → імпорт з Git → обрати `smith-st/car-check`.
2. На кроці **Set up your application**:
   - **Project name:** `car-check`
   - **Build command:** порожньо
   - **Deploy command:** `npx wrangler deploy` (як є)
   - **Preview command:** `npx wrangler preview` (як є)
3. **Deploy**. Після збірки сайт буде доступний за адресою на кшталт `https://car-check.<акаунт>.workers.dev`.

## 2. Додати ключ Claude API

1. Створити ключ на [console.anthropic.com](https://console.anthropic.com) → **API Keys**. Там же варто встановити місячний ліміт витрат.
2. У Cloudflare: Worker `car-check` → **Settings** → **Variables and Secrets** → **Add**:
   - Type: **Secret**
   - Name: `ANTHROPIC_API_KEY`
   - Value: ключ з консолі
3. Необов'язково: змінна `CLAUDE_MODEL`, щоб змінити модель (за замовчуванням `claude-sonnet-5-5`; дешевший варіант — `claude-haiku-5-5`).
4. Зберегти (**Deploy**) — секрет починає діяти одразу.

Ключ ніколи не потрапляє в код чи в браузер — його бачить лише Worker на сервері Cloudflare.

## 3. Перевірити

Відкрити сайт → вкладка **«Вставити оголошення»** → вставити текст оголошення → **«Аналізувати»**.
Якщо авто є в базі, відкриється сторінка авто з блоком **«Аналіз оголошення»**.

Помилки бекенда видно в Cloudflare: Worker → **Observability** → **Logs**.

## Після зміни даних

Після будь-яких змін у `data/` треба оновити згенеровані файли й закомітити їх:

```
node scripts/build.js
```

Він перевіряє дані й оновлює `data/bundle.js` (дані для сайту), `data/knowledge.json` (база, яку бекенд передає Claude) і `docs/korobky.md`.

## Захист і витрати

- Бекенд приймає запити лише зі свого сайту й лише з посиланнями на конкретні оголошення; текст оголошення обмежений 8000 символами.
- Ліміти аналізів (`worker/limiter.js`, Durable Object): 5 за 10 хвилин і 20 за добу з однієї IP-адреси, 300 на добу на весь сайт. Змінити можна змінними `RATE_PER_10MIN`, `RATE_PER_DAY`, `RATE_GLOBAL_PER_DAY` у Settings → Variables and Secrets (тип Text).
- Claude отримує не всю базу, а лише версії авто, які код підібрав для цього оголошення (`functions/api/match.js`), і описи лише їхніх двигунів і коробок. Промпт — ~4 тис. символів замість ~57 тис.
- Готові результати аналізу кешуються на 24 години (`worker/cache.js`): повторний аналіз того самого оголошення не викликає Claude. Термін можна змінити змінною `CACHE_TTL_HOURS`.
- Один аналіз — це один виклик Claude. Ліміт витрат у консолі Anthropic — остання лінія захисту від несподіваних рахунків.
