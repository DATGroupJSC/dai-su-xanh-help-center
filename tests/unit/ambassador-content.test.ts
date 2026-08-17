import {describe, expect, it} from 'vitest';
import sidebars from '../../sidebars';
import {ambassadorGuideGroups} from '../../src/data/ambassadorContent';

type AmbassadorSidebarItem = {
  label?: string;
  type?: string;
  id?: string;
  items?: AmbassadorSidebarItem[];
};

describe('Đại sứ xanh content navigation', () => {
  it('keeps forty-seven source-safe article placeholders in update state', () => {
    const articles = ambassadorGuideGroups.flatMap((group) =>
      group.topics.flatMap((topic) => topic.articles),
    );

    expect(articles).toHaveLength(47);
    expect(articles.every((article) => article.status === 'updating')).toBe(
      true,
    );
    expect(JSON.stringify(articles)).not.toMatch(/https?:\/\//);
  });

  it('shows article links at level three under their topic only', () => {
    const groups = sidebars.daiSuXanhSidebar as AmbassadorSidebarItem[];
    const topics = groups.flatMap((group) => group.items ?? []);
    const articles = topics.flatMap((topic) => topic.items ?? []);

    expect(groups.map((group) => group.label)).toEqual([
      'Gia nhập hệ sinh thái',
      'Kiến thức giải pháp',
      'Trung tâm hỗ trợ',
      'Quy ước hợp tác',
    ]);
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
});
