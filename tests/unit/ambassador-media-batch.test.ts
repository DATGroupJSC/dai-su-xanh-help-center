import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {describe, expect, it} from 'vitest';
import {ambassadorGuideGroups} from '../../src/data/ambassadorContent';

const projectFile = (...segments: string[]) => resolve(process.cwd(), ...segments);

const readProjectFile = (...segments: string[]) =>
  readFileSync(projectFile(...segments), 'utf8');

describe('Đợt bổ sung nội dung và media cho Đại sứ xanh', () => {
  it('có bài Tạo tài khoản trong chủ đề Chào mừng Đại sứ xanh', () => {
    const welcomeTopic = ambassadorGuideGroups[0].topics.find(
      (topic) => topic.id === 'chao-mung-dai-su-xanh',
    );

    expect(welcomeTopic?.articles).toContainEqual(
      expect.objectContaining({
        id: 'tao-tai-khoan',
        title: 'Tạo tài khoản',
        status: 'published',
      }),
    );
    expect(
      existsSync(
        projectFile(
          'docs',
          'dai-su-xanh',
          'gia-nhap-he-sinh-thai',
          'chao-mung-dai-su-xanh',
          'tao-tai-khoan.mdx',
        ),
      ),
    ).toBe(true);
  });

  it('đưa đầy đủ media đã duyệt vào sáu bài được cập nhật', () => {
    const expectedAssets = [
      'static/img/ambassador/tao-tai-khoan/buoc-01.png',
      'static/img/ambassador/tao-khach-hang/buoc-11.png',
      'static/img/ambassador/brochure/trang-05.png',
      'static/img/ambassador/brochure/brochure-dau-tu-dien-mat-troi.pdf',
      'static/img/ambassador/thay-doi-thong-tin-tai-khoan/buoc-06.png',
    ];

    expectedAssets.forEach((asset) => {
      expect(existsSync(projectFile(...asset.split('/')))).toBe(true);
    });

    expect(
      readProjectFile(
        'docs',
        'dai-su-xanh',
        'gia-nhap-he-sinh-thai',
        'tim-kiem-va-theo-doi-khach-hang',
        'tao-khach-hang.mdx',
      ),
    ).toContain('/img/ambassador/tao-khach-hang/buoc-11.png');
    expect(
      readProjectFile(
        'docs',
        'dai-su-xanh',
        'kien-thuc-giai-phap',
        'tai-lieu-giai-phap',
        'brochure.mdx',
      ),
    ).toContain('/img/ambassador/brochure/brochure-dau-tu-dien-mat-troi.pdf');
    expect(
      readProjectFile(
        'docs',
        'dai-su-xanh',
        'kien-thuc-giai-phap',
        'du-an-thuc-te',
        'cong-trinh-tieu-bieu.mdx',
      ),
    ).toContain('facebook.com/media/set/?set=a.1449198983886140&type=3');
    expect(
      readProjectFile(
        'docs',
        'dai-su-xanh',
        'kien-thuc-giai-phap',
        'du-an-thuc-te',
        'video-thuc-te.mdx',
      ),
    ).toContain('youtube-nocookie.com/embed/MOSC146Oja0');
  });
});
