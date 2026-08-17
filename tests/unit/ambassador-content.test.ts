import {access, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {describe, expect, it} from 'vitest';
import sidebars from '../../sidebars';
import {ambassadorGuideGroups} from '../../src/data/ambassadorContent';

type AmbassadorSidebarItem = {
  label?: string;
  type?: string;
  id?: string;
  className?: string;
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
    expect(groups.every((group) => group.className === 'ambassador-sidebar-group')).toBe(
      true,
    );
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

  it('allows writer-authored articles and requires referenced images to exist', async () => {
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
      sourceFiles.every(
        (source) =>
          source.includes('<SampleArticle kind=') ||
          (source.includes('<ConfiguredArticleHelp />') && /##\s+\S/.test(source)),
      ),
    ).toBe(true);

    const imagePaths = sourceFiles.flatMap((source) =>
      [...source.matchAll(/!\[[^\]]*\]\((\/img\/[^)]+)\)/g)].map(
        ([, imagePath]) => imagePath,
      ),
    );

    expect(imagePaths).not.toHaveLength(0);
    await expect(
      Promise.all(
        imagePaths.map((imagePath) =>
          access(resolve('static', imagePath.slice(1))),
        ),
      ),
    ).resolves.toHaveLength(imagePaths.length);
  });
});
