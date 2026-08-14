import {describe, expect, it} from 'vitest';
import config from '../../docusaurus.config';

describe('DAT Universal help-center configuration', () => {
  it('uses the approved shared help-center identity', () => {
    expect(config.title).toBe('Trung tâm hỗ trợ DAT Universal');
    expect(config.tagline).toBe(
      'Hướng dẫn dành cho Đại sứ xanh, Nhà lắp đặt và Khách hàng.',
    );
  });

  it('uses the DAT Universal custom domain address', () => {
    expect(config.projectName).toBe('dat-universal-help-center');
    expect(config.url).toBe('https://hotro.datuniversal.com');
    expect(config.baseUrl).toBe('/');
  });

  it('exposes the five approved navigation destinations', () => {
    const navbar = config.themeConfig?.navbar as {
      items?: Array<{label?: string}>;
    };

    expect(navbar.items?.map((item) => item.label)).toEqual([
      'Trang chủ',
      'Đại sứ xanh',
      'Nhà lắp đặt',
      'Khách hàng cuối',
      'Hỗ trợ',
    ]);
  });

  it('declares redirects from the former Đại sứ xanh URLs', () => {
    const ambassadorStart =
      '/huong-dan/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh';
    const ambassadorWelcomeArticle =
      `${ambassadorStart}/khai-niem-va-gia-tri-nen-tang`;

    expect(JSON.stringify(config.plugins)).toContain(
      '/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi',
    );
    expect(JSON.stringify(config.plugins)).toContain(ambassadorWelcomeArticle);
  });
});
