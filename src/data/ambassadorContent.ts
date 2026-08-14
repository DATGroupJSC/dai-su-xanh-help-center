export type AmbassadorArticleKind = 'guide' | 'video' | 'document';

export type AmbassadorArticle = {
  id: string;
  title: string;
  kind: AmbassadorArticleKind;
  status: 'updating';
};

export type AmbassadorTopic = {
  id: string;
  groupId: string;
  title: string;
  articles: readonly AmbassadorArticle[];
};

export type AmbassadorGroup = {
  id: string;
  title: string;
  topics: readonly AmbassadorTopic[];
};

const updating = 'updating' as const;

export const ambassadorGuideGroups: readonly AmbassadorGroup[] = [
  {
    id: 'gia-nhap-he-sinh-thai',
    title: 'Gia nhập hệ sinh thái',
    topics: [
      {
        id: 'chao-mung-dai-su-xanh',
        groupId: 'gia-nhap-he-sinh-thai',
        title: 'Chào mừng Đại sứ xanh',
        articles: [
          {id: 'khai-niem-va-gia-tri-nen-tang', title: 'Khái niệm & giá trị nền tảng', kind: 'guide', status: updating},
          {id: 'gioi-thieu-nen-tang', title: 'Giới thiệu nền tảng', kind: 'video', status: updating},
          {id: 'quyen-loi', title: 'Quyền lợi', kind: 'guide', status: updating},
          {id: 'chinh-sach', title: 'Chính sách', kind: 'guide', status: updating},
          {id: 'huong-dan-nen-tang', title: 'Hướng dẫn nền tảng', kind: 'video', status: updating},
        ],
      },
      {
        id: 'chia-se-bai-viet-va-noi-dung',
        groupId: 'gia-nhap-he-sinh-thai',
        title: 'Chia sẻ bài viết & nội dung',
        articles: [
          {id: 'cach-lay-hinh-anh-video', title: 'Cách lấy hình ảnh/video', kind: 'guide', status: updating},
          {id: 'cach-chia-se-len-facebook-zalo', title: 'Cách chia sẻ lên Facebook/Zalo', kind: 'guide', status: updating},
          {id: 'cach-lay-link-ca-nhan', title: 'Cách lấy link cá nhân', kind: 'guide', status: updating},
        ],
      },
      {
        id: 'tim-kiem-va-theo-doi-khach-hang',
        groupId: 'gia-nhap-he-sinh-thai',
        title: 'Tìm kiếm & theo dõi khách hàng',
        articles: [
          {id: 'tao-khach-hang', title: 'Tạo khách hàng', kind: 'guide', status: updating},
          {id: 'theo-doi-trang-thai', title: 'Theo dõi trạng thái', kind: 'guide', status: updating},
          {id: 'quan-ly-khach-hang', title: 'Quản lý khách hàng', kind: 'guide', status: updating},
          {id: 'meo-tim-khach-hang', title: 'Mẹo tìm khách hàng', kind: 'guide', status: updating},
        ],
      },
    ],
  },
  {
    id: 'kien-thuc-giai-phap',
    title: 'Kiến thức giải pháp',
    topics: [
      {
        id: 'tong-quan-giai-phap',
        groupId: 'kien-thuc-giai-phap',
        title: 'Tổng quan giải pháp',
        articles: [
          {id: 'cau-tao-dien-mat-troi', title: 'Cấu tạo điện mặt trời', kind: 'guide', status: updating},
          {id: 'nguyen-ly-hoat-dong', title: 'Nguyên lý hoạt động', kind: 'guide', status: updating},
          {id: 'loi-ich', title: 'Lợi ích', kind: 'guide', status: updating},
          {id: 'thuat-ngu-co-ban', title: 'Thuật ngữ cơ bản', kind: 'guide', status: updating},
        ],
      },
      {
        id: 'giai-phap-theo-nhu-cau',
        groupId: 'kien-thuc-giai-phap',
        title: 'Giải pháp theo nhu cầu',
        articles: [
          {id: 'hoa-luoi', title: 'Hòa lưới', kind: 'guide', status: updating},
          {id: 'hybrid', title: 'Hybrid', kind: 'guide', status: updating},
          {id: 'luu-tru', title: 'Lưu trữ', kind: 'guide', status: updating},
        ],
      },
      {
        id: 'tai-lieu-giai-phap',
        groupId: 'kien-thuc-giai-phap',
        title: 'Tài liệu giải pháp',
        articles: [
          {id: 'catalogue', title: 'Catalogue', kind: 'document', status: updating},
          {id: 'brochure', title: 'Brochure', kind: 'document', status: updating},
        ],
      },
      {
        id: 'du-an-thuc-te',
        groupId: 'kien-thuc-giai-phap',
        title: 'Dự án thực tế',
        articles: [
          {id: 'cong-trinh-tieu-bieu', title: 'Công trình tiêu biểu', kind: 'guide', status: updating},
          {id: 'video-thuc-te', title: 'Video thực tế', kind: 'video', status: updating},
        ],
      },
    ],
  },
  {
    id: 'trung-tam-ho-tro',
    title: 'Trung tâm hỗ trợ',
    topics: [
      {id: 'cau-hoi-thuong-gap', groupId: 'trung-tam-ho-tro', title: 'Câu hỏi thường gặp', articles: []},
      {
        id: 'huong-dan-quan-ly-tai-khoan',
        groupId: 'trung-tam-ho-tro',
        title: 'Hướng dẫn quản lý tài khoản',
        articles: [
          {id: 'thay-doi-thong-tin-tai-khoan', title: 'Thay đổi thông tin tài khoản', kind: 'guide', status: updating},
          {id: 'cach-rut-hoa-hong', title: 'Cách rút hoa hồng', kind: 'guide', status: updating},
        ],
      },
      {
        id: 'gui-yeu-cau-ho-tro',
        groupId: 'trung-tam-ho-tro',
        title: 'Gửi yêu cầu hỗ trợ',
        articles: [
          {id: 'bao-loi-he-thong', title: 'Báo lỗi hệ thống', kind: 'guide', status: updating},
          {id: 'can-ho-tro-khach-hang', title: 'Cần hỗ trợ khách hàng', kind: 'guide', status: updating},
          {id: 'van-de-tai-khoan', title: 'Vấn đề tài khoản', kind: 'guide', status: updating},
          {id: 'van-de-hoa-hong', title: 'Vấn đề hoa hồng', kind: 'guide', status: updating},
        ],
      },
      {
        id: 'lien-he-dat-universal',
        groupId: 'trung-tam-ho-tro',
        title: 'Liên hệ DAT Universal',
        articles: [
          {id: 'hotline', title: 'Hotline', kind: 'guide', status: updating},
          {id: 'mail', title: 'Mail', kind: 'guide', status: updating},
          {id: 'zalo', title: 'Zalo', kind: 'guide', status: updating},
          {id: 'thoi-gian-ho-tro', title: 'Thời gian hỗ trợ', kind: 'guide', status: updating},
          {id: 'chuyen-vien-ho-tro', title: 'Chuyên viên hỗ trợ', kind: 'guide', status: updating},
        ],
      },
      {
        id: 'thong-bao-va-cap-nhat',
        groupId: 'trung-tam-ho-tro',
        title: 'Thông báo & cập nhật',
        articles: [
          {id: 'bao-tri-he-thong', title: 'Bảo trì hệ thống', kind: 'guide', status: updating},
          {id: 'su-kien', title: 'Sự kiện', kind: 'guide', status: updating},
          {id: 'chuong-trinh-thuong', title: 'Chương trình thưởng', kind: 'guide', status: updating},
        ],
      },
    ],
  },
  {
    id: 'quy-uoc-hop-tac',
    title: 'Quy ước hợp tác',
    topics: [
      {
        id: 'quy-che-dai-su-xanh',
        groupId: 'quy-uoc-hop-tac',
        title: 'Quy chế Đại sứ xanh',
        articles: [
          {id: 'dieu-kien-tham-gia', title: 'Điều kiện tham gia', kind: 'guide', status: updating},
          {id: 'vai-tro-dai-su', title: 'Vai trò đại sứ', kind: 'guide', status: updating},
          {id: 'quy-tac-hoat-dong', title: 'Quy tắc hoạt động', kind: 'guide', status: updating},
        ],
      },
      {
        id: 'chinh-sach-hoa-hong',
        groupId: 'quy-uoc-hop-tac',
        title: 'Chính sách hoa hồng',
        articles: [
          {id: 'cach-tinh-hoa-hong', title: 'Cách tính hoa hồng', kind: 'guide', status: updating},
          {id: 'dieu-kien-nhan-hoa-hong', title: 'Điều kiện nhận hoa hồng', kind: 'guide', status: updating},
          {id: 'thoi-gian-thanh-toan', title: 'Thời gian thanh toán', kind: 'guide', status: updating},
          {id: 'truong-hop-khong-duoc-tinh-hoa-hong', title: 'Các trường hợp không được tính hoa hồng', kind: 'guide', status: updating},
          {id: 'cach-tinh-thuong', title: 'Cách tính thưởng', kind: 'guide', status: updating},
        ],
      },
      {
        id: 'quy-trinh-gioi-thieu-khach-hang',
        groupId: 'quy-uoc-hop-tac',
        title: 'Quy trình giới thiệu khách hàng',
        articles: [
          {id: 'quy-trinh-tao-khach-hang', title: 'Quy trình tạo khách hàng', kind: 'guide', status: updating},
          {id: 'quy-trinh-thanh-toan-hoa-hong', title: 'Quy trình thanh toán hoa hồng', kind: 'guide', status: updating},
        ],
      },
      {id: 'quy-dinh-xu-ly-vi-pham', groupId: 'quy-uoc-hop-tac', title: 'Quy định xử lý vi phạm', articles: []},
    ],
  },
];

export function findAmbassadorTopic(id: string) {
  return ambassadorGuideGroups
    .flatMap((group) => group.topics)
    .find((topic) => topic.id === id);
}

export function ambassadorTopicPath(topic: AmbassadorTopic) {
  return `/huong-dan/dai-su-xanh/${topic.groupId}/${topic.id}`;
}

export function ambassadorArticlePath(
  topic: AmbassadorTopic,
  article: AmbassadorArticle,
) {
  return `${ambassadorTopicPath(topic)}/${article.id}`;
}
