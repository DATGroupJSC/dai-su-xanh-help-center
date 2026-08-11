import {expect, test} from '@playwright/test';

test('homepage exposes four self-service entry points', async ({page}) => {
  await page.goto('/');

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
  await page.goto('/huong-dan/bat-dau/dai-su-xanh-la-gi');

  await expect(
    page.getByRole('heading', {name: 'Đại sứ xanh là gì?'}),
  ).toBeVisible();
  await expect(page.locator('.theme-doc-sidebar-container')).toBeVisible();
  await expect(page.locator('.table-of-contents')).toBeVisible();
});

test('404 returns users to the Help Center', async ({page}) => {
  await page.goto('/khong-ton-tai');

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
  await page.goto('/huong-dan/bat-dau/dai-su-xanh-la-gi');

  expect(
    await page.locator('body').evaluate(
      (body) => body.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator('.navbar__toggle')).toBeVisible();
});

test('site is locked to light mode', async ({page}) => {
  await page.emulateMedia({colorScheme: 'dark'});
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(
    page.getByRole('button', {name: /Chuyển đổi chế độ sáng và tối/}),
  ).toHaveCount(0);
});

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
