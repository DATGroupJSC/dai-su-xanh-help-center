# DAT Group Navbar Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm logo DAT Group màu xanh–cam vào thanh điều hướng, rõ nét trên nền xanh DAT và không làm hỏng bố cục mobile.

**Architecture:** Asset SVG được lưu trong `static/img` và khai báo bằng API navbar chuẩn của Docusaurus. CSS chỉ tác động lên `.navbar__logo` để tạo nền trắng, giữ đúng tỉ lệ và điều chỉnh kích thước theo breakpoint mobile; Vitest kiểm tra cấu hình/asset, Playwright kiểm tra render thực tế.

**Tech Stack:** Docusaurus 3.10.2, TypeScript, CSS, Vitest, Playwright, GitHub Pages

---

### Task 1: Khóa yêu cầu logo bằng unit test

**Files:**
- Create: `tests/unit/navbar-logo.test.ts`
- Test: `tests/unit/navbar-logo.test.ts`

- [ ] **Step 1: Viết test thất bại cho cấu hình và asset**

```ts
import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {describe, expect, it} from 'vitest';
import config from '../../docusaurus.config';

describe('DAT Group navbar logo', () => {
  it('uses the approved DAT Group SVG with accessible text', () => {
    const navbar = config.themeConfig?.navbar;
    expect(navbar?.logo).toMatchObject({
      alt: 'DAT Group',
      src: 'img/logo_DAT_Group.svg',
    });
  });

  it('ships the approved blue-orange SVG as a public asset', () => {
    const logoPath = join(process.cwd(), 'static', 'img', 'logo_DAT_Group.svg');
    expect(existsSync(logoPath)).toBe(true);
    const svg = readFileSync(logoPath, 'utf8');
    expect(svg).toContain('#0082CA');
    expect(svg).toContain('#FF8300');
  });
});
```

- [ ] **Step 2: Chạy test và xác nhận RED**

Run: `npm run test -- --run tests/unit/navbar-logo.test.ts`

Expected: FAIL vì `navbar.logo` và `static/img/logo_DAT_Group.svg` chưa tồn tại.

- [ ] **Step 3: Commit test RED**

```bash
git add tests/unit/navbar-logo.test.ts
git commit -m "test: define DAT Group navbar logo"
```

### Task 2: Thêm asset và cấu hình logo

**Files:**
- Create: `static/img/logo_DAT_Group.svg`
- Modify: `docusaurus.config.ts`
- Test: `tests/unit/navbar-logo.test.ts`

- [ ] **Step 1: Sao chép nguyên nội dung SVG đã duyệt**

Sao chép `D:/MyWorkspace/02_DAT_Work/00_Inbox/99_Unsorted/logo_DAT_Group.svg` thành `static/img/logo_DAT_Group.svg`, không thay đổi `viewBox`, path hoặc mã màu.

- [ ] **Step 2: Khai báo logo trong navbar**

Thêm vào `themeConfig.navbar`:

```ts
logo: {
  alt: 'DAT Group',
  src: 'img/logo_DAT_Group.svg',
},
```

- [ ] **Step 3: Chạy test và xác nhận GREEN**

Run: `npm run test -- --run tests/unit/navbar-logo.test.ts`

Expected: 2 tests passed.

- [ ] **Step 4: Commit asset và cấu hình**

```bash
git add static/img/logo_DAT_Group.svg docusaurus.config.ts
git commit -m "feat: add DAT Group navbar logo"
```

### Task 3: Tạo nền trắng và responsive sizing

**Files:**
- Modify: `src/css/custom.css`
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Viết E2E test thất bại cho desktop/mobile**

```ts
test('navbar presents the DAT Group logo clearly on desktop and mobile', async ({page}) => {
  await page.goto(`${sitePath}/`);

  const logo = page.locator('.navbar__logo');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(logo.locator('img')).toHaveAttribute('alt', 'DAT Group');
  expect(await logo.locator('img').evaluate((image) => {
    const element = image as HTMLImageElement;
    return Math.abs(element.naturalWidth / element.naturalHeight - 439.54 / 170.76) < 0.02;
  })).toBe(true);

  await page.setViewportSize({width: 390, height: 844});
  await page.reload();
  await expect(logo).toBeVisible();
  expect(await page.locator('body').evaluate(
    (body) => body.scrollWidth <= window.innerWidth,
  )).toBe(true);
});
```

- [ ] **Step 2: Chạy E2E và xác nhận RED**

Run: `$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'; npm run test:e2e -- --grep "DAT Group logo"`

Expected: FAIL vì logo chưa có nền trắng/kích thước responsive.

- [ ] **Step 3: Thêm CSS tối thiểu**

Thêm vào `src/css/custom.css`:

```css
.navbar__logo {
  align-items: center;
  background: #fff;
  border-radius: 0.5rem;
  display: inline-flex;
  height: 2.375rem;
  margin-right: 0.625rem;
  padding: 0.3rem 0.55rem;
}

.navbar__logo img {
  height: 100%;
  object-fit: contain;
  width: auto;
}

@media (max-width: 780px) {
  .navbar__logo {
    height: 2rem;
    margin-right: 0.45rem;
    padding: 0.25rem 0.45rem;
  }
}
```

- [ ] **Step 4: Chạy targeted E2E và xác nhận GREEN**

Run: `$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'; npm run test:e2e -- --grep "DAT Group logo"`

Expected: desktop và mobile đều pass.

- [ ] **Step 5: Commit CSS và E2E**

```bash
git add src/css/custom.css tests/e2e/help-center.spec.ts
git commit -m "style: present DAT logo responsively"
```

### Task 4: Xác minh và xuất bản

**Files:**
- Verify: `docusaurus.config.ts`
- Verify: `static/img/logo_DAT_Group.svg`
- Verify: `src/css/custom.css`
- Verify: `tests/unit/navbar-logo.test.ts`
- Verify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Chạy quality gate đầy đủ**

Run:

```powershell
npm run typecheck
npm run test
npm run build
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run test:e2e
git diff --check
```

Expected: typecheck/build exit 0; 9 unit tests pass; E2E cũ và test logo mới pass, chỉ giữ các skip có chủ ý; `git diff --check` sạch.

- [ ] **Step 2: Đẩy branch `main` lên GitHub**

```bash
git push origin main
```

- [ ] **Step 3: Kiểm tra production**

Mở `https://datgroupjsc.github.io/dai-su-xanh-help-center/` và xác nhận:

- logo DAT Group hiện trong ô trắng trên desktop;
- logo, tiêu đề và nút menu cùng hiển thị ở 390 × 844;
- bấm vùng thương hiệu quay về homepage;
- không có horizontal overflow;
- GitHub workflow `build-and-test` và `deploy-to-github-pages` thành công.
