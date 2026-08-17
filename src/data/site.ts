export const audienceHubs = [
  {
    title: 'Đại sứ xanh',
    description:
      'Tìm hiểu chương trình, giới thiệu khách hàng và tra cứu referral.',
    to: '/huong-dan/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh',
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
