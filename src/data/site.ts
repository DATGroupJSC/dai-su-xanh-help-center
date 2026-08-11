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
