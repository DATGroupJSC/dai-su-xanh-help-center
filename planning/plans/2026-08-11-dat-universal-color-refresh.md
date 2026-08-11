# DAT Universal Color Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển Help Center Đại sứ xanh sang hệ màu “DAT trực diện” light-only với xanh `#0081C7`, cam `#FF8400`, đồng thời giữ nguyên layout, nội dung và CTA fail-closed.

**Architecture:** Color behavior được khóa bằng Docusaurus config; shared brand tokens và docs shell nằm trong `src/css/custom.css`; homepage-specific surfaces nằm trong CSS Module hiện tại. Playwright kiểm tra hành vi light-only và computed colors trước khi visual QA desktop/mobile.

**Tech Stack:** Docusaurus 3.10.2, React 19, TypeScript, CSS Modules, Infima theme tokens, Playwright, Vitest.

---

## File map

- `docusaurus.config.ts`: khóa light mode và loại color-mode switch.
- `src/css/custom.css`: brand tokens, navbar, button, docs, footer, article-help và 404.
- `src/pages/index.module.css`: hero, quick actions và recruit block của homepage.
- `tests/e2e/help-center.spec.ts`: behavioral và visual-style contract chạy trên production build.

Không cần tạo component hoặc thay đổi data flow.

### Task 1: Khóa light-only behavior theo TDD

**Files:**

- Modify: `tests/e2e/help-center.spec.ts`
- Modify: `docusaurus.config.ts`

- [ ] **Step 1: Viết failing E2E test cho light-only**

Thêm test sau vào cuối `tests/e2e/help-center.spec.ts`:

```ts
test('site is locked to light mode', async ({page}) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(
    page.getByRole('button', {name: /Chuyển đổi chế độ sáng và tối/}),
  ).toHaveCount(0);
});
```

- [ ] **Step 2: Build và chạy test để xác nhận fail**

Run:

```powershell
npm run build
$env:PLAYWRIGHT_BROWSERS_PATH='.playwright-browsers'
npm run test:e2e -- --grep "locked to light mode"
```

Expected: FAIL vì config hiện tại tôn trọng system color scheme và vẫn render color-mode toggle.

- [ ] **Step 3: Cài implementation tối thiểu trong Docusaurus config**

Thay block `themeConfig.colorMode` trong `docusaurus.config.ts` bằng:

```ts
colorMode: {
  defaultMode: 'light',
  disableSwitch: true,
  respectPrefersColorScheme: false,
},
```

`disableSwitch: true` bảo đảm inline theme script không đọc theme cũ từ local storage; site luôn nhận `data-theme="light"`.

- [ ] **Step 4: Xác nhận test pass**

Run:

```powershell
npm run build
$env:PLAYWRIGHT_BROWSERS_PATH='.playwright-browsers'
npm run test:e2e -- --grep "locked to light mode"
```

Expected: desktop và mobile đều PASS; không còn color-mode toggle.

- [ ] **Step 5: Commit light-mode behavior**

```powershell
git add docusaurus.config.ts tests/e2e/help-center.spec.ts
git commit -m "feat: lock help center to light mode"
```

### Task 2: Áp dụng shared DAT palette cho shell và docs

**Files:**

- Modify: `tests/e2e/help-center.spec.ts`
- Modify: `src/css/custom.css`

- [ ] **Step 1: Viết failing E2E test cho navbar, docs và 404**

Thêm test sau:

```ts
test('global shell and docs use the DAT palette', async ({page}) => {
  await page.goto('/');

  await expect(page.locator('.navbar')).toHaveCSS(
    'background-color',
    'rgb(0, 109, 168)',
  );

  await page.goto('/huong-dan/bat-dau/dai-su-xanh-la-gi');
  const activeDoc = page
    .locator('.menu__link--active:not(.menu__link--sublist)')
    .first();
  await expect(activeDoc).toHaveCSS('color', 'rgb(0, 79, 122)');
  await expect(activeDoc).toHaveCSS(
    'background-color',
    'rgb(234, 248, 255)',
  );

  await page.goto('/khong-ton-tai');
  await expect(page.locator('.not-found-page__code')).toHaveCSS(
    'color',
    'rgb(255, 132, 0)',
  );
});
```

- [ ] **Step 2: Build và xác nhận test fail với palette xanh lá hiện tại**

Run:

```powershell
npm run build
$env:PLAYWRIGHT_BROWSERS_PATH='.playwright-browsers'
npm run test:e2e -- --grep "global shell and docs"
```

Expected: FAIL ở navbar trắng và các trạng thái xanh lá.

- [ ] **Step 3: Thay shared tokens và styles**

Thay toàn bộ `src/css/custom.css` bằng:

```css
:root {
  --dat-blue: #0081c7;
  --dat-blue-dark: #006da8;
  --dat-blue-deep: #004f7a;
  --dat-cyan: #00d5df;
  --dat-orange: #ff8400;
  --dat-orange-dark: #d96800;
  --dat-sky-50: #eaf8ff;
  --dat-border: #d5e6ef;
  --dat-text: #17212b;
  --dat-muted: #5b6d78;
  --ifm-color-primary: #0081c7;
  --ifm-color-primary-dark: #0074b3;
  --ifm-color-primary-darker: #006da8;
  --ifm-color-primary-darkest: #005a8b;
  --ifm-color-primary-light: #1a8ecd;
  --ifm-color-primary-lighter: #2794d0;
  --ifm-color-primary-lightest: #57ace0;
  --ifm-font-color-base: var(--dat-text);
  --ifm-background-color: #fff;
  --ifm-font-family-base: Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  --ifm-heading-font-weight: 760;
  --ifm-navbar-height: 4.25rem;
  --ifm-code-font-size: 95%;
  --site-border: var(--dat-border);
  --site-border-strong: #9dcee8;
  --site-muted: var(--dat-muted);
  --docusaurus-highlighted-code-line-bg: rgb(0 129 199 / 10%);
}

html {
  color-scheme: light;
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
  background: #fff;
}

:where(a, button, input, [tabindex]):focus-visible {
  outline: 3px solid var(--dat-orange-dark);
  outline-offset: 3px;
}

.button--primary {
  color: #fff;
  background-color: var(--dat-orange);
  border-color: var(--dat-orange);
}

.button--primary:hover,
.button--primary:focus {
  color: #fff;
  background-color: var(--dat-orange-dark);
  border-color: var(--dat-orange-dark);
}

.navbar {
  color: #fff;
  background: var(--dat-blue-dark);
  border-bottom: 1px solid rgb(255 255 255 / 18%);
  box-shadow: 0 8px 24px rgb(0 79 122 / 12%);
}

.navbar__title,
.navbar__brand,
.navbar__link,
.navbar__toggle {
  color: #fff;
}

.navbar__title {
  font-weight: 800;
  letter-spacing: -0.02em;
}

.navbar__link:hover,
.navbar__link--active {
  color: var(--dat-cyan);
}

.navbar :where(a, button):focus-visible {
  outline-color: var(--dat-cyan);
}

.navbar .navbar__search-input {
  color: var(--dat-text);
  background-color: #fff;
  border-color: transparent;
}

.theme-doc-sidebar-container {
  background: #f8fcfe;
  border-right-color: var(--dat-border) !important;
}

.menu__link--active:not(.menu__link--sublist) {
  color: var(--dat-blue-deep);
  background: var(--dat-sky-50);
  border-left: 3px solid var(--dat-orange);
}

.theme-doc-markdown {
  font-size: 1.02rem;
  line-height: 1.75;
}

.theme-doc-markdown > h1:first-child,
.theme-doc-markdown h2,
.theme-doc-markdown h3 {
  color: var(--dat-blue-deep);
}

.theme-doc-markdown > h1:first-child {
  letter-spacing: -0.035em;
}

.breadcrumbs__link,
.hash-link,
.pagination-nav__link {
  color: var(--dat-blue-deep);
}

.table-of-contents {
  font-size: 0.86rem;
}

.table-of-contents__link--active {
  color: var(--dat-blue);
  font-weight: 700;
}

.article-help {
  margin-top: 3rem;
  padding: 1.5rem;
  background: var(--dat-sky-50);
  border: 1px solid #9dcee8;
  border-radius: 0.9rem;
}

.article-help h2 {
  margin-top: 0;
  color: var(--dat-blue-deep);
  font-size: 1.35rem;
}

.article-help p {
  margin-bottom: 0.55rem;
}

.article-help a {
  color: var(--dat-blue-deep);
  font-weight: 750;
}

.footer--dark {
  --ifm-footer-background-color: var(--dat-blue-deep);
  background: var(--dat-blue-deep);
}

.not-found-page {
  min-height: calc(100vh - var(--ifm-navbar-height) - 180px);
  padding-top: 8rem;
  padding-bottom: 8rem;
  text-align: center;
}

.not-found-page__code {
  margin-bottom: 0;
  color: var(--dat-orange);
  font-size: 0.9rem;
  font-weight: 850;
  letter-spacing: 0.16em;
}

.not-found-page h1 {
  margin: 0.5rem 0 1rem;
  color: var(--dat-blue-deep);
  font-size: clamp(2.2rem, 7vw, 4rem);
  letter-spacing: -0.04em;
}

.not-found-page > p:not(.not-found-page__code) {
  max-width: 590px;
  margin-right: auto;
  margin-left: auto;
  color: var(--dat-muted);
}

.not-found-page__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

@media (max-width: 996px) {
  .theme-doc-sidebar-container {
    background: #fff;
  }
}

@media (max-width: 576px) {
  .not-found-page {
    padding-top: 5rem;
  }

  .not-found-page__actions .button {
    width: 100%;
  }
}
```

- [ ] **Step 4: Xác nhận global palette test pass**

Run:

```powershell
npm run build
$env:PLAYWRIGHT_BROWSERS_PATH='.playwright-browsers'
npm run test:e2e -- --grep "global shell and docs"
```

Expected: desktop và mobile PASS.

- [ ] **Step 5: Commit shared visual system**

```powershell
git add src/css/custom.css tests/e2e/help-center.spec.ts
git commit -m "style: apply DAT palette to help center shell"
```

### Task 3: Chuyển homepage sang hướng DAT trực diện

**Files:**

- Modify: `tests/e2e/help-center.spec.ts`
- Modify: `src/pages/index.module.css`

- [ ] **Step 1: Viết failing E2E test cho hero và quick actions**

Thêm test:

```ts
test('homepage uses the DAT direct color direction', async ({page}) => {
  await page.goto('/');

  const hero = page.locator('main > section').first();
  expect(
    await hero.evaluate((element) => getComputedStyle(element).backgroundImage),
  ).toContain('rgb(0, 129, 199)');

  await expect(
    page.getByRole('heading', {name: 'Bạn cần hỗ trợ nội dung gì?'}),
  ).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(page.getByText('01', {exact: true})).toHaveCSS(
    'color',
    'rgb(255, 132, 0)',
  );
});
```

- [ ] **Step 2: Build và xác nhận test fail với hero xanh lá hiện tại**

Run:

```powershell
npm run build
$env:PLAYWRIGHT_BROWSERS_PATH='.playwright-browsers'
npm run test:e2e -- --grep "DAT direct color direction"
```

Expected: FAIL vì hero hiện có nền trắng/xanh lá, heading màu đen và số thứ tự màu xanh lá.

- [ ] **Step 3: Thay homepage palette**

Thay toàn bộ `src/pages/index.module.css` bằng:

```css
.hero {
  padding: 6.5rem 0 5.5rem;
  color: #fff;
  text-align: center;
  background:
    radial-gradient(circle at 86% 10%, rgb(0 213 223 / 24%), transparent 24rem),
    linear-gradient(145deg, var(--dat-blue-dark), var(--dat-blue));
  border-bottom: 1px solid rgb(255 255 255 / 20%);
}

.hero h1 {
  max-width: 780px;
  margin: 0.45rem auto 1.25rem;
  color: #fff;
  font-size: clamp(2.35rem, 6vw, 4.6rem);
  line-height: 1.04;
  letter-spacing: -0.045em;
}

.eyebrow {
  margin: 0;
  color: var(--dat-blue-deep);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.hero .eyebrow {
  color: var(--dat-cyan);
}

.lead {
  max-width: 650px;
  margin: 0 auto;
  color: #d8f2ff;
  font-size: 1.13rem;
}

.search {
  width: min(100%, 640px);
  margin: 2rem auto 1.25rem;
}

.search :global(.navbar__search-input) {
  width: 100%;
  height: 3.5rem;
  padding-left: 3rem;
  color: var(--dat-text);
  background-color: #fff;
  border: 1px solid rgb(255 255 255 / 65%);
  border-radius: 1rem;
  box-shadow: 0 16px 38px rgb(0 79 122 / 24%);
}

.actions {
  padding: 5rem 0;
  background: linear-gradient(180deg, #fff, #f8fcfe);
}

.sectionHeading {
  max-width: 620px;
  margin-bottom: 2rem;
}

.sectionHeading h2,
.recruit h2 {
  margin: 0.45rem 0 0;
  font-size: clamp(1.9rem, 4vw, 2.65rem);
  letter-spacing: -0.03em;
}

.sectionHeading h2 {
  color: var(--dat-blue-deep);
}

.actionGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.actionCard {
  position: relative;
  min-height: 230px;
  padding: 1.7rem;
  color: var(--dat-text);
  background: #fff;
  border: 1px solid var(--dat-border);
  border-radius: 1.1rem;
  box-shadow: 0 6px 22px rgb(0 79 122 / 7%);
  transition: transform 160ms ease, border-color 160ms ease,
    box-shadow 160ms ease;
}

.actionCard:hover {
  color: var(--dat-text);
  text-decoration: none;
  transform: translateY(-3px);
  border-color: var(--dat-blue);
  box-shadow: 0 15px 34px rgb(0 79 122 / 14%);
}

.actionCard:focus-visible {
  border-color: var(--dat-blue);
}

.actionNumber {
  display: block;
  margin-bottom: 2rem;
  color: var(--dat-orange);
  font-weight: 800;
}

.actionCard h3 {
  margin-bottom: 0.55rem;
  color: var(--dat-blue-deep);
  font-size: 1.28rem;
}

.actionCard p {
  margin-bottom: 1.25rem;
  color: var(--dat-muted);
}

.actionLink {
  color: var(--dat-blue);
  font-size: 0.9rem;
  font-weight: 750;
}

.recruit {
  padding: 1rem 0 5rem;
  background: #f8fcfe;
}

.recruitInner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 3.2rem;
  color: #fff;
  background: linear-gradient(135deg, var(--dat-blue-deep), var(--dat-blue-dark));
  border-radius: 1.4rem;
}

.recruitInner > div:first-child {
  max-width: 620px;
}

.recruitInner .eyebrow {
  color: var(--dat-cyan);
}

.recruitInner h2 {
  color: #fff;
}

.recruitInner p:not(.eyebrow) {
  margin: 0.8rem 0 0;
  color: #d8f2ff;
}

.recruitActions {
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.recruitActions :global(.button--secondary) {
  color: var(--dat-blue-deep);
  background: #fff;
  border-color: #fff;
}

.recruitActions :global(.button--secondary:hover),
.recruitActions :global(.button--secondary:focus) {
  color: var(--dat-blue-deep);
  background: var(--dat-sky-50);
  border-color: var(--dat-sky-50);
}

@media (max-width: 780px) {
  .hero {
    padding: 4rem 0 3.5rem;
  }

  .actionGrid {
    grid-template-columns: 1fr;
  }

  .recruitInner {
    align-items: flex-start;
    flex-direction: column;
    padding: 2rem 1.4rem;
  }

  .recruitActions,
  .recruitActions :global(.button) {
    width: 100%;
  }
}
```

- [ ] **Step 4: Xác nhận homepage palette test pass**

Run:

```powershell
npm run build
$env:PLAYWRIGHT_BROWSERS_PATH='.playwright-browsers'
npm run test:e2e -- --grep "DAT direct color direction"
```

Expected: desktop và mobile PASS.

- [ ] **Step 5: Commit homepage refresh**

```powershell
git add src/pages/index.module.css tests/e2e/help-center.spec.ts
git commit -m "style: refresh homepage with DAT direct colors"
```

### Task 4: Full regression và visual QA

**Files:**

- Verify: toàn bộ project
- Modify only if a verified regression requires a scoped fix

- [ ] **Step 1: Chạy unit tests và TypeScript**

Run:

```powershell
npm run test
npm run typecheck
```

Expected: 5 unit tests PASS; TypeScript exit code 0.

- [ ] **Step 2: Chạy production build**

Run:

```powershell
npm run build
```

Expected: static build được tạo trong `build`; không có broken link, duplicate route hoặc deprecated color-mode warning.

- [ ] **Step 3: Chạy toàn bộ E2E**

Run:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH='.playwright-browsers'
npm run test:e2e
```

Expected: tất cả test áp dụng cho desktop/mobile PASS; test ba cột tiếp tục skip có chủ đích trên mobile.

- [ ] **Step 4: Visual QA trên production build**

Mở `npm run serve -- --host 127.0.0.1 --port 3000` và xác nhận:

1. Homepage desktop: navbar/hero xanh DAT, heading trắng, search trắng, số thứ tự cam.
2. Docs desktop: sidebar trái, content giữa, TOC phải; item active xanh nhạt có indicator cam.
3. Mobile 390×844: menu thu gọn, chữ không tràn, CTA full-width khi xuất hiện.
4. Search tiếng Việt vẫn trả đúng bài và section.
5. 404 có mã cam, heading xanh và hai đường quay lại Help Center.
6. Không có console error.

- [ ] **Step 5: Kiểm tra Git trước handoff**

Run:

```powershell
git diff --check
git status --short
git log --oneline -5
```

Expected: không có whitespace error; chỉ còn thay đổi có chủ đích hoặc worktree sạch sau commit.

## Coverage đối chiếu spec

| Yêu cầu spec | Task |
| --- | --- |
| Xanh `#0081C7`, cam `#FF8400` | Task 2, Task 3 |
| Navbar và hero DAT trực diện | Task 2, Task 3 |
| Docs vẫn ưu tiên khả năng đọc | Task 2 |
| Light-only, không toggle | Task 1 |
| CTA fail-closed không đổi | Existing unit/E2E, Task 4 regression |
| Layout/nội dung không đổi | Task 2–3 chỉ CSS/config; Task 4 QA |
| Accessibility focus/contrast | Task 2 CSS, Task 4 visual QA |
| Desktop/mobile/search/404 | Task 4 |
