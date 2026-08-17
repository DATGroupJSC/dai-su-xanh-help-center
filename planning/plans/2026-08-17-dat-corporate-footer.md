# DAT Corporate Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hiển thị footer DAT Group nhiều cột trên toàn bộ website và dùng favicon PNG do người dùng cung cấp.

**Architecture:** Swizzle Footer Docusaurus chỉ để thay vùng nội dung footer. Component `DatCorporateFooter` sở hữu dữ liệu công khai, semantic markup và liên kết tel/mailto; stylesheet chỉ áp dụng qua class component để không ảnh hưởng layout bài viết.

**Tech Stack:** Docusaurus 3.10.2, React 19, TypeScript, CSS, Playwright.

---

### Task 1: Viết kiểm tra footer và favicon

**Files:**
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Viết test `DAT corporate footer exposes public contact information and the supplied favicon`**. Trang chủ phải có `footer.dat-corporate-footer`, ba khối “Trụ sở chính - TP.HCM”, “Chi nhánh Hà Nội”, “Chi nhánh Cần Thơ”, copyright và favicon `/img/favicon.DujayeFC.png`; mobile không horizontal overflow.
- [ ] **Step 2: Chạy RED** — `npm run test:e2e -- --grep "DAT corporate footer"`; test phải fail vì footer và favicon mới chưa tồn tại.
- [ ] **Step 3: Commit RED** — `git add tests/e2e/help-center.spec.ts` và `git commit -m "test: cover DAT corporate footer"`.

### Task 2: Render footer DAT và favicon

**Files:**
- Create: `src/components/DatCorporateFooter/index.tsx`
- Create: `src/theme/Footer/index.tsx`
- Copy: `D:/MyWorkspace/02_DAT_Work/00_Inbox/favicon.DujayeFC.png` → `static/img/favicon.DujayeFC.png`
- Modify: `docusaurus.config.ts`
- Modify: `src/css/custom.css`

- [ ] **Step 1: Tạo component dữ liệu công khai.** Render logo DAT, ba cột nội dung không có URL ngoài, ba khối `<address>` có `tel:`/`mailto:` từ ảnh, và copyright.
- [ ] **Step 2: Swizzle Footer tối thiểu.** `src/theme/Footer/index.tsx` import và render `DatCorporateFooter` khi `themeConfig.footer` tồn tại; trả `null` khi footer bị tắt.
- [ ] **Step 3: Áp dụng CSS scoped.** Desktop: grid 4 cột và grid 3 cột contact; dưới 780px: một cột. Link tel/mailto dùng màu trắng, focus outline sky-50.
- [ ] **Step 4: Cập nhật favicon.** `docusaurus.config.ts` dùng `favicon: 'img/favicon.DujayeFC.png'`.
- [ ] **Step 5: Chạy GREEN** — `npm run test:e2e -- --grep "DAT corporate footer"`; test phải pass ở desktop/mobile.
- [ ] **Step 6: Commit triển khai** — `git add docusaurus.config.ts src/components/DatCorporateFooter/index.tsx src/theme/Footer/index.tsx src/css/custom.css static/img/favicon.DujayeFC.png` và `git commit -m "feat: add DAT corporate footer"`.

### Task 3: Kiểm tra toàn bộ

**Files:**
- Verify only: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Kiểm tra kiểu và build** — `npm run typecheck && npm run build`; exit 0. Local Search/update-check warnings đã biết có thể xuất hiện.
- [ ] **Step 2: Chạy toàn bộ E2E** — `npm run test:e2e`; tất cả test thực thi pass, test desktop-only mobile skip theo thiết kế.
- [ ] **Step 3: Kiểm tra diff** — `git diff --check && git status -sb`; không whitespace error và worktree sạch sau commit.
