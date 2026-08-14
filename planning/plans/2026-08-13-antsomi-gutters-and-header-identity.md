# Antsomi Gutter and Header Identity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Căn giữa khung ba cột của trang hướng dẫn theo tỷ lệ Antsomi và chuyển tên website đầy đủ ra khỏi thanh menu desktop.

**Architecture:** Dùng hai theme override nhỏ của Docusaurus: `DocRoot/Layout` tạo một lớp vỏ có tên ổn định để kiểm soát lề cả ba cột; `DocItem/Layout` hiển thị dòng nhận diện đầy đủ ở đầu khu vực bài viết. CSS trong `custom.css` chỉ điều chỉnh shell desktop, khoảng đệm và kiểu dòng nhận diện; Docusaurus vẫn tự xử lý menu và mobile.

**Tech Stack:** Docusaurus 3, React/TypeScript, CSS custom properties, Playwright E2E, Vitest.

---

## File map

- Create: `src/theme/DocRoot/Layout/index.tsx` — bọc toàn bộ tài liệu trong class `dat-doc-shell`.
- Create: `src/theme/DocItem/Layout/index.tsx` — thêm dòng nhận diện `TRUNG TÂM HỖ TRỢ DAT UNIVERSAL` trước breadcrumb.
- Modify: `docusaurus.config.ts` — bỏ `themeConfig.navbar.title`, giữ `config.title` và trang chủ nguyên vẹn.
- Modify: `src/css/custom.css` — tạo lề desktop/ba cột như đã chốt và style dòng nhận diện.
- Modify: `tests/e2e/help-center.spec.ts` — kiểm tra vị trí shell desktop, tên website ở đầu nội dung và menu không còn nhãn dài.
- Modify: `README.md` — liên kết kế hoạch hoàn tất sau triển khai.

### Task 1: Viết kiểm tra E2E cho bố cục và tên nhận diện

**Files:**
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Thêm bài kiểm tra thất bại ở cuối file**

```ts
test('desktop centers the DAT documentation shell and moves site identity out of navigation', async ({page, isMobile}) => {
  test.skip(Boolean(isMobile), 'Desktop-only layout assertion');
  await page.setViewportSize({width: 1920, height: 1080});
  await page.goto(`${sitePath}/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`);

  const shell = page.locator('.dat-doc-shell');
  const identity = page.locator('.doc-site-identity');
  const sidebar = page.locator('.theme-doc-sidebar-container');
  const article = page.locator('.theme-doc-markdown');
  const toc = page.locator('.table-of-contents');

  await expect(shell).toBeVisible();
  await expect(identity).toHaveText('TRUNG TÂM HỖ TRỢ DAT UNIVERSAL');
  await expect(page.locator('.navbar__inner > .navbar__items .navbar__title')).toHaveCount(0);

  const [shellBox, sidebarBox, articleBox, tocBox] = await Promise.all([
    shell.boundingBox(), sidebar.boundingBox(), article.boundingBox(), toc.boundingBox(),
  ]);
  expect(shellBox?.x).toBeGreaterThanOrEqual(80);
  expect(shellBox?.x).toBeLessThanOrEqual(110);
  expect(sidebarBox?.x).toBe(shellBox?.x);
  expect(articleBox?.x).toBeGreaterThanOrEqual(490);
  expect(articleBox?.x).toBeLessThanOrEqual(550);
  expect(tocBox?.x).toBeGreaterThanOrEqual(1500);
});
```

- [ ] **Step 2: Chạy kiểm tra để xác nhận RED**

Run: `npm run test:e2e -- --project=desktop --grep "moves site identity"`

Expected: FAIL vì `.dat-doc-shell` và `.doc-site-identity` chưa tồn tại; navbar vẫn render `.navbar__title`.

- [ ] **Step 3: Commit kiểm tra RED**

```bash
git add tests/e2e/help-center.spec.ts
git commit -m "test: cover documentation shell and header identity"
```

### Task 2: Tạo theme override cho shell tài liệu và nhận diện bài viết

**Files:**
- Create: `src/theme/DocRoot/Layout/index.tsx`
- Create: `src/theme/DocItem/Layout/index.tsx`

- [ ] **Step 1: Tạo `src/theme/DocRoot/Layout/index.tsx` từ layout mặc định, chỉ thêm class ổn định**

```tsx
import React, {type ReactNode, useState} from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import type {Props} from '@theme/DocRoot/Layout';
import styles from '@theme/DocRoot/Layout/styles.module.css';

export default function DocRootLayout({children}: Props): ReactNode {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  return (
    <div className={clsx(styles.docsWrapper, 'dat-doc-shell')}>
      <BackToTopButton />
      <div className={styles.docRoot}>
        {sidebar && <DocRootLayoutSidebar sidebar={sidebar.items} hiddenSidebarContainer={hiddenSidebarContainer} setHiddenSidebarContainer={setHiddenSidebarContainer} />}
        <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>{children}</DocRootLayoutMain>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Tạo `src/theme/DocItem/Layout/index.tsx` từ layout mặc định, thêm dòng nhận diện trước breadcrumb**

```tsx
<article>
  <p className="doc-site-identity">TRUNG TÂM HỖ TRỢ DAT UNIVERSAL</p>
  <DocBreadcrumbs />
  <DocVersionBadge />
  {docTOC.mobile}
  <DocItemContent>{children}</DocItemContent>
  <DocItemFooter />
</article>
```

Giữ nguyên đầy đủ imports, `useDocTOC`, `ContentVisibility`, paginator và cấu trúc row/TOC của file Docusaurus gốc; chỉ thêm phần tử trên trong `article`.

- [ ] **Step 3: Bỏ nhãn title riêng trong navbar**

```ts
navbar: {
  logo: {
    alt: 'DAT Group',
    src: 'img/logo_DAT_Group.svg',
  },
  items: [/* giữ nguyên năm mục hiện có */],
},
```

Xóa duy nhất dòng `title: 'Trung tâm hỗ trợ DAT Universal'` bên trong `themeConfig.navbar`. Không sửa `config.title`, `tagline`, tiêu đề trang chủ hay footer.

- [ ] **Step 4: Commit theme/config scaffold**

```bash
git add src/theme/DocRoot/Layout/index.tsx src/theme/DocItem/Layout/index.tsx docusaurus.config.ts
git commit -m "feat: move full site identity into documentation content"
```

### Task 3: Áp dụng CSS lề Antsomi và responsive guardrail

**Files:**
- Modify: `src/css/custom.css`

- [ ] **Step 1: Thêm style nhận diện bài viết**

```css
.doc-site-identity {
  margin: 0 0 0.85rem;
  color: var(--dat-blue-dark);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}
```

- [ ] **Step 2: Trong breakpoint desktop, căn giữa shell và tinh chỉnh ba cột**

```css
@media (min-width: 997px) {
  .dat-doc-shell {
    width: min(100%, var(--doc-shell-max-width));
    margin-right: auto;
    margin-left: auto;
  }

  .dat-doc-shell .theme-doc-sidebar-container {
    flex-basis: 18.75rem;
    width: 18.75rem;
  }

  .dat-doc-shell .container {
    max-width: none;
    padding-right: clamp(2.25rem, 3.5vw, 4rem);
    padding-left: clamp(2.25rem, 3.5vw, 4rem);
  }
}
```

Keep the existing `.theme-doc-toc-desktop` width and mobile breakpoint intact. If the RED test shows the article x coordinate outside the accepted range, adjust only the desktop `container` horizontal padding; do not change content width, menu data, or breakpoints.

- [ ] **Step 3: Run E2E again to verify GREEN**

Run: `npm run test:e2e -- --project=desktop --grep "moves site identity"`

Expected: PASS. The new `.dat-doc-shell` is centered near x=100 at 1920px, `.doc-site-identity` is visible, navbar long title count is zero, and three columns remain visible.

- [ ] **Step 4: Commit CSS implementation**

```bash
git add src/css/custom.css tests/e2e/help-center.spec.ts
git commit -m "feat: align documentation shell with Antsomi spacing"
```

### Task 4: Kiểm tra hồi quy và cập nhật danh mục tài liệu

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Thêm link kế hoạch đã triển khai dưới mục `Quyết định giao diện`**

```md
- [2026-08-13 — Kế hoạch triển khai lề Antsomi](planning/plans/2026-08-13-antsomi-gutters-and-header-identity.md): kiểm tra và thay đổi theme cho shell tài liệu.
```

- [ ] **Step 2: Run toàn bộ kiểm tra**

Run:

```bash
npm run typecheck
npm run test
npm run build
npm run test:e2e
git diff --check
```

Expected: typecheck exit 0; Vitest pass; Docusaurus build exit 0; E2E pass with the intentional mobile-only skips; no whitespace error.

- [ ] **Step 3: Kiểm tra thực tế responsive**

Run: `npm run test:e2e -- --project=desktop --grep "moves site identity"` và `npm run test:e2e -- --project=mobile --grep "mobile has no horizontal overflow"`

Expected: desktop khung lề/nhận diện đúng; mobile không có horizontal overflow.

- [ ] **Step 4: Commit tài liệu và chuẩn bị Pull Request**

```bash
git add README.md planning/plans/2026-08-13-antsomi-gutters-and-header-identity.md
git commit -m "docs: record Antsomi layout implementation plan"
```

## Self-review

- Spec coverage: Task 1/3 bao phủ lề ba cột desktop và mobile guardrail; Task 2 bao phủ phương án B cho tên website; Task 4 xác nhận không ảnh hưởng nội dung/link và ghi danh mục tài liệu.
- Placeholder scan: không dùng TODO/TBD; các selector, files, commands và expected outcome được nêu cụ thể.
- Type consistency: `dat-doc-shell` và `doc-site-identity` được dùng thống nhất trong test, TSX và CSS; `--doc-shell-max-width` là custom property có sẵn trong `src/css/custom.css`.
