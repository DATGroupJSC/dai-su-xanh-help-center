import {expect, test} from '@playwright/test';

const sitePath = '/dat-universal-help-center';

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
      '/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi',
      'Đại sứ xanh là gì?',
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

test('former Đại sứ xanh URL redirects to its new audience route', async ({
  page,
}) => {
  await page.goto(
    `${sitePath}/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`,
  );

  await expect(page).toHaveURL(
    new RegExp(
      `${sitePath}/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`,
    ),
  );
  await expect(
    page.getByRole('heading', {name: 'Đại sứ xanh là gì?'}),
  ).toBeVisible();
});

test('sidebar is scoped to the selected audience and shows two levels', async ({
  page,
  isMobile,
}) => {
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
  await expect(sidebar.getByText('Khách hàng cuối', {exact: true})).toHaveCount(
    0,
  );
});

test('guide shows left sidebar and right table of contents', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only three-column assertion');
  await page.goto(
    `${sitePath}/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`,
  );

  await expect(
    page.getByRole('heading', {name: 'Đại sứ xanh là gì?'}),
  ).toBeVisible();
  await expect(page.locator('.theme-doc-sidebar-container')).toBeVisible();
  await expect(page.locator('.table-of-contents')).toBeVisible();
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
  await page.goto(
    `${sitePath}/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`,
  );

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
  await expect(
    page
      .locator(
        '.theme-doc-sidebar-menu .menu__link--active.menu__link--sublist',
      )
      .first(),
  ).toHaveCSS('color', 'rgb(0, 109, 168)');

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

test('mobile navbar sidebar keeps its controls readable', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto(
    `${sitePath}/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`,
  );
  await page.locator('.navbar__toggle').click();

  const sidebar = page.locator('.navbar-sidebar');
  await expect(sidebar).toBeVisible();
  await expect(sidebar.locator('.navbar__title')).toHaveCSS(
    'color',
    'rgb(0, 79, 122)',
  );
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
  await expect(logo).toBeVisible();
  await expect(logo).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(logo.locator('img')).toHaveAttribute('alt', 'DAT Group');
  expect(
    await logo.locator('img').evaluate((image) => {
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
