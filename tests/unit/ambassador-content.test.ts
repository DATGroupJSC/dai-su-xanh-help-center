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
  it('keeps source-safe article metadata and marks published articles accurately', () => {
    const articles = ambassadorGuideGroups.flatMap((group) =>
      group.topics.flatMap((topic) => topic.articles),
    );

    expect(articles).toHaveLength(48);
    expect(articles.filter((article) => article.status === 'published')).toHaveLength(21);
    expect(articles.every((article) => article.status === 'updating' || article.status === 'published')).toBe(true);
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
    expect(articles).toHaveLength(48);
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

    expect(files).toHaveLength(48);
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

  it('publishes the solar-system article with its supplied local illustration', async () => {
    const articlePath = resolve(
      'docs',
      'dai-su-xanh',
      'kien-thuc-giai-phap',
      'tong-quan-giai-phap',
      'cau-tao-dien-mat-troi.mdx',
    );
    const source = await readFile(articlePath, 'utf8');

    expect(source).toContain('## Hệ thống điện mặt trời là gì?');
    expect(source).toContain('## Cấu hình 3 hệ thống điện mặt trời phổ biến');
    expect(source).toContain(
      '![Tấm pin năng lượng mặt trời được lắp trên mái nhà](/img/cau-tao-he-thong-dien-mat-troi.png)',
    );
    await expect(
      access(resolve('static', 'img', 'cau-tao-he-thong-dien-mat-troi.png')),
    ).resolves.toBeUndefined();
  });

  it('replaces every spreadsheet-sourced Ambassador placeholder with authored content', async () => {
    const sourceArticlePaths = [
      'gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh/khai-niem-va-gia-tri-nen-tang.mdx',
      'gia-nhap-he-sinh-thai/chia-se-bai-viet-va-noi-dung/cach-lay-hinh-anh-video.mdx',
      'gia-nhap-he-sinh-thai/chia-se-bai-viet-va-noi-dung/cach-chia-se-len-facebook-zalo.mdx',
      'gia-nhap-he-sinh-thai/chia-se-bai-viet-va-noi-dung/cach-lay-link-ca-nhan.mdx',
      'gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/tao-khach-hang.mdx',
      'gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/theo-doi-trang-thai.mdx',
      'gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/quan-ly-khach-hang.mdx',
      'gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/meo-tim-khach-hang.mdx',
      'kien-thuc-giai-phap/tong-quan-giai-phap/cau-tao-dien-mat-troi.mdx',
      'kien-thuc-giai-phap/tong-quan-giai-phap/nguyen-ly-hoat-dong.mdx',
      'kien-thuc-giai-phap/tong-quan-giai-phap/loi-ich.mdx',
      'kien-thuc-giai-phap/tong-quan-giai-phap/thuat-ngu-co-ban.mdx',
      'kien-thuc-giai-phap/giai-phap-theo-nhu-cau/hoa-luoi.mdx',
      'kien-thuc-giai-phap/giai-phap-theo-nhu-cau/hybrid.mdx',
      'trung-tam-ho-tro/cau-hoi-thuong-gap/index.mdx',
      'trung-tam-ho-tro/huong-dan-quan-ly-tai-khoan/thay-doi-thong-tin-tai-khoan.mdx',
      'quy-uoc-hop-tac/quy-che-dai-su-xanh/dieu-kien-tham-gia.mdx',
      'quy-uoc-hop-tac/quy-che-dai-su-xanh/vai-tro-dai-su.mdx',
      'quy-uoc-hop-tac/quy-che-dai-su-xanh/quy-tac-hoat-dong.mdx',
    ];
    const sourceFiles = await Promise.all(
      sourceArticlePaths.map((path) =>
        readFile(resolve('docs', 'dai-su-xanh', path), 'utf8'),
      ),
    );

    expect(sourceFiles).toHaveLength(19);
    expect(sourceFiles.every((source) => source.includes('<ConfiguredArticleHelp />'))).toBe(
      true,
    );
    expect(
      sourceFiles.every((source) =>
        /import \{ConfiguredArticleHelp\} from '@site\/src\/components\/ArticleHelp';\r?\n\r?\n/.test(
          source,
        ),
      ),
    ).toBe(true);
    expect(sourceFiles.every((source) => /##\s+\S/.test(source))).toBe(true);
    expect(sourceFiles.some((source) => source.includes('<SampleArticle kind='))).toBe(
      false,
    );
    expect(sourceFiles.some((source) => source.includes('<UpdatingArticle'))).toBe(
      false,
    );

    sourceFiles.forEach((source) => {
      const titleMatch = source.match(/^title:\s*["']?(.+?)["']?\r?$/m);
      const title = titleMatch?.[1];
      expect(title).toBeTruthy();
      const escapedTitle = title!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      expect(source).not.toMatch(new RegExp(`^#\\s+${escapedTitle}\\s*$`, 'm'));
    });
  });

  it('keeps the full supplied steps in the image and video guide', async () => {
    const source = await readFile(
      resolve(
        'docs',
        'dai-su-xanh',
        'gia-nhap-he-sinh-thai',
        'chia-se-bai-viet-va-noi-dung',
        'cach-lay-hinh-anh-video.mdx',
      ),
      'utf8',
    );

    expect(source).toContain('## Bước 1: Truy cập DAT Universal');
    expect(source).toContain('## Bước 6: Chia sẻ lên Facebook/Zalo');
    expect(source).toContain('**datuniversal.com** → Chọn tab **“Đại sứ Xanh”**.');
    expect(source).toContain(
      'Sau khi kiểm tra đầy đủ → Chọn **“Đăng bài”**.',
    );
    expect(source).not.toContain('## HƯỚNG DẪN LẤY HÌNH ẢNH/VIDEO');
    expect(source).toContain(
      '![Mở tab Đại sứ Xanh trên DAT Universal](/img/ambassador/huong-dan-lay-hinh-anh/buoc-1-dai-su-xanh.png)',
    );
    expect(source).toContain(
      '![Tạo bài đăng Facebook với hình ảnh hoặc video](/img/ambassador/huong-dan-lay-hinh-anh/buoc-6-tao-bai-facebook.png)',
    );
    expect(source).toContain(
      'Đây là thông tin giúp hệ thống xác định và ghi nhận khách hàng được giới thiệu từ bạn.',
    );
  });

  it('preserves Word guide emphasis and approved local screenshots', async () => {
    const guides = [
      {
        path: 'gia-nhap-he-sinh-thai/chia-se-bai-viet-va-noi-dung/cach-chia-se-len-facebook-zalo.mdx',
        emphasis: '**datuniversal.com** → Chọn tab **“Đại sứ Xanh”**.',
        image: '/img/ambassador/cach-chia-se-len-facebook-zalo/buoc-1-truy-cap-dat-universal.png',
      },
      {
        path: 'gia-nhap-he-sinh-thai/chia-se-bai-viet-va-noi-dung/cach-lay-link-ca-nhan.mdx',
        emphasis: '**datuniversal.com** → Chọn tab **“Đại sứ Xanh”**.',
        image: '/img/ambassador/cach-lay-link-ca-nhan/buoc-1-truy-cap-dat-universal.png',
      },
      {
        path: 'gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/theo-doi-trang-thai.mdx',
        emphasis: 'Đại sứ Xanh có thể theo dõi khách hàng đã giới thiệu theo **2 cách** sau:',
        image: '/img/ambassador/theo-doi-trang-thai/buoc-1-truy-cap-dat-universal.png',
      },
      {
        path: 'gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/quan-ly-khach-hang.mdx',
        emphasis: 'Tại giao diện quản lý → Chọn **“Trang Đại sứ”** → Chọn **“Thống kê”**.',
        image: '/img/ambassador/quan-ly-khach-hang/buoc-1-truy-cap-dat-universal.png',
      },
      {
        path: 'gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/meo-tim-khach-hang.mdx',
        emphasis: '**Mẹo:** Mỗi ngày hãy thử tìm **3–5 người** có khả năng phù hợp.',
      },
    ];

    const sources = await Promise.all(
      guides.map(({path}) => readFile(resolve('docs', 'dai-su-xanh', path), 'utf8')),
    );

    guides.forEach((guide, index) => {
      expect(sources[index]).toContain(guide.emphasis);
      if (guide.image) {
        expect(sources[index]).toContain(`](${guide.image})`);
      }
    });
  });
});
