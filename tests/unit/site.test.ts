import {describe, expect, it} from 'vitest';
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

  it('opens Đại sứ xanh at the approved welcome topic', () => {
    expect(audienceHubs.find((hub) => hub.title === 'Đại sứ xanh')?.to).toBe(
      '/huong-dan/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh',
    );
  });
});

describe('readSiteLinks', () => {
  it('fails closed when custom fields are absent', () => {
    expect(readSiteLinks(undefined)).toEqual({
      registrationUrl: '',
      supportUrl: '',
    });
  });
});
