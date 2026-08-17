# DAT Sidebar and Sample Articles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hiển thị menu Đại sứ xanh ba cấp theo phong cách Antsomi, thay favicon bằng biểu tượng DAT và đưa mẫu trình bày an toàn vào 47 bài chi tiết.

**Architecture:** Dùng sidebar category lồng nhau của Docusaurus thay vì viết menu mới: nhóm lớn luôn mở, chủ đề có bài viết là category đóng mặc định và tự mở khi đường dẫn đang hoạt động. Một `SampleArticle` component dùng lại hiển thị cùng mẫu nội dung trong 47 bài; các trang chủ đề không có bài vẫn dùng `UpdatingArticle` như hiện tại.

**Tech Stack:** Docusaurus 3.10.2, React 19, TypeScript, MDX, CSS, Vitest và Playwright.

---

## File structure

- Modify: `sidebars.ts` — biến 16 chủ đề thành cấp hai, thêm 47 link bài viết ở cấp ba.
- Modify: `docusaurus.config.ts` — trỏ favicon DAT mới.
- Modify: `src/components/AmbassadorContent/index.tsx` — thêm component mẫu cho bài chi tiết, giữ component cập nhật cho trang chủ đề trống.
- Modify: `src/css/custom.css` — style sidebar ba cấp, chevron và các block mẫu.
- Create: `static/img/favicon-dat.svg` — biểu tượng DAT xanh–cam dạng vuông.
- Create: `static/img/sample-guide-illustration.svg` — ảnh minh hoạ trung tính mang màu DAT.
- Modify: 47 file `docs/dai-su-xanh/**/<article>.mdx` có `UpdatingArticle` — gọi `SampleArticle` tương ứng với loại bài.
- Modify: `tests/unit/ambassador-content.test.ts`, `tests/unit/help-center-config.test.ts`, `tests/e2e/help-center.spec.ts` — bảo vệ cấu trúc, favicon, nội dung mẫu và style menu.
- Modify: `docs/_templates/huong-dan.mdx`, `README.md` — mô tả mẫu bài và quy tắc thay thế bằng nội dung chính thức.

### Task 1: Khóa hành vi sidebar ba cấp bằng test RED

**Files:**
- Modify: `tests/unit/ambassador-content.test.ts`
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Viết unit test mô tả ba cấp menu**

  Thay type nông bằng type đệ quy và thêm test sau:

  ```ts
  type AmbassadorSidebarItem = {
    label?: string;
    type?: string;
    id?: string;
    items?: AmbassadorSidebarItem[];
  };

  it('shows article links at level three under their topic only', () => {
    const groups = sidebars.daiSuXanhSidebar as AmbassadorSidebarItem[];
    const topics = groups.flatMap((group) => group.items ?? []);
    const articles = topics.flatMap((topic) => topic.items ?? []);

    expect(groups).toHaveLength(4);
    expect(topics).toHaveLength(16);
    expect(articles).toHaveLength(47);
    expect(articles.every((article) => article.type === 'doc')).toBe(true);
    expect(
      topics.find((topic) => topic.label === 'Chào mừng Đại sứ xanh')?.items,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Khái niệm & giá trị nền tảng',
          id: 'dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh/khai-niem-va-gia-tri-nen-tang',
        }),
      ]),
    );
  });
  ```

- [ ] **Step 2: Viết E2E test cho trạng thái mở đúng chủ đề**

  Thay test có tên `Đại sứ xanh uses a two-level sidebar and topic cards` bằng test sau:

  ```ts
  test('Đại sứ xanh opens only the active topic articles at level three', async ({page, isMobile}) => {
    test.skip(Boolean(isMobile), 'Desktop-only sidebar hierarchy assertion');
    await page.goto(`${sitePath}${ambassadorWelcomeArticle}`);

    const sidebar = page.locator('.theme-doc-sidebar-container');
    await expect(sidebar.getByText('Gia nhập hệ sinh thái', {exact: true})).toBeVisible();
    await expect(sidebar.getByText('Chào mừng Đại sứ xanh', {exact: true})).toBeVisible();
    await expect(sidebar.getByText('Khái niệm & giá trị nền tảng', {exact: true})).toBeVisible();
    await expect(sidebar.getByText('Giới thiệu nền tảng', {exact: true})).toBeVisible();
    await expect(sidebar.getByText('Cách lấy hình ảnh/video', {exact: true})).toHaveCount(0);
  });
  ```

- [ ] **Step 3: Chạy test để chứng kiến RED**

  Run:

  ```powershell
  npm run test -- tests/unit/ambassador-content.test.ts
  npx playwright test tests/e2e/help-center.spec.ts --project=desktop --grep "active topic articles"
  ```

  Expected: unit test báo không có `items` ở cấp chủ đề và E2E báo không thấy bài `Khái niệm & giá trị nền tảng` trong sidebar.

### Task 2: Cấu hình dữ liệu sidebar ba cấp GREEN

**Files:**
- Modify: `sidebars.ts`
- Test: `tests/unit/ambassador-content.test.ts`
- Test: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Thay mapping sidebar bằng category lồng nhau**

  Dùng helper này trong `sidebars.ts` để các chủ đề có bài viết thành category cấp hai; hai chủ đề không có bài tiếp tục là link cấp hai.

  ```ts
  const topicDocId = (groupId: string, topicId: string) =>
    `dai-su-xanh/${groupId}/${topicId}/index`;

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
    items: group.topics.map((topic) => {
      const id = topicDocId(topic.groupId, topic.id);
      if (topic.articles.length === 0) {
        return {type: 'doc' as const, id, label: topic.title};
      }
      return {
        type: 'category' as const,
        label: topic.title,
        collapsible: true,
        collapsed: true,
        link: {type: 'doc' as const, id},
        items: topic.articles.map((article) => ({
          type: 'doc' as const,
          id: `dai-su-xanh/${topic.groupId}/${topic.id}/${article.id}`,
          label: article.title,
        })),
      };
    }),
  }));
  ```

- [ ] **Step 2: Chạy test GREEN của task**

  Run:

  ```powershell
  npm run test -- tests/unit/ambassador-content.test.ts
  npx playwright test tests/e2e/help-center.spec.ts --project=desktop --grep "active topic articles"
  ```

  Expected: cả hai lệnh pass; khi vào bài trực tiếp, Docusaurus tự mở category cha đang active.

- [ ] **Step 3: Commit cấu trúc sidebar**

  ```powershell
  git add sidebars.ts tests/unit/ambassador-content.test.ts tests/e2e/help-center.spec.ts
  git commit -m "feat: show ambassador articles in sidebar"
  ```

### Task 3: Thay favicon bằng biểu tượng DAT

**Files:**
- Create: `static/img/favicon-dat.svg`
- Modify: `docusaurus.config.ts`
- Modify: `tests/unit/help-center-config.test.ts`

- [ ] **Step 1: Viết test RED cho favicon mới**

  Thêm test này vào `tests/unit/help-center-config.test.ts`:

  ```ts
  it('uses the square DAT favicon', () => {
    expect(config.favicon).toBe('img/favicon-dat.svg');
  });
  ```

- [ ] **Step 2: Chạy test RED**

  Run:

  ```powershell
  npm run test -- tests/unit/help-center-config.test.ts
  ```

  Expected: FAIL vì config vẫn trỏ tới `img/favicon.ico`.

- [ ] **Step 3: Tạo asset favicon và cập nhật config**

  Tạo `static/img/favicon-dat.svg` với mã sau. Asset dùng biểu tượng D màu DAT và điểm tròn cam, được tách từ cách nhận diện của `static/img/logo_DAT_Group.svg` để giữ nhận diện ở kích thước 16–32 px.

  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="12" fill="#fff"/>
    <path d="M9 10h20.5C44.7 10 55 20.4 55 32S44.7 54 29.5 54H9V10Zm18.9 10H19v24h8.9C36.2 44 41 39.2 41 32s-4.8-12-13.1-12Z" fill="#0082ca"/>
    <circle cx="29" cy="32" r="5.5" fill="#ff8300"/>
  </svg>
  ```

  Cập nhật cấu hình:

  ```ts
  favicon: 'img/favicon-dat.svg',
  ```

- [ ] **Step 4: Chạy test GREEN và commit**

  Run:

  ```powershell
  npm run test -- tests/unit/help-center-config.test.ts
  git add static/img/favicon-dat.svg docusaurus.config.ts tests/unit/help-center-config.test.ts
  git commit -m "feat: use DAT favicon"
  ```

  Expected: unit test pass; browser có thể tải `img/favicon-dat.svg` sau build.

### Task 4: Tạo sample component và asset minh hoạ với TDD

**Files:**
- Create: `static/img/sample-guide-illustration.svg`
- Modify: `src/components/AmbassadorContent/index.tsx`
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Viết E2E test RED cho mẫu bài chi tiết**

  Thêm test sau vào `tests/e2e/help-center.spec.ts`:

  ```ts
  test('Ambassador detail articles show the approved safe content sample', async ({page}) => {
    await page.goto(`${sitePath}${ambassadorWelcomeArticle}`);

    const article = page.locator('.theme-doc-markdown');
    await expect(article.getByText('Nội dung minh hoạ', {exact: false})).toBeVisible();
    await expect(article.getByRole('heading', {name: 'Các bước minh hoạ'})).toBeVisible();
    await expect(article.locator('blockquote')).toContainText('nội dung chính thức');
    await expect(article.locator('img[src$="sample-guide-illustration.svg"]')).toBeVisible();
    await expect(article.locator('.ambassador-sample-video')).toContainText('Video mẫu');
    await expect(article.locator('table')).toBeVisible();
  });
  ```

- [ ] **Step 2: Chạy E2E RED**

  Run:

  ```powershell
  npx playwright test tests/e2e/help-center.spec.ts --project=desktop --grep "safe content sample"
  ```

  Expected: FAIL vì trang mới chỉ có `Nội dung đang cập nhật` và không có image, quote, table hay video mẫu.

- [ ] **Step 3: Thêm `SampleArticle` vào component**

  Trong `src/components/AmbassadorContent/index.tsx`, thêm import và `SampleArticle` bên cạnh `UpdatingArticle`:

  ```tsx
  import useBaseUrl from '@docusaurus/useBaseUrl';
  ```

  Component nhận `kind: AmbassadorArticleKind`, dùng `useBaseUrl('img/sample-guide-illustration.svg')`, và render theo cấu trúc này:

  ```tsx
  export function SampleArticle({kind}: {kind: AmbassadorArticleKind}) {
    const videoDescription =
      kind === 'video'
        ? 'Đây là vị trí dành cho video của bài viết này.'
        : 'Đây là ví dụ về vị trí nhúng video trong một bài hướng dẫn.';

    return (
      <section className="ambassador-sample-article">
        <p className="ambassador-sample-article__notice">
          <strong>Nội dung minh hoạ</strong> — thay bằng nội dung chính thức khi được duyệt.
        </p>
        <p>
          Đây là đoạn <strong>chữ đậm</strong> và <em>chữ nghiêng</em> để minh hoạ cách trình bày.
        </p>
        <h2>Các bước minh hoạ</h2>
        <ol><li>Chuẩn bị thông tin cần thiết.</li><li>Thực hiện thao tác theo hướng dẫn.</li><li>Kiểm tra kết quả hiển thị.</li></ol>
        <h3>Lưu ý khi thực hiện</h3>
        <ul><li>Chỉ dùng thông tin đã được duyệt để xuất bản.</li><li>Không đưa dữ liệu khách hàng vào bài public.</li></ul>
        <img src={useBaseUrl('img/sample-guide-illustration.svg')} alt="Hình minh hoạ bố cục một bài hướng dẫn DAT" />
        <blockquote>Thay phần minh hoạ này bằng nội dung chính thức sau khi content owner xác nhận.</blockquote>
        <table><thead><tr><th>Hạng mục</th><th>Ví dụ trình bày</th></tr></thead><tbody><tr><td>Trạng thái</td><td>Nội dung mẫu</td></tr><tr><td>Nguồn</td><td>Chờ phê duyệt</td></tr></tbody></table>
        <figure className="ambassador-sample-video" aria-label="Khung Video mẫu">
          <div className="ambassador-sample-video__screen" aria-hidden="true">▶</div>
          <figcaption><strong>Video mẫu</strong><br />{videoDescription}</figcaption>
        </figure>
      </section>
    );
  }
  ```

  Tạo `static/img/sample-guide-illustration.svg` với mã sau; asset không có người, số liệu hoặc tên khách hàng:

  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 420" role="img" aria-labelledby="title description">
    <title id="title">Hình minh hoạ nội dung mẫu DAT</title>
    <desc id="description">Hai thẻ tài liệu màu xanh DAT với điểm nhấn cam.</desc>
    <rect width="960" height="420" rx="32" fill="#eaf8ff"/>
    <rect x="130" y="92" width="310" height="220" rx="20" fill="#fff" stroke="#9dcee8" stroke-width="4"/>
    <rect x="510" y="92" width="310" height="220" rx="20" fill="#004f7a"/>
    <circle cx="194" cy="156" r="22" fill="#ff8400"/>
    <rect x="238" y="136" width="140" height="18" rx="9" fill="#006da8"/>
    <rect x="170" y="204" width="210" height="14" rx="7" fill="#d5e6ef"/>
    <rect x="170" y="238" width="166" height="14" rx="7" fill="#d5e6ef"/>
    <path d="M592 144h146v18H592zM592 190h108v14H592zM592 222h166v14H592z" fill="#eaf8ff"/>
    <circle cx="756" cy="150" r="20" fill="#ff8400"/>
    <text x="480" y="370" text-anchor="middle" fill="#004f7a" font-family="Arial, sans-serif" font-size="28" font-weight="700">HÌNH MINH HOẠ NỘI DUNG MẪU</text>
  </svg>
  ```

- [ ] **Step 4: Chạy E2E GREEN**

  Run:

  ```powershell
  npx playwright test tests/e2e/help-center.spec.ts --project=desktop --grep "safe content sample"
  ```

  Expected: PASS; không xuất hiện `iframe` hoặc `video` bên ngoài trong component.

### Task 5: Áp dụng mẫu vào 47 bài chi tiết

**Files:**
- Modify: 47 file được liệt kê bởi `rg -l "<UpdatingArticle kind=" docs/dai-su-xanh`
- Modify: `docs/_templates/huong-dan.mdx`
- Modify: `README.md`
- Test: `tests/unit/ambassador-content.test.ts`
- Test: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Viết test RED rằng mọi bài có component mẫu**

  Thêm import và test này vào `tests/unit/ambassador-content.test.ts`:

  ```ts
  import {readFile} from 'node:fs/promises';
  import {resolve} from 'node:path';

  it('uses the shared presentation sample in every detailed article', async () => {
    const files = ambassadorGuideGroups.flatMap((group) =>
      group.topics.flatMap((topic) =>
        topic.articles.map((article) =>
          resolve(
            'docs',
            'dai-su-xanh',
            group.id,
            topic.id,
            `${article.id}.mdx`,
          ),
        ),
      ),
    );
    const sourceFiles = await Promise.all(
      files.map((file) => readFile(file, 'utf8')),
    );
    expect(files).toHaveLength(47);
    expect(
      sourceFiles.every((source) =>
        source.includes('<SampleArticle kind='),
      ),
    ).toBe(true);
  });
  ```

- [ ] **Step 2: Chạy unit test RED**

  Run:

  ```powershell
  npm run test -- tests/unit/ambassador-content.test.ts
  ```

  Expected: FAIL vì 47 MDX vẫn import và gọi `UpdatingArticle`.

- [ ] **Step 3: Cập nhật từng MDX chi tiết**

  Với từng file từ lệnh sau, thay import và JSX theo đúng `kind` đã khai báo trong `src/data/ambassadorContent.ts`:

  ```powershell
  rg -l '<UpdatingArticle kind=' docs/dai-su-xanh
  ```

  Ví dụ file `docs/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh/khai-niem-va-gia-tri-nen-tang.mdx` phải thành:

  ```mdx
  import {ConfiguredArticleHelp} from '@site/src/components/ArticleHelp';
  import {SampleArticle} from '@site/src/components/AmbassadorContent';

  <SampleArticle kind="guide" />

  <ConfiguredArticleHelp />
  ```

  Danh sách `kind` phải chính xác theo `src/data/ambassadorContent.ts`: `giới thiệu nền tảng`, `hướng dẫn nền tảng` và `video thực tế` dùng `kind="video"`; `catalogue` và `brochure` dùng `kind="document"`; 42 bài còn lại dùng `kind="guide"`. Không sửa hai topic index trống `cau-hoi-thuong-gap/index.mdx` và `quy-dinh-xu-ly-vi-pham/index.mdx`; chúng tiếp tục dùng `UpdatingArticle`.

- [ ] **Step 4: Cập nhật hướng dẫn biên tập**

  Trong `docs/_templates/huong-dan.mdx`, bổ sung comment: khi bài đang dùng `SampleArticle`, thay sample bằng nội dung được duyệt và không giữ nhãn “Nội dung minh hoạ” khi bài đã chính thức. Trong `README.md`, cập nhật quy trình để nêu 47 bài hiện là layout mẫu, không phải hướng dẫn nghiệp vụ đã duyệt.

- [ ] **Step 5: Chạy test GREEN và commit**

  Run:

  ```powershell
  npm run test -- tests/unit/ambassador-content.test.ts
  npx playwright test tests/e2e/help-center.spec.ts --project=desktop --grep "safe content sample"
  git add docs/dai-su-xanh src/components/AmbassadorContent static/img/sample-guide-illustration.svg docs/_templates/huong-dan.mdx README.md tests/unit/ambassador-content.test.ts tests/e2e/help-center.spec.ts
  git commit -m "docs: add Ambassador article presentation samples"
  ```

  Expected: unit test và E2E pass, 47 bài dùng sample, hai topic index trống vẫn báo đang cập nhật.

### Task 6: Style menu Antsomi và các block mẫu với TDD

**Files:**
- Modify: `src/css/custom.css`
- Modify: `tests/e2e/help-center.spec.ts`

- [ ] **Step 1: Viết E2E RED cho chevron và style cấp menu**

  Thêm test desktop sau:

  ```ts
  test('Ambassador sidebar uses compact Antsomi-style hierarchy controls', async ({page, isMobile}) => {
    test.skip(Boolean(isMobile), 'Desktop-only sidebar style assertion');
    await page.goto(`${sitePath}${ambassadorWelcomeArticle}`);

    const sidebar = page.locator('.theme-doc-sidebar-container');
    const group = sidebar.getByText('Gia nhập hệ sinh thái', {exact: true});
    const topicToggle = sidebar.getByRole('button', {name: /Chào mừng Đại sứ xanh/});
    const article = sidebar.getByText('Khái niệm & giá trị nền tảng', {exact: true});

    await expect(group).toHaveCSS('font-weight', '700');
    await expect(topicToggle).toHaveAttribute('aria-expanded', 'true');
    expect(
      await topicToggle.evaluate((button) =>
        getComputedStyle(button, '::before').backgroundSize,
      ),
    ).toBe('12px 12px');
    await expect(article).toHaveCSS('font-size', '14px');
  });
  ```

- [ ] **Step 2: Chạy E2E RED**

  Run:

  ```powershell
  npx playwright test tests/e2e/help-center.spec.ts --project=desktop --grep "compact Antsomi-style"
  ```

  Expected: FAIL vì group chưa có weight 700 theo selector mới và caret mặc định dùng biểu tượng 20 px.

- [ ] **Step 3: Thêm CSS sidebar và content sample**

  Thêm vào `src/css/custom.css` các selector có phạm vi `.theme-doc-sidebar-menu` để:

  ```css
  .theme-doc-sidebar-menu > .menu__list > .menu__list-item > .menu__list-item-collapsible > .menu__link {
    padding: 0.75rem 0;
    color: #20242b;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .theme-doc-sidebar-menu .theme-doc-sidebar-item-category-level-1 > .menu__list-item-collapsible > .menu__link {
    color: #6b7280;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: normal;
    text-transform: none;
  }

  .theme-doc-sidebar-menu .theme-doc-sidebar-item-category-level-1 > .menu__list {
    margin: 0.25rem 0 0.75rem 0.7rem;
    padding-left: 0.85rem;
    border-left: 1px solid var(--dat-border);
  }

  .theme-doc-sidebar-menu .theme-doc-sidebar-item-category-level-1 .menu__list .menu__link {
    padding: 0.45rem 0.6rem;
    color: #6b7280;
    font-size: 0.875rem;
  }

  .theme-doc-sidebar-menu .menu__caret {
    width: 2rem;
    height: 2rem;
    padding: 0;
  }

  .theme-doc-sidebar-menu .menu__caret::before {
    width: 0.75rem;
    height: 0.75rem;
    background-size: 0.75rem 0.75rem;
  }
  ```

  Thêm chính xác các rule sau sau đoạn sidebar hiện có:

  ```css
  @media (hover: hover) and (min-width: 997px) {
    .theme-doc-sidebar-menu > .menu__list > .menu__list-item > .menu__list-item-collapsible > .menu__caret {
      opacity: 0;
    }

    .theme-doc-sidebar-menu > .menu__list > .menu__list-item:hover > .menu__list-item-collapsible > .menu__caret,
    .theme-doc-sidebar-menu > .menu__list > .menu__list-item:focus-within > .menu__list-item-collapsible > .menu__caret {
      opacity: 1;
    }
  }

  .ambassador-sample-article__notice {
    margin: 1.5rem 0;
    padding: 1rem 1.125rem;
    border-left: 4px solid var(--dat-orange);
    border-radius: 0.5rem;
    background: var(--dat-sky-50);
  }

  .ambassador-sample-article blockquote {
    margin: 2rem 0;
    padding: 1rem 1.25rem;
    border-left: 3px solid var(--dat-blue);
    color: var(--dat-muted);
    background: #f8fbfd;
  }

  .ambassador-sample-article table {
    width: 100%;
    margin: 2rem 0;
  }

  .ambassador-sample-video {
    overflow: hidden;
    margin: 2rem 0;
    border: 1px solid var(--dat-border);
    border-radius: 0.75rem;
  }

  .ambassador-sample-video__screen {
    display: grid;
    min-height: 15rem;
    place-items: center;
    color: var(--dat-orange);
    background: var(--dat-blue-deep);
    font-size: 2rem;
  }

  .ambassador-sample-video figcaption {
    padding: 1rem 1.25rem;
    background: #fff;
  }
  ```

  Trong media query hiện có `@media (max-width: 780px)`, thêm `.theme-doc-sidebar-menu .menu__caret { opacity: 1; }` để thiết bị cảm ứng luôn có nút mở/đóng.

- [ ] **Step 4: Chạy E2E GREEN desktop và mobile**

  Run:

  ```powershell
  npx playwright test tests/e2e/help-center.spec.ts --project=desktop --grep "compact Antsomi-style"
  npx playwright test tests/e2e/help-center.spec.ts --project=mobile --grep "mobile has no horizontal overflow"
  ```

  Expected: desktop pass với chevron 12 px; mobile pass không tràn ngang.

- [ ] **Step 5: Commit style**

  ```powershell
  git add src/css/custom.css tests/e2e/help-center.spec.ts
  git commit -m "style: refine Ambassador sidebar hierarchy"
  ```

### Task 7: Kiểm tra toàn diện và bàn giao

**Files:**
- Verify: toàn bộ worktree

- [ ] **Step 1: Kiểm tra style và trạng thái Git**

  Run:

  ```powershell
  git diff --check
  git status --short
  ```

  Expected: không có whitespace error; chỉ có file đúng phạm vi trước khi commit cuối cùng, sau đó worktree sạch.

- [ ] **Step 2: Chạy toàn bộ kiểm tra tự động**

  Run:

  ```powershell
  npm run typecheck
  npm run test
  npm run build
  npm run test:e2e
  ```

  Expected: typecheck, unit test, production build và toàn bộ E2E pass. Ghi nhận riêng warning Local Search/Docusaurus nếu vẫn là warning đã tồn tại, không phải lỗi.

- [ ] **Step 3: Kiểm tra trực quan**

  Mở một bài chi tiết desktop và mobile 390 px. Xác nhận: favicon DAT tải được; bốn nhóm và 16 chủ đề hiện; chỉ chủ đề đang active bung bài cấp ba; caret nhỏ; focus keyboard nhìn rõ; ảnh, quote, table và video mẫu hiển thị; không có dữ liệu nghiệp vụ thật hoặc iframe ngoài.
