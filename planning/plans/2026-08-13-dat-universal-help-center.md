# DAT Universal Help Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển website thành Trung tâm hỗ trợ DAT Universal công khai cho Đại sứ xanh, Nhà lắp đặt và Khách hàng cuối, với layout tài liệu thoáng theo nguyên tắc tham chiếu Antsomi.

**Architecture:** Giữ một Docusaurus site và một `docs` plugin. Chia nội dung theo ba nhóm trong cấu trúc thư mục, dùng data catalogue cho trang chủ, giữ link cũ bằng redirect client-side trong production và áp dụng một design system CSS dùng DAT palette. Nhà lắp đặt và Khách hàng cuối chỉ có trang mở đầu an toàn cho đến khi content owner duyệt nội dung nghiệp vụ.

**Tech Stack:** Docusaurus 3.10, React 19, TypeScript, MDX, CSS Modules, Vitest, Playwright, GitHub Pages.

**Nguồn thiết kế:** `planning/specs/2026-08-13-dat-universal-help-center-design.md`; tham chiếu hình thức Antsomi do người dùng cung cấp.

---

## File map

| File | Trách nhiệm sau thay đổi |
|---|---|
| `src/data/site.ts` | Catalogue ba nhóm người dùng và các link/CTA an toàn. |
| `src/pages/index.tsx` | Trang chủ có ba điểm vào theo nhóm người dùng. |
| `src/pages/index.module.css` | Spacing và giao diện riêng cho trang chủ. |
| `src/css/custom.css` | Header trắng, typography, layout tài liệu ba cột, sidebar/TOC và responsive. |
| `docusaurus.config.ts` | Tên DAT Universal, navbar/footer mới, redirect plugin và quy tắc mở menu trái hai cấp. |
| `sidebars.ts` | Bốn sidebar độc lập, mỗi sidebar chỉ nạp nội dung của một nhóm người dùng. |
| `docs/dai-su-xanh/**` | Nội dung Đại sứ xanh được chuyển sang khu vực riêng. |
| `docs/nha-lap-dat/**` | Trang mở đầu an toàn cho Nhà lắp đặt. |
| `docs/khach-hang/**` | Trang mở đầu an toàn cho Khách hàng cuối. |
| `docs/ho-tro/**` | Hỗ trợ chung, không chỉ dành cho Đại sứ xanh. |
| `tests/unit/*.test.ts` | Guardrail cho catalogue, cấu hình và cấu trúc nội dung. |
| `tests/e2e/help-center.spec.ts` | Luồng ba nhóm, layout desktop/mobile và redirect link cũ. |
| `README.md` | Hướng dẫn quản trị cho website dùng chung. |

## Task 0: Đồng bộ an toàn với các thay đổi đã có trên GitHub

**Files:** Không sửa file sản phẩm ở bước này.

- [ ] **Step 1: Kiểm tra trạng thái local trước khi bắt đầu**

  Run:

  ```powershell
  git status --short
  git fetch origin
  git log --oneline main..origin/main
  git log --oneline origin/main..main
  ```

  Expected: biết rõ `origin/main` có commit nào được tạo trực tiếp trên GitHub sau lần đồng bộ local gần nhất. Không sửa hoặc ghi đè các bài, hình ảnh hay Pull Request của người quản trị.

- [ ] **Step 2: Đưa nhánh local về cùng lịch sử với GitHub theo cách không mất dữ liệu**

  Nếu `origin/main` đi trước còn local `main` không có commit riêng, run:

  ```powershell
  git pull --ff-only origin main
  ```

  Nếu cả hai phía đều có commit riêng, dừng và xem diff trước khi chọn cách tích hợp; không dùng `reset --hard`, không ghi đè bài viết hoặc ảnh do người dùng đã thêm.

- [ ] **Step 3: Làm việc trong nhánh tính năng tách biệt**

  Sau khi `main` đã đồng bộ, tạo worktree riêng:

  ```powershell
  git worktree add .worktrees/dat-universal-help-center -b feat/dat-universal-help-center main
  ```

  Tất cả Task 1–6 được thực hiện trong worktree này. Khi hoàn tất mới mở Pull Request để người quản trị kiểm tra toàn bộ thay đổi theo từng commit.

## Task 1: Tạo catalogue ba nhóm người dùng cho trang chủ

**Files:**

- Modify: `src/data/site.ts:1-42`
- Modify: `tests/unit/site.test.ts:1-39`

- [ ] **Step 1: Viết test RED cho ba điểm vào chính**

  Thay phần test `quickActions` bằng test dữ liệu sau:

  ```ts
  import {audienceHubs, readSiteLinks} from '../../src/data/site';

  describe('audienceHubs', () => {
    it('offers the three approved public audiences in order', () => {
      expect(audienceHubs.map((hub) => hub.title)).toEqual([
        'Đại sứ xanh',
        'Nhà lắp đặt',
        'Khách hàng cuối',
      ]);
    });

    it('links every audience to a public guide route', () => {
      expect(audienceHubs.every((hub) => hub.to.startsWith('/huong-dan/'))).toBe(
        true,
      );
    });
  });
  ```

- [ ] **Step 2: Chạy test RED**

  Run: `npm run test -- tests/unit/site.test.ts`

  Expected: FAIL vì `audienceHubs` chưa được export.

- [ ] **Step 3: Thay `quickActions` bằng catalogue nhỏ, có đường dẫn thật**

  Trong `src/data/site.ts`, dùng đúng dữ liệu sau và giữ nguyên `SiteLinks` cùng `readSiteLinks` bên dưới:

  ```ts
  export const audienceHubs = [
    {
      title: 'Đại sứ xanh',
      description:
        'Tìm hiểu chương trình, giới thiệu khách hàng và tra cứu referral.',
      to: '/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi',
      status: 'Sẵn sàng',
    },
    {
      title: 'Nhà lắp đặt',
      description:
        'Xem điểm bắt đầu dành cho đối tác lắp đặt; nội dung chuyên môn đang được bổ sung.',
      to: '/huong-dan/nha-lap-dat/bat-dau-hop-tac',
      status: 'Đang bổ sung',
    },
    {
      title: 'Khách hàng cuối',
      description:
        'Tìm hướng dẫn về giải pháp, tư vấn và các bước hỗ trợ cần thiết.',
      to: '/huong-dan/khach-hang/tim-hieu-giai-phap',
      status: 'Đang bổ sung',
    },
  ] as const;
  ```

- [ ] **Step 4: Chạy test GREEN**

  Run: `npm run test -- tests/unit/site.test.ts`

  Expected: PASS, gồm test catalogue và `readSiteLinks` fail-closed hiện có.

- [ ] **Step 5: Commit độc lập**

  ```bash
  git add src/data/site.ts tests/unit/site.test.ts
  git commit -m "feat: define DAT Universal audience hubs"
  ```

## Task 2: Chuyển nội dung Đại sứ xanh và tạo khung an toàn cho hai nhóm mới

**Files:**

- Create: `docs/dai-su-xanh/_category_.json`
- Move: `docs/bat-dau/**` → `docs/dai-su-xanh/bat-dau/**`
- Move: `docs/gioi-thieu-khach-hang/**` → `docs/dai-su-xanh/gioi-thieu-khach-hang/**`
- Move: `docs/referral-hoa-hong/**` → `docs/dai-su-xanh/referral-hoa-hong/**`
- Move: `docs/chinh-sach-tai-nguyen/**` → `docs/dai-su-xanh/chinh-sach-tai-nguyen/**`
- Create: `docs/nha-lap-dat/_category_.json`
- Create: `docs/nha-lap-dat/bat-dau-hop-tac.mdx`
- Create: `docs/khach-hang/_category_.json`
- Create: `docs/khach-hang/tim-hieu-giai-phap.mdx`
- Modify: `docs/ho-tro/_category_.json`
- Modify: `docs/ho-tro/su-dung-trung-tam-ho-tro.mdx`
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Viết test RED cho trang Đại sứ xanh mới và hai trang mở đầu**

  Thêm test này vào `tests/e2e/help-center.spec.ts`:

  ```ts
  test('each audience has a safe public starting page', async ({page}) => {
    for (const [path, heading] of [
      ['/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi', 'Đại sứ xanh là gì?'],
      ['/huong-dan/nha-lap-dat/bat-dau-hop-tac', 'Hướng dẫn dành cho Nhà lắp đặt'],
      ['/huong-dan/khach-hang/tim-hieu-giai-phap', 'Hướng dẫn dành cho Khách hàng cuối'],
    ]) {
      await page.goto(`${sitePath}${path}`);
      await expect(page.getByRole('heading', {name: heading})).toBeVisible();
    }
  });
  ```

- [ ] **Step 2: Chạy test RED**

  Run: `npm run test:e2e -- --grep "safe public starting page"`

  Expected: FAIL vì ba đường dẫn mới chưa tồn tại.

- [ ] **Step 3: Di chuyển từng thư mục bằng Git, không xóa nội dung**

  Tạo parent directory, sau đó run đúng các lệnh sau, sau khi kiểm tra bốn source path tồn tại:

  ```powershell
  New-Item -ItemType Directory -Force -Path docs/dai-su-xanh
  git mv docs/bat-dau docs/dai-su-xanh/bat-dau
  git mv docs/gioi-thieu-khach-hang docs/dai-su-xanh/gioi-thieu-khach-hang
  git mv docs/referral-hoa-hong docs/dai-su-xanh/referral-hoa-hong
  git mv docs/chinh-sach-tai-nguyen docs/dai-su-xanh/chinh-sach-tai-nguyen
  ```

  Tạo `docs/dai-su-xanh/_category_.json`:

  ```json
  {
    "label": "Đại sứ xanh",
    "position": 1,
    "link": {
      "type": "generated-index",
      "slug": "/dai-su-xanh",
      "description": "Hướng dẫn dành cho Đại sứ xanh."
    }
  }
  ```

- [ ] **Step 4: Tạo hai category mới, không công bố quy trình chưa duyệt**

  Tạo `docs/nha-lap-dat/_category_.json` và `docs/khach-hang/_category_.json` theo cùng cấu trúc, khác các giá trị sau:

  ```json
  {"label":"Nhà lắp đặt","position":2,"link":{"type":"generated-index","slug":"/nha-lap-dat","description":"Điểm bắt đầu dành cho Nhà lắp đặt."}}
  ```

  ```json
  {"label":"Khách hàng cuối","position":3,"link":{"type":"generated-index","slug":"/khach-hang","description":"Điểm bắt đầu dành cho Khách hàng cuối."}}
  ```

  Tạo `docs/nha-lap-dat/bat-dau-hop-tac.mdx`:

  ```mdx
  ---
  title: Hướng dẫn dành cho Nhà lắp đặt
  description: Điểm bắt đầu dành cho Nhà lắp đặt đang tìm tài liệu chính thức.
  sidebar_position: 1
  ---

  Nội dung hướng dẫn dành cho Nhà lắp đặt đang được DAT bổ sung và kiểm chứng.

  Không dựa vào trang này để suy ra quy trình triển khai, điều kiện hợp tác, SLA hoặc chính sách kỹ thuật khi chưa có thông báo chính thức.
  ```

  Tạo `docs/khach-hang/tim-hieu-giai-phap.mdx`:

  ```mdx
  ---
  title: Hướng dẫn dành cho Khách hàng cuối
  description: Điểm bắt đầu để tìm hiểu các hướng dẫn công khai của DAT Universal.
  sidebar_position: 1
  ---

  Nội dung hướng dẫn dành cho Khách hàng cuối đang được DAT bổ sung và kiểm chứng.

  Thông tin về sản phẩm, giá, bảo hành và tư vấn chỉ được công bố khi có nguồn chính thức được phê duyệt.
  ```

- [ ] **Step 5: Chuyển Hỗ trợ thành khu vực dùng chung**

  Đổi `docs/ho-tro/_category_.json` thành label `Hỗ trợ chung`, giữ `position: 4` và slug `/ho-tro`. Trong `docs/ho-tro/su-dung-trung-tam-ho-tro.mdx`, thay các câu chỉ nhắc “Đại sứ xanh” bằng “người dùng”, giữ nguyên hướng dẫn che dữ liệu cá nhân và component `<ConfiguredArticleHelp />`.

- [ ] **Step 6: Chạy test GREEN và build nội dung**

  Run:

  ```bash
  npm run test:e2e -- --grep "safe public starting page"
  npm run build
  ```

  Expected: PASS; build không báo broken link hoặc duplicate route.

- [ ] **Step 7: Commit độc lập**

  ```bash
  git add docs tests/e2e/help-center.spec.ts
  git commit -m "feat: organize guides by DAT Universal audience"
  ```

## Task 3: Bảo toàn đường link cũ, nhận diện dùng chung và menu trái theo từng nhóm

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `docusaurus.config.ts:5-104`
- Modify: `sidebars.ts:1-7`
- Modify: `src/components/ArticleHelp/index.tsx:8-38`
- Create: `tests/unit/help-center-config.test.ts`
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Viết test RED cho thương hiệu, menu và redirect plugin**

  Tạo `tests/unit/help-center-config.test.ts`:

  ```ts
  import {describe, expect, it} from 'vitest';
  import config from '../../docusaurus.config';

  describe('DAT Universal help-center configuration', () => {
    it('uses the approved shared help-center identity', () => {
      expect(config.title).toBe('Trung tâm hỗ trợ DAT Universal');
      expect(config.tagline).toBe(
        'Hướng dẫn dành cho Đại sứ xanh, Nhà lắp đặt và Khách hàng.',
      );
    });

    it('exposes the five approved navigation destinations', () => {
      const navbar = config.themeConfig?.navbar as {items?: Array<{label?: string}>};
      expect(navbar.items?.map((item) => item.label)).toEqual([
        'Trang chủ',
        'Đại sứ xanh',
        'Nhà lắp đặt',
        'Khách hàng cuối',
        'Hỗ trợ',
      ]);
    });

    it('declares a redirect from the former Đại sứ xanh URL', () => {
      expect(JSON.stringify(config.plugins)).toContain(
        '/huong-dan/bat-dau/dai-su-xanh-la-gi',
      );
      expect(JSON.stringify(config.plugins)).toContain(
        '/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi',
      );
    });
  });
  ```

  Đồng thời thêm hai test production này vào `tests/e2e/help-center.spec.ts`:

  ```ts
  test('former Đại sứ xanh URL redirects to its new audience route', async ({page}) => {
    await page.goto(`${sitePath}/huong-dan/bat-dau/dai-su-xanh-la-gi`);
    await expect(page).toHaveURL(
      new RegExp(`${sitePath}/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`),
    );
    await expect(page.getByRole('heading', {name: 'Đại sứ xanh là gì?'})).toBeVisible();
  });

  test('sidebar is scoped to the selected audience and shows two levels', async ({page, isMobile}) => {
    test.skip(Boolean(isMobile), 'Desktop-only sidebar hierarchy assertion');
    await page.goto(
      `${sitePath}/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`,
    );

    const sidebar = page.locator('.theme-doc-sidebar-container');
    await expect(sidebar.getByText('Bắt đầu', {exact: true})).toBeVisible();
    await expect(
      sidebar.getByText('Đại sứ xanh là gì?', {exact: true}),
    ).toBeVisible();
    await expect(sidebar.getByText('Nhà lắp đặt', {exact: true})).toHaveCount(0);
    await expect(sidebar.getByText('Khách hàng cuối', {exact: true})).toHaveCount(0);
  });
  ```

- [ ] **Step 2: Chạy test RED**

  Run:

  ```bash
  npm run test -- tests/unit/help-center-config.test.ts
  npm run test:e2e -- --grep "former Đại sứ xanh URL"
  npm run test:e2e -- --grep "sidebar is scoped to the selected audience"
  ```

  Expected: FAIL vì title, menu và redirect plugin hiện chưa đúng; link cũ chưa chuyển sang URL mới, và menu trái vẫn lẫn nội dung của các nhóm người dùng khác.

- [ ] **Step 3: Cài redirect plugin và cấu hình redirect tường minh**

  Run: `npm install --save @docusaurus/plugin-client-redirects@3.10.2`

  Trong mảng `plugins` của `docusaurus.config.ts`, thêm plugin trước Local Search:

  ```ts
  [
    '@docusaurus/plugin-client-redirects',
    {
      redirects: [
        {
          to: '/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi',
          from: '/huong-dan/bat-dau/dai-su-xanh-la-gi',
        },
        {
          to: '/huong-dan/dai-su-xanh/gioi-thieu-khach-hang',
          from: '/huong-dan/gioi-thieu-khach-hang',
        },
        {
          to: '/huong-dan/dai-su-xanh/gioi-thieu-khach-hang/tong-quan',
          from: '/huong-dan/gioi-thieu-khach-hang/tong-quan',
        },
        {
          to: '/huong-dan/dai-su-xanh/referral-hoa-hong',
          from: '/huong-dan/referral-hoa-hong',
        },
        {
          to: '/huong-dan/dai-su-xanh/referral-hoa-hong/tong-quan',
          from: '/huong-dan/referral-hoa-hong/tong-quan',
        },
        {
          to: '/huong-dan/dai-su-xanh/chinh-sach-tai-nguyen',
          from: '/huong-dan/chinh-sach-tai-nguyen',
        },
        {
          to: '/huong-dan/dai-su-xanh/chinh-sach-tai-nguyen/tong-quan',
          from: '/huong-dan/chinh-sach-tai-nguyen/tong-quan',
        },
      ],
    },
  ],
  ```

- [ ] **Step 4: Đổi title, navbar và footer sang website chung**

  Trong `docusaurus.config.ts`, dùng các giá trị sau:

  ```ts
  title: 'Trung tâm hỗ trợ DAT Universal',
  tagline: 'Hướng dẫn dành cho Đại sứ xanh, Nhà lắp đặt và Khách hàng.',
  ```

  Thay `navbar.title` và `items`:

  ```ts
  title: 'Trung tâm hỗ trợ DAT Universal',
  items: [
    {to: '/', label: 'Trang chủ', position: 'left'},
    {to: '/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi', label: 'Đại sứ xanh', position: 'left'},
    {to: '/huong-dan/nha-lap-dat/bat-dau-hop-tac', label: 'Nhà lắp đặt', position: 'left'},
    {to: '/huong-dan/khach-hang/tim-hieu-giai-phap', label: 'Khách hàng cuối', position: 'left'},
    {to: '/huong-dan/ho-tro/su-dung-trung-tam-ho-tro', label: 'Hỗ trợ', position: 'left'},
  ],
  ```

  Trong `sidebars.ts`, thay một sidebar dùng chung bằng bốn sidebar độc lập. Mỗi sidebar nạp đúng một thư mục, vì vậy một bài Đại sứ xanh chỉ có menu Đại sứ xanh ở cột trái:

  ```ts
  const sidebars: SidebarsConfig = {
    daiSuXanhSidebar: [{type: 'autogenerated', dirName: 'dai-su-xanh'}],
    nhaLapDatSidebar: [{type: 'autogenerated', dirName: 'nha-lap-dat'}],
    khachHangSidebar: [{type: 'autogenerated', dirName: 'khach-hang'}],
    hoTroSidebar: [{type: 'autogenerated', dirName: 'ho-tro'}],
  };
  ```

  Trong cấu hình `preset` → `docs`, thêm `sidebarItemsGenerator` để cấu trúc của từng sidebar tự động tuân thủ quy tắc hai cấp, kể cả khi người quản trị thêm category mới sau này:

  ```ts
  sidebarItemsGenerator: async ({
    defaultSidebarItemsGenerator,
    ...generatorArgs
  }) => {
    const items = await defaultSidebarItemsGenerator(generatorArgs);

    const applyDefaultExpansion = (sidebarItems: typeof items, level = 1) =>
      sidebarItems.map((item) => {
        if (item.type !== 'category') {
          return item;
        }

        return {
          ...item,
          collapsible: item.items.length > 0,
          collapsed: level >= 2,
          items: applyDefaultExpansion(item.items, level + 1),
        };
      });

    return applyDefaultExpansion(items);
  },
  ```

  Nghĩa là: trong sidebar của một nhóm đã chọn, chủ đề cấp 1 luôn mở để thấy bài cấp 2; cấp sâu hơn mặc định thu gọn. Khi người đọc đang ở một bài, Docusaurus vẫn tự mở đúng nhánh chứa bài đó để họ biết mình đang ở đâu.

  Cập nhật footer để link `Trung tâm hỗ trợ` trỏ `/`, đồng thời thêm ba link audience mới. Trong `ArticleHelp`, đổi fallback copy thành “Hãy xem mục Hỗ trợ chung trước khi liên hệ đội hỗ trợ.” và nhãn link thành `Xem mục Hỗ trợ`. Kiểm tra trang 404 vẫn dùng nhãn `Xem mục Hỗ trợ`; không sửa file 404 nếu nhãn này đã đúng.

- [ ] **Step 5: Chạy test GREEN và typecheck**

  Run:

  ```bash
  npm run test -- tests/unit/help-center-config.test.ts
  npm run test:e2e -- --grep "former Đại sứ xanh URL"
  npm run test:e2e -- --grep "sidebar is scoped to the selected audience"
  npm run typecheck
  ```

  Expected: PASS, không có TypeScript error từ config hoặc navbar items; menu trái của bài Đại sứ xanh chỉ hiện chủ đề/bài Đại sứ xanh và hiển thị đúng hai cấp.

- [ ] **Step 6: Commit độc lập**

  ```bash
  git add package.json package-lock.json docusaurus.config.ts sidebars.ts src/components/ArticleHelp/index.tsx tests/unit/help-center-config.test.ts tests/e2e/help-center.spec.ts
  git commit -m "feat: rebrand shared DAT Universal help center"
  ```

## Task 4: Xây lại trang chủ theo ba nhóm người dùng

**Files:**

- Modify: `src/pages/index.tsx:1-87`
- Modify: `src/pages/index.module.css:1-251`
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Viết test RED cho homepage mới**

  Thay cả hai test homepage cũ (test bốn quick action và test hero gradient/màu cũ) bằng:

  ```ts
  test('homepage routes users to the three DAT Universal audiences', async ({page}) => {
    await page.goto(`${sitePath}/`);

    await expect(
      page.getByRole('heading', {name: 'Trung tâm hỗ trợ DAT Universal'}),
    ).toBeVisible();

    for (const label of ['Đại sứ xanh', 'Nhà lắp đặt', 'Khách hàng cuối']) {
      await expect(page.getByRole('link', {name: new RegExp(label)})).toHaveCount(1);
    }

    await expect(page.getByText('Đang bổ sung')).toHaveCount(2);
    await expect(page.getByRole('link', {name: 'Đăng ký Đại sứ xanh'})).toHaveCount(0);
  });
  ```

- [ ] **Step 2: Chạy test RED**

  Run: `npm run test:e2e -- --grep "three DAT Universal audiences"`

  Expected: FAIL vì trang chủ vẫn hiển thị hero và quick action riêng Đại sứ xanh.

- [ ] **Step 3: Viết component trang chủ tối giản, không CTA giả**

  Trong `src/pages/index.tsx`, bỏ `SearchBar`, `RegistrationCta`, `quickActions` và `readSiteLinks`; chỉ import `audienceHubs`. Dùng cấu trúc sau:

  ```tsx
  <Layout
    title="Trung tâm hỗ trợ DAT Universal"
    description="Hướng dẫn dành cho Đại sứ xanh, Nhà lắp đặt và Khách hàng.">
    <main>
      <section className={styles.intro}>
        <div className="container">
          <p className={styles.eyebrow}>DAT UNIVERSAL</p>
          <h1>Trung tâm hỗ trợ DAT Universal</h1>
          <p className={styles.lead}>
            Hướng dẫn dành cho Đại sứ xanh, Nhà lắp đặt và Khách hàng.
          </p>
        </div>
      </section>
      <section className={styles.audiences} aria-labelledby="audience-title">
        <div className="container">
          <h2 id="audience-title">Chọn nhóm của bạn</h2>
          <div className={styles.audienceGrid}>
            {audienceHubs.map((hub) => (
              <Link className={styles.audienceCard} key={hub.title} to={hub.to}>
                <span className={styles.status}>{hub.status}</span>
                <h3>{hub.title}</h3>
                <p>{hub.description}</p>
                <span className={styles.audienceLink}>Xem hướng dẫn →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  </Layout>
  ```

- [ ] **Step 4: Viết CSS homepage theo nhịp đọc mới**

  Thay nội dung `src/pages/index.module.css` bằng styles chỉ dành cho intro và card. Các giá trị bắt buộc:

  ```css
  .intro { padding: clamp(4rem, 9vw, 7.5rem) 0 3.5rem; background: #fff; }
  .intro h1 { max-width: 900px; margin: 0.5rem 0 1.25rem; color: var(--dat-text); font-size: clamp(2.5rem, 5vw, 3.25rem); line-height: 1.08; }
  .lead { max-width: 650px; margin: 0; color: var(--dat-muted); font-size: 1.125rem; line-height: 1.7; }
  .audiences { padding: 2rem 0 6rem; background: #fff; }
  .audienceGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
  .audienceCard { min-height: 260px; padding: 2rem; border: 1px solid var(--dat-border); border-radius: 0.875rem; box-shadow: none; }
  @media (max-width: 996px) { .audienceGrid { grid-template-columns: 1fr; } }
  ```

  Hoàn thiện hover/focus bằng DAT blue, giữ `outline` có contrast và không dùng gradient hero cũ.

- [ ] **Step 5: Chạy test GREEN**

  Run: `npm run test:e2e -- --grep "three DAT Universal audiences"`

  Expected: PASS; ba link xuất hiện một lần và hai card chưa hoàn thiện có nhãn `Đang bổ sung`.

- [ ] **Step 6: Commit độc lập**

  ```bash
  git add src/pages/index.tsx src/pages/index.module.css tests/e2e/help-center.spec.ts
  git commit -m "feat: add DAT Universal audience homepage"
  ```

## Task 5: Áp dụng layout tài liệu ba cột theo chuẩn hình thức đã duyệt

**Files:**

- Modify: `src/css/custom.css:1-334`
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Viết test RED cho shell trắng, typography và menu desktop**

  Thay test palette cũ đang yêu cầu navbar nền xanh bằng test sau. Đồng thời cập nhật assertion của navbar search để xác nhận nó dùng shell trắng, border DAT và focus outline DAT blue/dark; giữ nguyên test logo, accessibility mobile và no-horizontal-overflow:

  ```ts
  test('documentation uses the approved spacious three-column DAT layout', async ({page, isMobile}) => {
    test.skip(Boolean(isMobile), 'Desktop-only documentation layout assertion');
    await page.goto(`${sitePath}/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`);

    await expect(page.locator('.navbar')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.locator('.navbar')).toHaveCSS('min-height', '120px');
    await expect(page.locator('.theme-doc-sidebar-container')).toBeVisible();
    await expect(page.locator('.table-of-contents')).toBeVisible();
    await expect(page.locator('.theme-doc-markdown')).toHaveCSS('font-size', '18px');
    await expect(page.locator('.theme-doc-markdown')).toHaveCSS('line-height', '31.5px');
  });
  ```

- [ ] **Step 2: Chạy test RED**

  Run: `npm run test:e2e -- --grep "spacious three-column DAT layout"`

  Expected: FAIL vì navbar hiện DAT blue và markdown chưa ở 18px/1.75.

- [ ] **Step 3: Cập nhật CSS global, giữ DAT palette và bỏ giao diện hero cũ**

  Trong `src/css/custom.css`, thay block `.navbar` hiện tại bằng shell trắng có các giá trị sau:

  ```css
  :root {
    --ifm-navbar-height: 7.5rem;
    --doc-shell-max-width: 107.5rem;
    --doc-page-gutter: clamp(1.5rem, 5vw, 6rem);
    --doc-column-gap: clamp(3rem, 4vw, 5rem);
  }

  .navbar {
    min-height: var(--ifm-navbar-height);
    color: var(--dat-text);
    background: #fff;
    border-bottom: 1px solid var(--dat-border);
    box-shadow: none;
  }

  .navbar__title,
  .navbar__brand,
  .navbar__link,
  .navbar__toggle { color: var(--dat-text); }

  .navbar__link--active,
  .navbar__link:hover { color: var(--dat-blue-dark); }
  ```

  Giữ logo DAT trên nền trắng; đổi `.navbar__logo` thành không có card trắng lồng bên trong. Giữ ô tìm kiếm trắng có border `var(--dat-border)`, rộng 280px trên desktop và focus outline `var(--dat-blue-dark)`.

  Thêm các rule tài liệu:

  ```css
  @media (min-width: 997px) {
    .container { max-width: var(--doc-shell-max-width); padding-right: var(--doc-page-gutter); padding-left: var(--doc-page-gutter); }
    .theme-doc-sidebar-container { width: 18.75rem; background: #fff; border-right: 0 !important; }
    .theme-doc-sidebar-menu { padding-top: 2.5rem; }
    .theme-doc-toc-desktop { width: 15.5rem; }
    .table-of-contents { border-left: 1px solid var(--dat-border); padding-left: 1rem; }
  }

  .theme-doc-markdown { max-width: 56.25rem; font-size: 1.125rem; line-height: 1.75; }
  .theme-doc-markdown > h1:first-child { color: var(--dat-text); font-size: clamp(2.5rem, 4vw, 3.25rem); line-height: 1.1; }
  .theme-doc-markdown h2 { margin-top: 4.5rem; color: var(--dat-blue-dark); font-size: clamp(1.875rem, 3vw, 2.125rem); }
  .theme-doc-markdown p { margin-bottom: 1.25rem; }
  .theme-doc-markdown img { display: block; max-width: 100%; margin: 2rem 0; }
  ```

  Giữ CSS 390px hiện có; thêm rule mobile đặt navbar về tối thiểu 4.5rem, ẩn TOC desktop theo Docusaurus default và giữ sidebar trong menu thu gọn. Xóa hoặc thay mọi selector liên quan đến homepage hero cũ để không tạo style chết.

- [ ] **Step 4: Kiểm tra RED/GREEN tại desktop và mobile**

  Run:

  ```bash
  npm run test:e2e -- --grep "spacious three-column DAT layout"
  npm run test:e2e -- --grep "mobile has no horizontal overflow"
  ```

  Expected: PASS ở desktop; mobile PASS và không xuất hiện horizontal overflow.

- [ ] **Step 5: Commit độc lập**

  ```bash
  git add src/css/custom.css tests/e2e/help-center.spec.ts
  git commit -m "style: apply spacious DAT documentation layout"
  ```

## Task 6: Cập nhật README và chạy regression suite

**Files:**

- Modify: `tests/e2e/help-center.spec.ts`
- Modify: `README.md:1-99`

- [ ] **Step 1: Cập nhật README cho đội quản trị**

  Đổi tiêu đề thành `Trung tâm hỗ trợ DAT Universal`. Thay phần mục tiêu và quy trình thêm bài bằng nội dung nêu rõ bốn khu vực `dai-su-xanh`, `nha-lap-dat`, `khach-hang`, `ho-tro`; quy tắc không tạo nội dung nghiệp vụ chưa duyệt; quy trình branch → Pull Request → review → merge; và ghi chú custom domain `huongdan.datuniversal.com` chỉ cấu hình sau khi có quyền DNS.

- [ ] **Step 2: Chạy toàn bộ regression suite**

  Run:

  ```bash
  npm run typecheck
  npm run test
  npm run build
  npm run test:e2e
  git diff --check
  ```

  Expected: Tất cả command exit 0; E2E kiểm tra homepage ba nhóm, layout ba cột desktop, mobile 390px, search, 404, CTA fail-closed và redirect link cũ.

- [ ] **Step 3: Kiểm tra giao diện sau build**

  Run: `npm run serve`

  Kiểm tra thủ công tại desktop và mobile 390px:

  ```text
  /                                  → ba audience card, header trắng, search hoạt động
  /huong-dan/dai-su-xanh/...         → sidebar trái chỉ có Đại sứ xanh + nội dung giữa + TOC phải
  /huong-dan/nha-lap-dat/...         → chỉ thông báo đang bổ sung, không CTA giả
  /huong-dan/khach-hang/...          → chỉ thông báo đang bổ sung, không CTA giả
  /huong-dan/bat-dau/...             → tự chuyển đến đường dẫn Đại sứ xanh mới
  ```

  Dừng server sau kiểm tra; không commit thư mục build, report hoặc test result.

- [ ] **Step 4: Commit độc lập**

  ```bash
  git add README.md tests/e2e/help-center.spec.ts
  git commit -m "docs: document DAT Universal help center workflow"
  ```

## Lưu ý triển khai

- Không cấu hình custom domain hoặc DNS trong plan này. Việc đó cần quyền quản lý domain riêng và được thực hiện sau khi website mới đã ổn định.
- Không merge khi `build-and-test` trên GitHub Actions còn đỏ. Với GitHub Pages static hosting, redirect client-side chỉ được kiểm tra đầy đủ bằng production build.
- Không đưa hình có dữ liệu khách hàng thật vào bài công khai. Tên hình dùng chữ thường, không dấu, không khoảng trắng và đặt dưới `static/img/`.
