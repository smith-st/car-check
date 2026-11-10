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
node scripts/build-docs.js
```

Він оновлює `docs/korobky.md` і `data/catalog.json` (список авто, з яким працює бекенд).

## Захист і витрати

- Бекенд приймає запити лише зі свого сайту, текст оголошення обмежений 8000 символами, відповідь Claude — 1500 токенами.
- Один аналіз — це один виклик Claude. Ліміт витрат у консолі Anthropic захищає від несподіваних рахунків.
- Якщо сайт стане популярним, варто додати обмеження кількості запитів (Cloudflare → Security → WAF → Rate limiting rules).
