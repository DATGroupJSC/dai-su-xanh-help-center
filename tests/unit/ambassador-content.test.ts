import {describe, expect, it} from 'vitest';
import sidebars from '../../sidebars';
import {ambassadorGuideGroups} from '../../src/data/ambassadorContent';

type AmbassadorSidebarGroup = {
  label?: string;
  items?: Array<{label?: string}>;
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

  it('shows exactly four groups and sixteen topic pages in the sidebar', () => {
    const groups = sidebars.daiSuXanhSidebar as AmbassadorSidebarGroup[];

    expect(groups.map((group) => group.label)).toEqual([
      'Gia nhập hệ sinh thái',
      'Kiến thức giải pháp',
      'Trung tâm hỗ trợ',
      'Quy ước hợp tác',
    ]);
    expect(groups.flatMap((group) => group.items ?? [])).toHaveLength(16);
  });
});
