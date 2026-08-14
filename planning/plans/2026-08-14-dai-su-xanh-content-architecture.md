# Đại sứ xanh Content Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public Đại sứ xanh guide into the approved two-level sidebar with 16 topic pages, 47 source-safe article placeholders, and preserved old links.

**Architecture:** Keep one structured, typed inventory of the approved groups, topics, article titles and display types in `src/data/ambassadorContent.ts`. The manual Docusaurus sidebar consumes that inventory and each topic overview page renders article cards through a small shared component. Individual MDX files remain the future editing surface for approved content, while their initial state shows “Đang cập nhật” and no unverified business information.

**Tech Stack:** Docusaurus 3, React 19, TypeScript, MDX, Vitest, Playwright.

---

## File structure

| Path | Responsibility |
| --- | --- |
| `src/data/ambassadorContent.ts` | One public-safe inventory of 4 groups, 16 topics and 47 article cards. |
| `src/components/AmbassadorContent/index.tsx` | Renders topic card grids and the reusable “Đang cập nhật” article state. |
| `src/css/custom.css` | Scoped card-grid layout, focus and mobile styles. |
| `sidebars.ts` | Uses the inventory to show only group and topic levels for Đại sứ xanh. |
| `docusaurus.config.ts` | Changes entry links and preserves all old Đại sứ xanh routes through redirects. |
| `docs/dai-su-xanh/**/index.mdx` | Sixteen topic overview pages; each uses the card-grid component. |
| `docs/dai-su-xanh/**/*.mdx` | Forty-seven individual, source-safe article placeholders. |
| `docs/_templates/huong-dan.mdx` | Explains how an editor replaces a placeholder safely after approval. |
| `tests/unit/ambassador-content.test.tsx` | Inventory and card-rendering rules. |
| `tests/unit/help-center-config.test.ts` | New public entry route and legacy redirects. |
| `tests/unit/site.test.ts` | Homepage hub routes to the new Đại sứ xanh start page. |
| `tests/e2e/help-center.spec.ts` | Desktop sidebar, card pages, placeholder state and redirect behaviour. |
| `README.md` | Documents the new two-level content model and implementation plan. |

### Task 1: Write the failing safety and navigation tests

**Files:**
- Create: `tests/unit/ambassador-content.test.tsx`
- Modify: `tests/unit/help-center-config.test.ts`
- Modify: `tests/unit/site.test.ts`
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 0: Create the dedicated feature branch from the approved design-and-plan baseline.**

```bash
git switch -c feat/dai-su-xanh-content-architecture
```

- [ ] **Step 1: Add a unit test for the approved inventory and safe placeholder state.**

```tsx
import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {
  ambassadorGuideGroups,
  findAmbassadorTopic,
} from '../../src/data/ambassadorContent';
import {AmbassadorTopicCards} from '../../src/components/AmbassadorContent';

describe('Đại sứ xanh content inventory', () => {
  it('contains exactly the four approved groups and sixteen topics', () => {
    expect(ambassadorGuideGroups.map((group) => group.title)).toEqual([
      'Gia nhập hệ sinh thái',
      'Kiến thức giải pháp',
      'Trung tâm hỗ trợ',
      'Quy ước hợp tác',
    ]);
    expect(
      ambassadorGuideGroups.flatMap((group) => group.topics),
    ).toHaveLength(16);
  });

  it('creates 47 article placeholders without source or support URLs', () => {
    const articles = ambassadorGuideGroups.flatMap((group) =>
      group.topics.flatMap((topic) => topic.articles),
    );
    expect(articles).toHaveLength(47);
    expect(articles.every((article) => article.status === 'updating')).toBe(
      true,
    );
    expect(JSON.stringify(articles)).not.toMatch(/https?:\/\//);
  });

  it('renders article cards for one topic with a visible update state', () => {
    render(<AmbassadorTopicCards topicId="chao-mung-dai-su-xanh" />);

    expect(
      screen.getByRole('link', {name: /Khái niệm & giá trị nền tảng/}),
    ).toHaveAttribute(
      'href',
      '/huong-dan/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh/khai-niem-va-gia-tri-nen-tang',
    );
    expect(screen.getAllByText('Đang cập nhật')).toHaveLength(5);
    expect(findAmbassadorTopic('quy-dinh-xu-ly-vi-pham')).toBeDefined();
  });
});
```

- [ ] **Step 2: Extend configuration and hub tests with the new approved start route.**

```ts
const ambassadorStart =
  '/huong-dan/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh';

expect(JSON.stringify(config.plugins)).toContain(ambassadorStart);
expect(audienceHubs.find((hub) => hub.title === 'Đại sứ xanh')?.to).toBe(
  ambassadorStart,
);
```

Add assertions that the old current route `/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi` redirects to `ambassadorStart` and that the old introduction, referral and policy URLs redirect to the three destinations listed in the approved spec.

- [ ] **Step 3: Add the desktop E2E checks before implementation.**

```ts
test('Đại sứ xanh uses a two-level sidebar and topic cards', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only sidebar hierarchy assertion');
  await page.goto(
    `${sitePath}/huong-dan/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh`,
  );

  const sidebar = page.locator('.theme-doc-sidebar-container');
  await expect(sidebar.getByText('Gia nhập hệ sinh thái', {exact: true})).toBeVisible();
  await expect(sidebar.getByText('Chào mừng Đại sứ xanh', {exact: true})).toBeVisible();
  await expect(
    sidebar.getByText('Khái niệm & giá trị nền tảng', {exact: true}),
  ).toHaveCount(0);

  await expect(
    page.getByRole('link', {name: /Khái niệm & giá trị nền tảng/}),
  ).toBeVisible();
  await expect(page.getAllByText('Đang cập nhật')).toHaveCount(5);
});
```

Add a redirect E2E test that visits `/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`, expects the new start URL, and expects the topic page heading `Chào mừng Đại sứ xanh`.

- [ ] **Step 4: Run the focused tests to confirm they fail because the new inventory, route and overview page do not exist.**

Run: `npm run test -- tests/unit/ambassador-content.test.tsx tests/unit/help-center-config.test.ts tests/unit/site.test.ts`
Expected: FAIL with missing `ambassadorContent` or changed-route assertions.

Run in PowerShell:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npx playwright test tests/e2e/help-center.spec.ts --project=desktop --grep "Đại sứ xanh uses a two-level|former Đại sứ xanh route"
Remove-Item Env:\PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
```

Expected: FAIL because the new topic route and two-level sidebar do not exist.

- [ ] **Step 5: Commit the red tests.**

```bash
git add tests/unit/ambassador-content.test.tsx tests/unit/help-center-config.test.ts tests/unit/site.test.ts tests/e2e/help-center.spec.ts
git commit -m "test: cover ambassador content architecture"
```

### Task 2: Add the content inventory and reusable card components

**Files:**
- Create: `src/data/ambassadorContent.ts`
- Create: `src/components/AmbassadorContent/index.tsx`
- Modify: `src/css/custom.css`
- Test: `tests/unit/ambassador-content.test.tsx`

- [ ] **Step 1: Create the typed inventory using this exact set of article entries.**

```ts
export type AmbassadorArticleKind = 'guide' | 'video' | 'document';

export type AmbassadorArticle = {
  id: string;
  title: string;
  kind: AmbassadorArticleKind;
  status: 'updating';
};

export type AmbassadorTopic = {
  id: string;
  groupId: string;
  title: string;
  articles: readonly AmbassadorArticle[];
};

export type AmbassadorGroup = {
  id: string;
  title: string;
  topics: readonly AmbassadorTopic[];
};

const updating = 'updating' as const;

export const ambassadorGuideGroups: readonly AmbassadorGroup[] = [
  {
    id: 'gia-nhap-he-sinh-thai',
    title: 'Gia nhập hệ sinh thái',
    topics: [
      {id: 'chao-mung-dai-su-xanh', groupId: 'gia-nhap-he-sinh-thai', title: 'Chào mừng Đại sứ xanh', articles: [
        {id: 'khai-niem-va-gia-tri-nen-tang', title: 'Khái niệm & giá trị nền tảng', kind: 'guide', status: updating},
        {id: 'gioi-thieu-nen-tang', title: 'Giới thiệu nền tảng', kind: 'video', status: updating},
        {id: 'quyen-loi', title: 'Quyền lợi', kind: 'guide', status: updating},
        {id: 'chinh-sach', title: 'Chính sách', kind: 'guide', status: updating},
        {id: 'huong-dan-nen-tang', title: 'Hướng dẫn nền tảng', kind: 'video', status: updating},
      ]},
      {id: 'chia-se-bai-viet-va-noi-dung', groupId: 'gia-nhap-he-sinh-thai', title: 'Chia sẻ bài viết & nội dung', articles: [
        {id: 'cach-lay-hinh-anh-video', title: 'Cách lấy hình ảnh/video', kind: 'guide', status: updating},
        {id: 'cach-chia-se-len-facebook-zalo', title: 'Cách chia sẻ lên Facebook/Zalo', kind: 'guide', status: updating},
        {id: 'cach-lay-link-ca-nhan', title: 'Cách lấy link cá nhân', kind: 'guide', status: updating},
      ]},
      {id: 'tim-kiem-va-theo-doi-khach-hang', groupId: 'gia-nhap-he-sinh-thai', title: 'Tìm kiếm & theo dõi khách hàng', articles: [
        {id: 'tao-khach-hang', title: 'Tạo khách hàng', kind: 'guide', status: updating},
        {id: 'theo-doi-trang-thai', title: 'Theo dõi trạng thái', kind: 'guide', status: updating},
        {id: 'quan-ly-khach-hang', title: 'Quản lý khách hàng', kind: 'guide', status: updating},
        {id: 'meo-tim-khach-hang', title: 'Mẹo tìm khách hàng', kind: 'guide', status: updating},
      ]},
    ],
  },
  {
    id: 'kien-thuc-giai-phap',
    title: 'Kiến thức giải pháp',
    topics: [
      {id: 'tong-quan-giai-phap', groupId: 'kien-thuc-giai-phap', title: 'Tổng quan giải pháp', articles: [
        {id: 'cau-tao-dien-mat-troi', title: 'Cấu tạo điện mặt trời', kind: 'guide', status: updating},
        {id: 'nguyen-ly-hoat-dong', title: 'Nguyên lý hoạt động', kind: 'guide', status: updating},
        {id: 'loi-ich', title: 'Lợi ích', kind: 'guide', status: updating},
        {id: 'thuat-ngu-co-ban', title: 'Thuật ngữ cơ bản', kind: 'guide', status: updating},
      ]},
      {id: 'giai-phap-theo-nhu-cau', groupId: 'kien-thuc-giai-phap', title: 'Giải pháp theo nhu cầu', articles: [
        {id: 'hoa-luoi', title: 'Hòa lưới', kind: 'guide', status: updating},
        {id: 'hybrid', title: 'Hybrid', kind: 'guide', status: updating},
        {id: 'luu-tru', title: 'Lưu trữ', kind: 'guide', status: updating},
      ]},
      {id: 'tai-lieu-giai-phap', groupId: 'kien-thuc-giai-phap', title: 'Tài liệu giải pháp', articles: [
        {id: 'catalogue', title: 'Catalogue', kind: 'document', status: updating},
        {id: 'brochure', title: 'Brochure', kind: 'document', status: updating},
      ]},
      {id: 'du-an-thuc-te', groupId: 'kien-thuc-giai-phap', title: 'Dự án thực tế', articles: [
        {id: 'cong-trinh-tieu-bieu', title: 'Công trình tiêu biểu', kind: 'guide', status: updating},
        {id: 'video-thuc-te', title: 'Video thực tế', kind: 'video', status: updating},
      ]},
    ],
  },
  {
    id: 'trung-tam-ho-tro',
    title: 'Trung tâm hỗ trợ',
    topics: [
      {id: 'cau-hoi-thuong-gap', groupId: 'trung-tam-ho-tro', title: 'Câu hỏi thường gặp', articles: []},
      {id: 'huong-dan-quan-ly-tai-khoan', groupId: 'trung-tam-ho-tro', title: 'Hướng dẫn quản lý tài khoản', articles: [
        {id: 'thay-doi-thong-tin-tai-khoan', title: 'Thay đổi thông tin tài khoản', kind: 'guide', status: updating},
        {id: 'cach-rut-hoa-hong', title: 'Cách rút hoa hồng', kind: 'guide', status: updating},
      ]},
      {id: 'gui-yeu-cau-ho-tro', groupId: 'trung-tam-ho-tro', title: 'Gửi yêu cầu hỗ trợ', articles: [
        {id: 'bao-loi-he-thong', title: 'Báo lỗi hệ thống', kind: 'guide', status: updating},
        {id: 'can-ho-tro-khach-hang', title: 'Cần hỗ trợ khách hàng', kind: 'guide', status: updating},
        {id: 'van-de-tai-khoan', title: 'Vấn đề tài khoản', kind: 'guide', status: updating},
        {id: 'van-de-hoa-hong', title: 'Vấn đề hoa hồng', kind: 'guide', status: updating},
      ]},
      {id: 'lien-he-dat-universal', groupId: 'trung-tam-ho-tro', title: 'Liên hệ DAT Universal', articles: [
        {id: 'hotline', title: 'Hotline', kind: 'guide', status: updating},
        {id: 'mail', title: 'Mail', kind: 'guide', status: updating},
        {id: 'zalo', title: 'Zalo', kind: 'guide', status: updating},
        {id: 'thoi-gian-ho-tro', title: 'Thời gian hỗ trợ', kind: 'guide', status: updating},
        {id: 'chuyen-vien-ho-tro', title: 'Chuyên viên hỗ trợ', kind: 'guide', status: updating},
      ]},
      {id: 'thong-bao-va-cap-nhat', groupId: 'trung-tam-ho-tro', title: 'Thông báo & cập nhật', articles: [
        {id: 'bao-tri-he-thong', title: 'Bảo trì hệ thống', kind: 'guide', status: updating},
        {id: 'su-kien', title: 'Sự kiện', kind: 'guide', status: updating},
        {id: 'chuong-trinh-thuong', title: 'Chương trình thưởng', kind: 'guide', status: updating},
      ]},
    ],
  },
  {
    id: 'quy-uoc-hop-tac',
    title: 'Quy ước hợp tác',
    topics: [
      {id: 'quy-che-dai-su-xanh', groupId: 'quy-uoc-hop-tac', title: 'Quy chế Đại sứ xanh', articles: [
        {id: 'dieu-kien-tham-gia', title: 'Điều kiện tham gia', kind: 'guide', status: updating},
        {id: 'vai-tro-dai-su', title: 'Vai trò đại sứ', kind: 'guide', status: updating},
        {id: 'quy-tac-hoat-dong', title: 'Quy tắc hoạt động', kind: 'guide', status: updating},
      ]},
      {id: 'chinh-sach-hoa-hong', groupId: 'quy-uoc-hop-tac', title: 'Chính sách hoa hồng', articles: [
        {id: 'cach-tinh-hoa-hong', title: 'Cách tính hoa hồng', kind: 'guide', status: updating},
        {id: 'dieu-kien-nhan-hoa-hong', title: 'Điều kiện nhận hoa hồng', kind: 'guide', status: updating},
        {id: 'thoi-gian-thanh-toan', title: 'Thời gian thanh toán', kind: 'guide', status: updating},
        {id: 'truong-hop-khong-duoc-tinh-hoa-hong', title: 'Các trường hợp không được tính hoa hồng', kind: 'guide', status: updating},
        {id: 'cach-tinh-thuong', title: 'Cách tính thưởng', kind: 'guide', status: updating},
      ]},
      {id: 'quy-trinh-gioi-thieu-khach-hang', groupId: 'quy-uoc-hop-tac', title: 'Quy trình giới thiệu khách hàng', articles: [
        {id: 'quy-trinh-tao-khach-hang', title: 'Quy trình tạo khách hàng', kind: 'guide', status: updating},
        {id: 'quy-trinh-thanh-toan-hoa-hong', title: 'Quy trình thanh toán hoa hồng', kind: 'guide', status: updating},
      ]},
      {id: 'quy-dinh-xu-ly-vi-pham', groupId: 'quy-uoc-hop-tac', title: 'Quy định xử lý vi phạm', articles: []},
    ],
  },
];

export function findAmbassadorTopic(id: string) {
  return ambassadorGuideGroups
    .flatMap((group) => group.topics)
    .find((topic) => topic.id === id);
}

export function ambassadorTopicPath(topic: AmbassadorTopic) {
  return `/huong-dan/dai-su-xanh/${topic.groupId}/${topic.id}`;
}

export function ambassadorArticlePath(
  topic: AmbassadorTopic,
  article: AmbassadorArticle,
) {
  return `${ambassadorTopicPath(topic)}/${article.id}`;
}
```

- [ ] **Step 2: Create `AmbassadorTopicCards` and `UpdatingArticle`.**

```tsx
import Link from '@docusaurus/Link';
import {
  ambassadorArticlePath,
  findAmbassadorTopic,
  type AmbassadorArticleKind,
} from '@site/src/data/ambassadorContent';

const kindLabels: Record<AmbassadorArticleKind, string> = {
  guide: 'Hướng dẫn',
  video: 'Video',
  document: 'Tài liệu',
};

export function AmbassadorTopicCards({topicId}: {topicId: string}) {
  const topic = findAmbassadorTopic(topicId);
  if (!topic) {
    throw new Error(`Unknown Đại sứ xanh topic: ${topicId}`);
  }

  if (topic.articles.length === 0) {
    return <UpdatingArticle />;
  }

  return (
    <section className="ambassador-topic-cards" aria-label="Bài viết trong chủ đề">
      <p className="ambassador-topic-cards__intro">
        Chọn bài viết bạn cần. Nội dung chi tiết đang được DAT Universal cập nhật.
      </p>
      <div className="ambassador-topic-cards__grid">
        {topic.articles.map((article) => (
          <Link
            className="ambassador-topic-card"
            key={article.id}
            to={ambassadorArticlePath(topic, article)}
          >
            <span className="ambassador-topic-card__kind">{kindLabels[article.kind]}</span>
            <h2>{article.title}</h2>
            <span className="ambassador-topic-card__status">Đang cập nhật</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function UpdatingArticle({kind = 'guide'}: {kind?: AmbassadorArticleKind}) {
  return (
    <section className="ambassador-updating" data-content-kind={kind}>
      <h2>Nội dung đang cập nhật</h2>
      <p>DAT Universal đang cập nhật nội dung chính thức cho mục này.</p>
    </section>
  );
}
```

- [ ] **Step 3: Add scoped CSS for accessible card grids.**

```css
.ambassador-topic-cards__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.ambassador-topic-card {
  display: flex;
  min-height: 10rem;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  border: 1px solid #bfe9ff;
  border-radius: 1rem;
  color: var(--ifm-font-color-base);
  background: #fff;
  text-decoration: none;
}

.ambassador-topic-card:hover {
  border-color: var(--dat-blue);
  box-shadow: 0 8px 20px rgb(0 79 122 / 12%);
}

.ambassador-topic-card:focus-visible {
  outline: 3px solid var(--dat-sky-50);
  outline-offset: 3px;
}

.ambassador-topic-card__kind,
.ambassador-topic-card__status {
  width: fit-content;
  font-size: 0.875rem;
  font-weight: 700;
}

.ambassador-topic-card__status {
  color: var(--dat-blue-dark);
}

.ambassador-updating {
  margin-top: 1.5rem;
  padding: 1.25rem;
  border-left: 4px solid var(--dat-orange);
  border-radius: 0.5rem;
  background: var(--dat-sky-50);
}

@media (max-width: 780px) {
  .ambassador-topic-cards__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Run unit tests to verify the data inventory and card component are green.**

Run: `npm run test -- tests/unit/ambassador-content.test.tsx`
Expected: PASS with three tests.

- [ ] **Step 5: Commit the shared inventory and components.**

```bash
git add src/data/ambassadorContent.ts src/components/AmbassadorContent/index.tsx src/css/custom.css tests/unit/ambassador-content.test.tsx
git commit -m "feat: add ambassador content inventory"
```

### Task 3: Replace the autogenerated Ambassador sidebar and public entry routes

**Files:**
- Modify: `sidebars.ts`
- Modify: `docusaurus.config.ts`
- Modify: `src/data/site.ts`
- Modify: `tests/unit/help-center-config.test.ts`
- Modify: `tests/unit/site.test.ts`

- [ ] **Step 1: Change only `daiSuXanhSidebar` to manual two-level items.**

```ts
import {ambassadorGuideGroups} from './src/data/ambassadorContent';

const daiSuXanhSidebar = ambassadorGuideGroups.map((group) => ({
  type: 'category' as const,
  label: group.title,
  collapsible: true,
  collapsed: false,
  link: {
    type: 'generated-index' as const,
    title: group.title,
    slug: `/dai-su-xanh/${group.id}`,
  },
  items: group.topics.map((topic) => ({
    type: 'doc' as const,
    id: `dai-su-xanh/${topic.groupId}/${topic.id}/index`,
    label: topic.title,
  })),
}));

const sidebars: SidebarsConfig = {
  daiSuXanhSidebar,
  nhaLapDatSidebar: [{type: 'autogenerated', dirName: 'nha-lap-dat'}],
  khachHangSidebar: [{type: 'autogenerated', dirName: 'khach-hang'}],
  hoTroSidebar: [{type: 'autogenerated', dirName: 'ho-tro'}],
};
```

Keep the other three audience sidebars untouched.

- [ ] **Step 2: Change all Đại sứ xanh entry links to the new start topic.**

```ts
const ambassadorStart =
  '/huong-dan/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh';
```

Use `ambassadorStart` for the navbar’s `Đại sứ xanh` item, the footer’s `Đại sứ xanh` item, and the `audienceHubs` entry in `src/data/site.ts`.

- [ ] **Step 3: Preserve all sixteen legacy redirects with these destination groups.**

| Former path suffix | New destination |
| --- | --- |
| `/bat-dau/dai-su-xanh-la-gi` | `/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh` |
| `/bat-dau` | `/dai-su-xanh/gia-nhap-he-sinh-thai` |
| `/gioi-thieu-khach-hang` and `/gioi-thieu-khach-hang/tong-quan` | `/dai-su-xanh/quy-uoc-hop-tac/quy-trinh-gioi-thieu-khach-hang` |
| `/referral-hoa-hong` and `/referral-hoa-hong/tong-quan` | `/dai-su-xanh/quy-uoc-hop-tac/chinh-sach-hoa-hong` |
| `/chinh-sach-tai-nguyen` and `/chinh-sach-tai-nguyen/tong-quan` | `/dai-su-xanh/quy-uoc-hop-tac` |

Keep the eight existing unscoped source URLs and add the eight audience-prefixed URLs that will disappear when the old content folders are removed. Each former full URL gets its own redirect object; no old unscoped link is removed.

- [ ] **Step 4: Run the configuration and hub tests.**

Run: `npm run test -- tests/unit/help-center-config.test.ts tests/unit/site.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit the menu and route changes.**

```bash
git add sidebars.ts docusaurus.config.ts src/data/site.ts tests/unit/help-center-config.test.ts tests/unit/site.test.ts
git commit -m "feat: organize ambassador guide navigation"
```

### Task 4: Create the three “Gia nhập hệ sinh thái” topic pages and twelve articles

**Files:**
- Create: `docs/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh/index.mdx`
- Create: `docs/dai-su-xanh/gia-nhap-he-sinh-thai/chia-se-bai-viet-va-noi-dung/index.mdx`
- Create: `docs/dai-su-xanh/gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/index.mdx`
- Create: the twelve article files enumerated below.

- [ ] **Step 1: Create each topic overview with this exact MDX form.**

```mdx
---
title: Chào mừng Đại sứ xanh
description: Chọn nội dung bạn cần trong phần chào mừng Đại sứ xanh.
---

import {AmbassadorTopicCards} from '@site/src/components/AmbassadorContent';

<AmbassadorTopicCards topicId="chao-mung-dai-su-xanh" />
```

Use the equivalent title, description and `topicId` for the two remaining topic overview files.

- [ ] **Step 2: Create the twelve article files with this exact safe form, substituting only title, description, `kind`, path and title from the inventory.**

```mdx
---
title: Khái niệm & giá trị nền tảng
description: Nội dung đang được DAT Universal cập nhật.
keywords: [đại sứ xanh]
---

import {ConfiguredArticleHelp} from '@site/src/components/ArticleHelp';
import {UpdatingArticle} from '@site/src/components/AmbassadorContent';

<UpdatingArticle kind="guide" />

<ConfiguredArticleHelp />
```

Create these files:

```text
chao-mung-dai-su-xanh/khai-niem-va-gia-tri-nen-tang.mdx
chao-mung-dai-su-xanh/gioi-thieu-nen-tang.mdx                 # kind="video"
chao-mung-dai-su-xanh/quyen-loi.mdx
chao-mung-dai-su-xanh/chinh-sach.mdx
chao-mung-dai-su-xanh/huong-dan-nen-tang.mdx                  # kind="video"
chia-se-bai-viet-va-noi-dung/cach-lay-hinh-anh-video.mdx
chia-se-bai-viet-va-noi-dung/cach-chia-se-len-facebook-zalo.mdx
chia-se-bai-viet-va-noi-dung/cach-lay-link-ca-nhan.mdx
tim-kiem-va-theo-doi-khach-hang/tao-khach-hang.mdx
tim-kiem-va-theo-doi-khach-hang/theo-doi-trang-thai.mdx
tim-kiem-va-theo-doi-khach-hang/quan-ly-khach-hang.mdx
tim-kiem-va-theo-doi-khach-hang/meo-tim-khach-hang.mdx
```

- [ ] **Step 3: Run the focused E2E topic-card test and verify it is green.**

Run in PowerShell:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npx playwright test tests/e2e/help-center.spec.ts --project=desktop --grep "Đại sứ xanh uses a two-level"
Remove-Item Env:\PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
```

Expected: PASS; sidebar shows the group and topic but not the individual article title, and five cards appear on the welcome topic page.

- [ ] **Step 4: Commit the first group.**

```bash
git add docs/dai-su-xanh/gia-nhap-he-sinh-thai
git commit -m "docs: add ambassador onboarding guide structure"
```

### Task 5: Create the four “Kiến thức giải pháp” topic pages and eleven articles

**Files:**
- Create: `docs/dai-su-xanh/kien-thuc-giai-phap/tong-quan-giai-phap/index.mdx`
- Create: `docs/dai-su-xanh/kien-thuc-giai-phap/giai-phap-theo-nhu-cau/index.mdx`
- Create: `docs/dai-su-xanh/kien-thuc-giai-phap/tai-lieu-giai-phap/index.mdx`
- Create: `docs/dai-su-xanh/kien-thuc-giai-phap/du-an-thuc-te/index.mdx`
- Create: the eleven article files enumerated below.

- [ ] **Step 1: Create four overview MDX files using `AmbassadorTopicCards`, with their matching `topicId`.**

Use `tong-quan-giai-phap`, `giai-phap-theo-nhu-cau`, `tai-lieu-giai-phap` and `du-an-thuc-te` as the respective `topicId` values.

- [ ] **Step 2: Create article placeholders with `UpdatingArticle` and `ConfiguredArticleHelp`.**

```text
tong-quan-giai-phap/cau-tao-dien-mat-troi.mdx
tong-quan-giai-phap/nguyen-ly-hoat-dong.mdx
tong-quan-giai-phap/loi-ich.mdx
tong-quan-giai-phap/thuat-ngu-co-ban.mdx
giai-phap-theo-nhu-cau/hoa-luoi.mdx
giai-phap-theo-nhu-cau/hybrid.mdx
giai-phap-theo-nhu-cau/luu-tru.mdx
tai-lieu-giai-phap/catalogue.mdx                                  # kind="document"
tai-lieu-giai-phap/brochure.mdx                                   # kind="document"
du-an-thuc-te/cong-trinh-tieu-bieu.mdx
du-an-thuc-te/video-thuc-te.mdx                                   # kind="video"
```

Use the exact `title` values from `src/data/ambassadorContent.ts`; every description remains `Nội dung đang được DAT Universal cập nhật.`

- [ ] **Step 3: Build the site to validate all new MDX imports and routes.**

Run: `npm run build`
Expected: PASS with no broken links or duplicate routes.

- [ ] **Step 4: Commit the solution-knowledge group.**

```bash
git add docs/dai-su-xanh/kien-thuc-giai-phap
git commit -m "docs: add ambassador solution knowledge structure"
```

### Task 6: Create the five “Trung tâm hỗ trợ” topic pages and fourteen articles

**Files:**
- Create: `docs/dai-su-xanh/trung-tam-ho-tro/cau-hoi-thuong-gap/index.mdx`
- Create: `docs/dai-su-xanh/trung-tam-ho-tro/huong-dan-quan-ly-tai-khoan/index.mdx`
- Create: `docs/dai-su-xanh/trung-tam-ho-tro/gui-yeu-cau-ho-tro/index.mdx`
- Create: `docs/dai-su-xanh/trung-tam-ho-tro/lien-he-dat-universal/index.mdx`
- Create: `docs/dai-su-xanh/trung-tam-ho-tro/thong-bao-va-cap-nhat/index.mdx`
- Create: the fourteen article files enumerated below.

- [ ] **Step 1: Create the FAQ index as a safe placeholder, without invented questions or answers.**

```mdx
---
title: Câu hỏi thường gặp
description: DAT Universal đang cập nhật các câu hỏi thường gặp.
---

import {UpdatingArticle} from '@site/src/components/AmbassadorContent';

<UpdatingArticle />
```

Do not create ten FAQ entries until DAT provides the approved questions and answers.

- [ ] **Step 2: Create the remaining four overview MDX files with `AmbassadorTopicCards`.**

Use their matching topic IDs: `huong-dan-quan-ly-tai-khoan`, `gui-yeu-cau-ho-tro`, `lien-he-dat-universal`, and `thong-bao-va-cap-nhat`.

- [ ] **Step 3: Create these fourteen safe article placeholders.**

```text
huong-dan-quan-ly-tai-khoan/thay-doi-thong-tin-tai-khoan.mdx
huong-dan-quan-ly-tai-khoan/cach-rut-hoa-hong.mdx
gui-yeu-cau-ho-tro/bao-loi-he-thong.mdx
gui-yeu-cau-ho-tro/can-ho-tro-khach-hang.mdx
gui-yeu-cau-ho-tro/van-de-tai-khoan.mdx
gui-yeu-cau-ho-tro/van-de-hoa-hong.mdx
lien-he-dat-universal/hotline.mdx
lien-he-dat-universal/mail.mdx
lien-he-dat-universal/zalo.mdx
lien-he-dat-universal/thoi-gian-ho-tro.mdx
lien-he-dat-universal/chuyen-vien-ho-tro.mdx
thong-bao-va-cap-nhat/bao-tri-he-thong.mdx
thong-bao-va-cap-nhat/su-kien.mdx
thong-bao-va-cap-nhat/chuong-trinh-thuong.mdx
```

Do not add phone numbers, email addresses, Zalo links, personnel names, SLA, payout steps or policy claims.

- [ ] **Step 4: Run the focused unit and E2E tests.**

Run: `npm run test -- tests/unit/ambassador-content.test.tsx`
Expected: PASS.

Run in PowerShell:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npx playwright test tests/e2e/help-center.spec.ts --project=desktop --grep "Đại sứ xanh uses a two-level"
Remove-Item Env:\PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
```

Expected: PASS.

- [ ] **Step 5: Commit the support-center group.**

```bash
git add docs/dai-su-xanh/trung-tam-ho-tro
git commit -m "docs: add ambassador support center structure"
```

### Task 7: Create the four “Quy ước hợp tác” topic pages and ten articles

**Files:**
- Create: `docs/dai-su-xanh/quy-uoc-hop-tac/quy-che-dai-su-xanh/index.mdx`
- Create: `docs/dai-su-xanh/quy-uoc-hop-tac/chinh-sach-hoa-hong/index.mdx`
- Create: `docs/dai-su-xanh/quy-uoc-hop-tac/quy-trinh-gioi-thieu-khach-hang/index.mdx`
- Create: `docs/dai-su-xanh/quy-uoc-hop-tac/quy-dinh-xu-ly-vi-pham/index.mdx`
- Create: the ten article files enumerated below.

- [ ] **Step 1: Create three card overview pages and the violation-rule placeholder page.**

The first three indexes use `AmbassadorTopicCards` with their matching topic ID. `quy-dinh-xu-ly-vi-pham/index.mdx` uses only `UpdatingArticle`, because the source did not contain named public sub-articles.

- [ ] **Step 2: Create these ten article placeholders.**

```text
quy-che-dai-su-xanh/dieu-kien-tham-gia.mdx
quy-che-dai-su-xanh/vai-tro-dai-su.mdx
quy-che-dai-su-xanh/quy-tac-hoat-dong.mdx
chinh-sach-hoa-hong/cach-tinh-hoa-hong.mdx
chinh-sach-hoa-hong/dieu-kien-nhan-hoa-hong.mdx
chinh-sach-hoa-hong/thoi-gian-thanh-toan.mdx
chinh-sach-hoa-hong/truong-hop-khong-duoc-tinh-hoa-hong.mdx
chinh-sach-hoa-hong/cach-tinh-thuong.mdx
quy-trinh-gioi-thieu-khach-hang/quy-trinh-tao-khach-hang.mdx
quy-trinh-gioi-thieu-khach-hang/quy-trinh-thanh-toan-hoa-hong.mdx
```

Every file uses the safe placeholder MDX form from Task 4. No commission formulas, payment dates, eligibility rules or violation handling is written until an official DAT source is supplied.

- [ ] **Step 3: Run the full site build.**

Run: `npm run build`
Expected: PASS with no broken links or duplicate routes.

- [ ] **Step 4: Commit the collaboration-rules group.**

```bash
git add docs/dai-su-xanh/quy-uoc-hop-tac
git commit -m "docs: add ambassador cooperation rules structure"
```

### Task 8: Retire old content routes, update authoring guidance and verify the release

**Files:**
- Delete: `docs/dai-su-xanh/bat-dau/`
- Delete: `docs/dai-su-xanh/gioi-thieu-khach-hang/`
- Delete: `docs/dai-su-xanh/referral-hoa-hong/`
- Delete: `docs/dai-su-xanh/chinh-sach-tai-nguyen/`
- Modify: `docs/_templates/huong-dan.mdx`
- Modify: `README.md`
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Confirm all old destinations exist before removing the four old content folders.**

Run: `npm run build`
Expected: PASS while the new topic and article pages are present.

Then remove only the four old MDX/category folders listed above. Do not delete images in `static/img/`; assets are outside this content migration and may still be needed elsewhere.

- [ ] **Step 2: Update the authoring template with the new path and placeholder rule.**

Add this note directly below the internal template comment:

```mdx
{/*
  Với Đại sứ xanh: thêm bài vào đúng thư mục nhóm/chủ đề và thêm metadata
  vào src/data/ambassadorContent.ts để thẻ bài xuất hiện ở trang chủ đề. Khi chưa có source public được duyệt,
  chỉ dùng <UpdatingArticle /> — không tự điền chính sách, hoa hồng, quyền lợi,
  URL, hotline, email, Zalo hoặc thông tin khách hàng.
*/}
```

- [ ] **Step 3: Update `README.md` to document the two-level menu and current domain.**

Replace the old statement that the sidebar’s second level is article names. State that the second level is topic pages and detailed articles are opened as cards. Keep the canonical public URL as `https://hotro.datuniversal.com`, and add a link to this plan under the project documentation index.

- [ ] **Step 4: Run full automated validation.**

Run: `npm run typecheck`
Expected: PASS.

Run: `npm run test`
Expected: PASS.

Run: `npm run build`
Expected: PASS; known Local Search serialization warnings may appear, but no broken-link or MDX error is allowed.

Run in PowerShell:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npx playwright test
Remove-Item Env:\PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
```

Expected: all applicable tests pass; intentional desktop-only assertions may be skipped on mobile.

- [ ] **Step 5: Manually confirm the public reader flow in a local production build.**

1. Open the new Đại sứ xanh start page at desktop width and verify the sidebar has four group headings and only the topic titles underneath.
2. Open **Chào mừng Đại sứ xanh** and confirm there are five cards, each visibly marked **Đang cập nhật**.
3. Open one Video card and one Tài liệu card; confirm they show the update notice and no empty YouTube/embed/download link.
4. Visit every current old URL in the approved spec; confirm it reaches the intended new topic page.
5. At 390px width, confirm the menu opens, card grid is one column, and the page has no horizontal scrollbar.

- [ ] **Step 6: Commit the migration and authoring documentation.**

```bash
git rm -r docs/dai-su-xanh/bat-dau docs/dai-su-xanh/gioi-thieu-khach-hang docs/dai-su-xanh/referral-hoa-hong docs/dai-su-xanh/chinh-sach-tai-nguyen
git add docs/_templates/huong-dan.mdx docs/dai-su-xanh README.md tests/e2e/help-center.spec.ts
git commit -m "docs: publish ambassador guide structure"
```

### Task 9: Request review and publish safely

**Files:**
- Verify: all files changed by Tasks 1–8

- [ ] **Step 1: Inspect the final diff for public-data safety.**

Run: `git diff origin/main...HEAD -- docs/dai-su-xanh src/data/ambassadorContent.ts`
Expected: titles and generic update notices only; no password, OTP, token, API key, customer data, private source link, commission amount, phone number, email or Zalo URL.

- [ ] **Step 2: Check staged and worktree hygiene.**

Run: `git diff --check && git status --short`
Expected: no whitespace errors and no unexpected files.

- [ ] **Step 3: Push the feature branch and open a Pull Request into `main`.**

```bash
git push -u origin feat/dai-su-xanh-content-architecture
```

Use the Pull Request title: `docs: tổ chức lại nội dung Đại sứ xanh`.

Use this Pull Request summary:

```md
## Mục đích thay đổi

Tổ chức lại hướng dẫn Đại sứ xanh theo bốn nhóm lớn và menu hai cấp.

## Kiểm chứng nội dung

- [x] Đã dùng danh mục được DAT cung cấp.
- [x] Bài chưa có source chính thức hiển thị “Đang cập nhật”.
- [x] Không đưa chính sách, hoa hồng, quyền lợi, kênh liên hệ hoặc dữ liệu khách hàng chưa được duyệt lên website public.
- [x] Đã kiểm tra các URL cũ chuyển về cấu trúc mới.

## Kiểm tra website

- [x] Typecheck, unit test, build và E2E đã chạy.
- [x] Đã xem desktop và mobile.
```

- [ ] **Step 4: Wait for GitHub Actions to pass, review “Files changed”, then merge into `main`.**

Expected: the GitHub Pages deployment updates `https://hotro.datuniversal.com` after the merge.
