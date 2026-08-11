import {describe, expect, it} from 'vitest';
import {quickActions} from '../../src/data/site';

describe('quickActions', () => {
  it('keeps the four approved self-service paths in order', () => {
    expect(quickActions.map((item) => item.title)).toEqual([
      'Bắt đầu tham gia',
      'Giới thiệu khách hàng',
      'Theo dõi referral và hoa hồng',
      'Cần hỗ trợ',
    ]);
  });

  it('only links to public help-center routes', () => {
    expect(
      quickActions.every((item) => item.to.startsWith('/huong-dan/')),
    ).toBe(true);
  });
});
