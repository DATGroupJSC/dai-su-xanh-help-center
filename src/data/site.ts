export const audienceHubs = [
  {
    title: 'Đại sứ xanh',
    description:
      'Tìm hiểu chương trình, giới thiệu khách hàng và tra cứu referral.',
    to: '/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi',
    status: 'Sẵn sàng',
  },
  {
    title: 'Nhà lắp đặt',
    description:
      'Xem điểm bắt đầu dành cho đối tác lắp đặt; nội dung chuyên môn đang được bổ sung.',
    to: '/huong-dan/nha-lap-dat/bat-dau-hop-tac',
    status: 'Đang bổ sung',
  },
  {
    title: 'Khách hàng cuối',
    description:
      'Tìm hướng dẫn về giải pháp, tư vấn và các bước hỗ trợ cần thiết.',
    to: '/huong-dan/khach-hang/tim-hieu-giai-phap',
    status: 'Đang bổ sung',
  },
] as const;

// Giữ tạm trong lúc trang chủ cũ được chuyển sang audienceHubs.
export const quickActions = [
  {
    title: 'Bắt đầu tham gia',
    description:
      'Hiểu chương trình và các bước đầu tiên dành cho Đại sứ xanh.',
    to: '/huong-dan/bat-dau/dai-su-xanh-la-gi',
  },
  {
    title: 'Giới thiệu khách hàng',
    description:
      'Tìm hướng dẫn tạo và chia sẻ nội dung giới thiệu phù hợp.',
    to: '/huong-dan/gioi-thieu-khach-hang/',
  },
  {
    title: 'Theo dõi referral và hoa hồng',
    description:
      'Tra cứu referral, quyền lợi và các quy tắc liên quan.',
    to: '/huong-dan/referral-hoa-hong/',
  },
  {
    title: 'Cần hỗ trợ',
    description:
      'Bắt đầu từ vấn đề thường gặp hoặc tìm kênh hỗ trợ chính thức.',
    to: '/huong-dan/ho-tro/su-dung-trung-tam-ho-tro',
  },
] as const;

export type SiteLinks = {
  registrationUrl: string;
  supportUrl: string;
};

export function readSiteLinks(
  customFields: Record<string, unknown> | undefined,
): SiteLinks {
  return {
    registrationUrl:
      typeof customFields?.registrationUrl === 'string'
        ? customFields.registrationUrl.trim()
        : '',
    supportUrl:
      typeof customFields?.supportUrl === 'string'
        ? customFields.supportUrl.trim()
        : '',
  };
}
