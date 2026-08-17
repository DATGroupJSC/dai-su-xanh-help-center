import {expect, test} from '@playwright/test';

const sitePath = '';
const ambassadorStart =
  '/huong-dan/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh';
const ambassadorWelcomeArticle =
  '/huong-dan/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh/khai-niem-va-gia-tri-nen-tang';

test('DAT corporate footer exposes public contact information and the supplied favicon', async ({
  page,
  isMobile,
}) => {
  await page.goto(`${sitePath}/`);

  const footer = page.locator('footer.dat-corporate-footer');
  await expect(footer).toBeVisible();
  await expect(
    footer.getByText('Công ty Cổ phần Tập đoàn DAT (DAT Group)'),
  ).toBeVisible();
  await expect(footer.getByText('Trụ sở chính - TP.HCM')).toBeVisible();
  await expect(footer.getByText('Chi nhánh Hà Nội')).toBeVisible();
  await expect(footer.getByText('Chi nhánh Cần Thơ')).toBeVisible();
  await expect(footer).toContainText(
    '© DAT Group | Established 2006 | All Rights Reserved.',
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    'href',
    /favicon\.DujayeFC\.png/,
  );

  if (isMobile) {
    expect(
      await page.locator('html').evaluate((node) => node.scrollWidth === node.clientWidth),
    ).toBe(true);
  }
});

test('homepage routes users to the three DAT Universal audiences', async ({
  page,
}) => {
  await page.goto(`${sitePath}/`);

  await expect(
    page.getByRole('heading', {name: 'Trung tâm hỗ trợ DAT Universal'}),
  ).toBeVisible();

  const main = page.locator('main');
  for (const label of ['Đại sứ xanh', 'Nhà lắp đặt', 'Khách hàng cuối']) {
    await expect(
      main.getByRole('link', {name: new RegExp(label)}),
    ).toHaveCount(1);
  }

  await expect(main.getByText('Đang bổ sung')).toHaveCount(2);
  await expect(
    main.getByRole('link', {name: 'Đăng ký Đại sứ xanh'}),
  ).toHaveCount(0);
});

test('each audience has a safe public starting page', async ({page}) => {
  for (const [path, heading] of [
    [
      ambassadorStart,
      'Chào mừng Đại sứ xanh',
    ],
    [
      '/huong-dan/nha-lap-dat/bat-dau-hop-tac',
      'Hướng dẫn dành cho Nhà lắp đặt',
    ],
    [
      '/huong-dan/khach-hang/tim-hieu-giai-phap',
      'Hướng dẫn dành cho Khách hàng cuối',
    ],
  ]) {
    await page.goto(`${sitePath}${path}`);
    await expect(page.getByRole('heading', {name: heading})).toBeVisible();
  }
});

test('former Đại sứ xanh article URL redirects to its replacement article', async ({
  page,
}) => {
  await page.goto(
    `${sitePath}/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`,
  );

  await expect(page).toHaveURL(
    new RegExp(`${sitePath}${ambassadorWelcomeArticle}`),
  );
  await expect(
    page.getByRole('heading', {name: 'Khái niệm & giá trị nền tảng'}),
  ).toBeVisible();
});

test('video sample uses a safe panel without an external embed', async ({
  page,
}) => {
  await page.goto(
    `${sitePath}${ambassadorStart}/gioi-thieu-nen-tang`,
  );

  const sample = page.locator('.ambassador-sample-article');
  await expect(sample.locator('.ambassador-sample-video')).toContainText(
    'Video mẫu',
  );
  await expect(sample.locator('iframe, video')).toHaveCount(0);
});

test('Ambassador detail articles show the approved safe content sample', async ({
  page,
}) => {
  await page.goto(`${sitePath}${ambassadorWelcomeArticle}`);

  const article = page.locator('.theme-doc-markdown');
  await expect(
    article.getByText('Nội dung minh hoạ', {exact: false}),
  ).toBeVisible();
  await expect(
    article.getByRole('heading', {name: 'Các bước minh hoạ'}),
  ).toBeVisible();
  await expect(article.locator('blockquote')).toContainText(
    'nội dung chính thức',
  );
  await expect(
    article.locator('img[src$="sample-guide-illustration.svg"]'),
  ).toBeVisible();
  await expect(article.locator('.ambassador-sample-video')).toContainText(
    'Video mẫu',
  );
  await expect(article.locator('table')).toBeVisible();
});

test('Ambassador article cards keep a visible keyboard focus outline', async ({
  page,
}) => {
  await page.goto(`${sitePath}${ambassadorStart}`);

  const card = page.locator('.ambassador-topic-card').filter({
    hasText: 'Khái niệm & giá trị nền tảng',
  });
  await card.focus();
  await expect(card).toHaveCSS('outline-color', 'rgb(0, 79, 122)');
});

test('Đại sứ xanh opens only the active topic articles at level three', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only sidebar hierarchy assertion');
  await page.goto(`${sitePath}${ambassadorWelcomeArticle}`);

  const sidebar = page.locator('.theme-doc-sidebar-container');
  await expect(
    sidebar.getByText('Gia nhập hệ sinh thái', {exact: true}),
  ).toBeVisible();
  await expect(
    sidebar.getByText('Chào mừng Đại sứ xanh', {exact: true}),
  ).toBeVisible();
  await expect(
    sidebar.getByText('Khái niệm & giá trị nền tảng', {exact: true}),
  ).toBeVisible();
  await expect(
    sidebar.getByText('Giới thiệu nền tảng', {exact: true}),
  ).toBeVisible();
  await expect(
    sidebar.getByText('Cách lấy hình ảnh/video', {exact: true}),
  ).toHaveCount(0);
});

test('Ambassador sidebar uses compact Antsomi-style hierarchy controls', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only sidebar appearance assertion');
  await page.goto(`${sitePath}${ambassadorWelcomeArticle}`);

  const sidebar = page.locator('.theme-doc-sidebar-container');
  const group = sidebar.getByText('Gia nhập hệ sinh thái', {exact: true});
  const topic = sidebar.getByText('Chào mừng Đại sứ xanh', {exact: true});
  const topicCaret = topic.locator('../..').locator('.menu__caret');
  const groupCaret = group.locator('../..').locator('.menu__caret');
  const article = sidebar.getByText('Khái niệm & giá trị nền tảng', {
    exact: true,
  });

  await expect(group).toHaveCSS('font-weight', '700');
  await expect(topicCaret).toHaveAttribute('aria-expanded', 'true');
  expect(
    await topicCaret.evaluate(
      (caret) => getComputedStyle(caret, '::before').backgroundSize,
    ),
  ).toBe('12px 12px');
  await expect(article).toHaveCSS('font-size', '14px');
  await expect(groupCaret).toHaveCSS('opacity', '0');
  await group.hover();
  await expect(groupCaret).toHaveCSS('opacity', '1');
});

test('Ambassador sidebar keeps level-three articles open for one topic at a time', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only topic expansion assertion');
  await page.goto(`${sitePath}${ambassadorWelcomeArticle}`);

  const sidebar = page.locator('.theme-doc-sidebar-container');
  const welcomeCaret = sidebar.getByRole('button', {
    name: /Chào mừng Đại sứ xanh/,
  });
  const sharingCaret = sidebar.getByRole('button', {
    name: /Chia sẻ bài viết & nội dung/,
  });
  const welcomeArticle = sidebar.getByText('Khái niệm & giá trị nền tảng', {
    exact: true,
  });
  const sharingArticle = sidebar.getByText('Cách lấy hình ảnh/video', {
    exact: true,
  });

  await expect(welcomeCaret).toHaveAttribute('aria-expanded', 'true');
  await expect(welcomeArticle).toBeVisible();
  await expect(sharingArticle).toBeHidden();

  await sharingCaret.click();

  await expect(sharingCaret).toHaveAttribute('aria-expanded', 'true');
  await expect(welcomeCaret).toHaveAttribute('aria-expanded', 'false');
  await expect(welcomeArticle).toBeHidden();
  await expect(sharingArticle).toBeVisible();
});

test('sidebar is scoped to the selected audience and shows two levels', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only sidebar hierarchy assertion');
  await page.goto(`${sitePath}${ambassadorStart}`);

  const sidebar = page.locator('.theme-doc-sidebar-container');
  await expect(
    sidebar.getByText('Gia nhập hệ sinh thái', {exact: true}),
  ).toBeVisible();
  await expect(
    sidebar.getByText('Chào mừng Đại sứ xanh', {exact: true}),
  ).toBeVisible();
  await expect(sidebar.getByText('Nhà lắp đặt', {exact: true})).toHaveCount(0);
  await expect(sidebar.getByText('Khách hàng cuối', {exact: true})).toHaveCount(
    0,
  );
});

test('guide shows left sidebar and right table of contents', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only three-column assertion');
  await page.goto(`${sitePath}${ambassadorStart}`);

  await expect(
    page.getByRole('heading', {name: 'Chào mừng Đại sứ xanh'}),
  ).toBeVisible();
  await expect(page.locator('.theme-doc-sidebar-container')).toBeVisible();
  await expect(page.locator('.table-of-contents')).toBeVisible();
});

test('desktop docs use a centered Antsomi shell without navbar identity', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only Antsomi shell assertion');
  await page.setViewportSize({width: 1920, height: 1080});
  await page.goto(`${sitePath}${ambassadorStart}`);

  const shell = page.locator('.dat-doc-shell');
  await expect(shell).toBeVisible();
  const identity = page.locator('.doc-site-identity');
  await expect(identity).toBeVisible();
  await expect(identity).toHaveText(
    'TRUNG TÂM HỖ TRỢ DAT UNIVERSAL',
  );
  await expect(
    page.locator('.navbar__inner > .navbar__items .navbar__title'),
  ).toHaveCount(0);

  const sidebar = page.locator('.theme-doc-sidebar-container');
  const article = page.locator('.theme-doc-markdown');
  const toc = page.locator('.table-of-contents');
  await Promise.all([
    expect(sidebar).toBeVisible(),
    expect(article).toBeVisible(),
    expect(toc).toBeVisible(),
  ]);

  const [shellBox, sidebarBox, articleBox, tocBox] = await Promise.all([
    shell.boundingBox(),
    sidebar.boundingBox(),
    article.boundingBox(),
    toc.boundingBox(),
  ]);
  if (!shellBox || !sidebarBox || !articleBox || !tocBox) {
    throw new Error('Expected visible documentation columns to have layout boxes');
  }

  expect(shellBox.x).toBeGreaterThanOrEqual(80);
  expect(shellBox.x).toBeLessThanOrEqual(110);
  expect(Math.abs(sidebarBox.x - shellBox.x)).toBeLessThanOrEqual(1);
  expect(articleBox.x).toBeGreaterThanOrEqual(490);
  expect(articleBox.x).toBeLessThanOrEqual(550);
  expect(tocBox.x).toBeGreaterThanOrEqual(1500);
  expect(tocBox.x + tocBox.width).toBeLessThanOrEqual(1840);
});

test('compact desktop keeps guide readable before wide layout', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only compact layout assertion');
  await page.setViewportSize({width: 1024, height: 900});
  await page.goto(`${sitePath}${ambassadorStart}`);

  const article = page.locator('.theme-doc-markdown');
  await expect(article).toBeVisible();
  const articleBox = await article.boundingBox();
  if (!articleBox) {
    throw new Error('Expected the guide article to have a layout box');
  }

  expect(articleBox.width).toBeGreaterThanOrEqual(360);
  expect(
    await page.locator('.dat-doc-shell').evaluate(
      (shell) => shell.scrollWidth <= shell.clientWidth,
    ),
  ).toBe(true);
});

test('wide desktop keeps an Ambassador guide readable with its table of contents', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only wide reading-width assertion');
  await page.setViewportSize({width: 1280, height: 900});
  await page.goto(`${sitePath}${ambassadorStart}`);

  const article = page.locator('.theme-doc-markdown');
  await expect(article).toBeVisible();
  const articleBox = await article.boundingBox();
  if (!articleBox) {
    throw new Error('Expected the Ambassador guide to have a layout box');
  }

  expect(articleBox.width).toBeGreaterThanOrEqual(520);
});

test('wide desktop lets a guide without a table of contents use its available reading width', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only no-table-of-contents assertion');
  await page.setViewportSize({width: 1280, height: 900});
  await page.goto(`${sitePath}/huong-dan/nha-lap-dat/bat-dau-hop-tac`);

  await expect(page.locator('.table-of-contents')).toHaveCount(0);
  const article = page.locator('.theme-doc-markdown');
  await expect(article).toBeVisible();
  const articleBox = await article.boundingBox();
  if (!articleBox) {
    throw new Error('Expected the Installer guide to have a layout box');
  }

  expect(articleBox.width).toBeGreaterThanOrEqual(850);
});

test('404 returns users to the Help Center', async ({page}) => {
  await page.goto(`${sitePath}/khong-ton-tai`);

  await expect(
    page.getByRole('heading', {name: 'Không tìm thấy trang này'}),
  ).toBeVisible();
  await expect(page.getByRole('link', {name: 'Về trang chủ'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Xem mục Hỗ trợ'})).toBeVisible();
});

test('mobile has no horizontal overflow and exposes the menu toggle', async ({
  page,
}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto(`${sitePath}/huong-dan/bat-dau/dai-su-xanh-la-gi`);

  expect(
    await page.locator('body').evaluate(
      (body) => body.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator('.navbar__toggle')).toBeVisible();
});

test('site is locked to light mode', async ({page}) => {
  await page.emulateMedia({colorScheme: 'dark'});
  await page.goto(`${sitePath}/`);

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(
    page.getByRole('button', {name: /Chuyển đổi chế độ sáng và tối/}),
  ).toHaveCount(0);
});

test('documentation uses the approved spacious three-column DAT layout', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only documentation layout assertion');
  await page.goto(`${sitePath}${ambassadorStart}`);

  await expect(page.locator('.navbar')).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  );
  await expect(page.locator('.navbar')).toHaveCSS('min-height', '120px');
  await expect(page.locator('.theme-doc-sidebar-container')).toBeVisible();
  await expect(page.locator('.table-of-contents')).toBeVisible();
  await expect(page.locator('.theme-doc-markdown')).toHaveCSS(
    'font-size',
    '18px',
  );
  await expect(page.locator('.theme-doc-markdown')).toHaveCSS(
    'line-height',
    '31.5px',
  );
  await expect(
    page
      .locator(
        '.theme-doc-sidebar-menu .menu__link--active.menu__link--sublist',
      )
      .first(),
  ).toHaveCSS('color', 'rgb(0, 109, 168)');

  await page.goto(`${sitePath}${ambassadorWelcomeArticle}`);
  const activeDoc = page
    .locator(
      '.theme-doc-sidebar-menu .menu__link--active:not(.menu__link--sublist)',
    )
    .first();
  await expect(activeDoc).toHaveCSS('color', 'rgb(0, 79, 122)');
  await expect(activeDoc).toHaveCSS(
    'background-color',
    'rgb(234, 248, 255)',
  );

  await page.goto(`${sitePath}/`);
  const footerLink = page.locator('.footer a').first();
  await footerLink.focus();
  await expect(footerLink).toHaveCSS('outline-color', 'rgb(234, 248, 255)');

  await page.goto(`${sitePath}/khong-ton-tai`);
  await expect(page.locator('.not-found-page__code')).toHaveCSS(
    'color',
    'rgb(255, 132, 0)',
  );
  await expect(page.locator('.not-found-page__code')).toHaveCSS(
    'background-color',
    'rgb(23, 33, 43)',
  );
  await expect(
    page.locator('.not-found-page__actions .button--primary'),
  ).toHaveCSS('color', 'rgb(23, 33, 43)');
});

test('mobile navbar sidebar keeps its controls readable without duplicating site identity', async ({
  page,
}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto(`${sitePath}${ambassadorStart}`);
  await page.locator('.navbar__toggle').click();

  const sidebar = page.locator('.navbar-sidebar');
  await expect(sidebar).toBeVisible();
  await expect(sidebar.locator('.navbar__title')).toHaveCount(0);
  await expect(sidebar.locator('.navbar-sidebar__close')).toHaveCSS(
    'color',
    'rgb(0, 79, 122)',
  );
  await expect(sidebar.locator('.navbar-sidebar__close svg g')).toHaveCSS(
    'stroke',
    'rgb(0, 79, 122)',
  );
});

test('desktop navbar search has readable DAT colors and focus', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Navbar search is hidden on mobile');
  await page.goto(`${sitePath}/`);

  const searchButton = page.locator('.navbar .aa-DetachedSearchButton');
  await expect(searchButton).toBeVisible();
  await expect(searchButton).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  );
  await expect(
    searchButton.locator('.aa-DetachedSearchButtonPlaceholder'),
  ).toHaveCSS('color', 'rgb(91, 109, 120)');

  await searchButton.focus();
  await expect(searchButton).toHaveCSS('outline-color', 'rgb(0, 79, 122)');
  await expect(searchButton).toHaveCSS('outline-style', 'solid');
  await expect(searchButton).toHaveCSS('outline-width', '3px');
});

test('homepage uses the approved white DAT Universal introduction', async ({
  page,
}) => {
  await page.goto(`${sitePath}/`);

  const introduction = page.locator('main > section').first();
  await expect(introduction).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(
    page.getByRole('heading', {name: 'Trung tâm hỗ trợ DAT Universal'}),
  ).toHaveCSS('color', 'rgb(23, 33, 43)');
});

test('navbar presents the DAT Group logo clearly on desktop and mobile', async ({
  page,
}) => {
  await page.goto(`${sitePath}/`);

  const logo = page.locator('.navbar__inner > .navbar__items .navbar__logo');
  const logoImage = logo.locator('img:visible');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(logoImage).toHaveAttribute('alt', 'DAT Group');
  expect(
    await logoImage.evaluate((image) => {
      const element = image as HTMLImageElement;
      return (
        Math.abs(element.naturalWidth / element.naturalHeight - 439.54 / 170.76) <
        0.02
      );
    }),
  ).toBe(true);

  await page.setViewportSize({width: 390, height: 844});
  await page.reload();
  await expect(logo).toBeVisible();
  await expect(
    page.locator('.navbar__inner > .navbar__items .navbar__title'),
  ).not.toBeVisible();
  await expect(page.locator('.navbar__toggle')).toBeVisible();
  expect(
    await page
      .locator('body')
      .evaluate((body) => body.scrollWidth <= window.innerWidth),
  ).toBe(true);
});
