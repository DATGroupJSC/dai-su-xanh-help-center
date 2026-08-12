import {expect, test} from '@playwright/test';

const sitePath = '/dai-su-xanh-help-center';

test('homepage exposes four self-service entry points', async ({page}) => {
  await page.goto(`${sitePath}/`);

  await expect(
    page.getByRole('heading', {name: 'Bạn cần hỗ trợ nội dung gì?'}),
  ).toBeVisible();

  for (const label of [
    'Bắt đầu tham gia',
    'Giới thiệu khách hàng',
    'Theo dõi referral và hoa hồng',
    'Cần hỗ trợ',
  ]) {
    await expect(page.getByRole('link', {name: label})).toHaveCount(1);
  }

  await expect(
    page.getByRole('link', {name: 'Đăng ký Đại sứ xanh'}),
  ).toHaveCount(0);
});

test('guide shows left sidebar and right table of contents', async ({
  page,
  isMobile,
}) => {
  test.skip(Boolean(isMobile), 'Desktop-only three-column assertion');
  await page.goto(`${sitePath}/huong-dan/bat-dau/dai-su-xanh-la-gi`);

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

test('global shell and docs use the DAT palette', async ({page}) => {
  await page.goto(`${sitePath}/`);

  await expect(page.locator('.navbar')).toHaveCSS(
    'background-color',
    'rgb(0, 109, 168)',
  );

  await page.goto(`${sitePath}/huong-dan/bat-dau/dai-su-xanh-la-gi`);
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
  await page.goto(`${sitePath}/huong-dan/bat-dau/dai-su-xanh-la-gi`);
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
  await expect(searchButton).toHaveCSS('outline-color', 'rgb(234, 248, 255)');
  await expect(searchButton).toHaveCSS('outline-style', 'solid');
  await expect(searchButton).toHaveCSS('outline-width', '3px');
});

test('homepage uses the DAT direct color direction', async ({page}) => {
  await page.goto(`${sitePath}/`);

  const hero = page.locator('main > section').first();
  expect(
    await hero.evaluate((element) => getComputedStyle(element).backgroundImage),
  ).toContain('rgb(0, 129, 199)');

  const searchButton = hero.locator('.aa-DetachedSearchButton');
  await expect(searchButton).toBeVisible();
  await expect(searchButton).toHaveCSS('height', '56px');
  await expect(searchButton).toHaveCSS('border-radius', '16px');
  await expect(searchButton).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(
    searchButton.locator('.aa-DetachedSearchButtonPlaceholder'),
  ).toHaveCSS('color', 'rgb(91, 109, 120)');
  await searchButton.focus();
  await expect(searchButton).toHaveCSS('outline-color', 'rgb(234, 248, 255)');

  await expect(
    page.getByRole('heading', {name: 'Bạn cần hỗ trợ nội dung gì?'}),
  ).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(hero.getByText('TRUNG TÂM HỖ TRỢ ĐẠI SỨ XANH')).toHaveCSS(
    'color',
    'rgb(234, 248, 255)',
  );
  await expect(
    hero.getByText(
      'Tìm câu trả lời nhanh, làm đúng từng bước và chỉ liên hệ đội hỗ trợ khi thật sự cần.',
    ),
  ).toHaveCSS('color', 'rgb(234, 248, 255)');
  await expect(page.getByText('01', {exact: true})).toHaveCSS(
    'color',
    'rgb(255, 132, 0)',
  );
});

test('navbar presents the DAT Group logo clearly on desktop and mobile', async ({
  page,
}) => {
  await page.goto(`${sitePath}/`);

  const logo = page.locator('.navbar__inner > .navbar__items .navbar__logo');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveCSS('background-color', 'rgb(255, 255, 255)');
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
  ).toBeVisible();
  await expect(page.locator('.navbar__toggle')).toBeVisible();
  expect(
    await page
      .locator('body')
      .evaluate((body) => body.scrollWidth <= window.innerWidth),
  ).toBe(true);
});
