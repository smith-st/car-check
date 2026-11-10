# Розгортання на Cloudflare Pages

Сайт і бекенд живуть в одному репозиторії. Cloudflare Pages бере код з GitHub і оновлює сайт після кожного пушу в `master`.

- Статичні файли (`index.html`, `car.html`, `data/`, `scripts/`, `styles/`) віддаються як є.
- `functions/api/analyze.js` стає ендпоінтом `POST /api/analyze` (аналіз оголошення через Claude).

## 1. Підключити репозиторій

1. Зайти на [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → вкладка **Pages** → **Connect to Git**.
2. Дати Cloudflare доступ до GitHub і обрати репозиторій `smith-st/car-check`.
3. Налаштування збірки:
   - **Production branch:** `master`
   - **Framework preset:** `None`
   - **Build command:** порожньо
   - **Build output directory:** `/`
4. **Save and Deploy**. Після збірки сайт буде доступний за адресою на кшталт `https://car-check.pages.dev`.

## 2. Додати ключ Claude API

1. Створити ключ на [console.anthropic.com](https://console.anthropic.com) → **API Keys**. Там же варто встановити місячний ліміт витрат.
2. У Cloudflare: проєкт `car-check` → **Settings** → **Variables and Secrets** → **Add**:
   - Type: **Secret**
   - Name: `ANTHROPIC_API_KEY`
   - Value: ключ з консолі
   - Environment: **Production**
3. Необов'язково: змінна `CLAUDE_MODEL`, щоб змінити модель (за замовчуванням `claude-sonnet-5-5`; дешевший варіант — `claude-haiku-5-5`).
4. Секрети діють лише для нових розгортань: **Deployments** → останнє розгортання → **Retry deployment** (або просто зробити новий пуш).

Ключ ніколи не потрапляє в код чи в браузер — його бачить лише функція на сервері Cloudflare.

## 3. Перевірити

Відкрити сайт → вкладка **«Вставити оголошення»** → вставити текст оголошення → **«Аналізувати»**.
Якщо авто є в базі, відкриється сторінка авто з блоком **«Аналіз оголошення»**.

Помилки бекенда видно в Cloudflare: проєкт → **Deployments** → розгортання → **Functions** → **Real-time logs**.

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
