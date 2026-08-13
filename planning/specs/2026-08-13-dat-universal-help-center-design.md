# Thiết kế chuyển đổi: Trung tâm hỗ trợ DAT Universal

**Ngày:** 2026-08-13

**Trạng thái:** Đã duyệt định hướng, chờ duyệt bản thiết kế trước khi triển khai
**Phạm vi:** Website GitHub Pages `DATGroupJSC/dai-su-xanh-help-center`

## 1. Quyết định đã chốt

Website không còn chỉ phục vụ Đại sứ xanh. Website trở thành một trung tâm hỗ trợ công khai, dùng chung cho ba nhóm người dùng:

1. Đại sứ xanh.
2. Nhà lắp đặt (Installer).
3. Khách hàng cuối.

Tên hiển thị chính thức được dùng trên website là **Trung tâm hỗ trợ DAT Universal**. Dòng giới thiệu là: **Hướng dẫn dành cho Đại sứ xanh, Nhà lắp đặt và Khách hàng.**

## 2. Mục tiêu và nguyên tắc

### Mục tiêu

- Người dùng tự chọn đúng khu vực ngay từ trang chủ, giảm thời gian hướng dẫn lặp lại.
- Quản trị viên chỉ quản lý một website, một kho nội dung và một quy trình duyệt bài.
- Nội dung công khai giúp người chưa tham gia hiểu chương trình hoặc tìm bước tiếp theo phù hợp.

### Nguyên tắc

- Giữ layout tài liệu hiện có: menu trái, nội dung giữa, mục lục phải trên desktop; menu thu gọn trên mobile.
- Không tự công bố giá, hoa hồng, SLA, điều kiện hợp tác, URL đăng ký hay thông tin nghiệp vụ chưa có content owner phê duyệt.
- Chỉ có một website; không tách ba website hoặc ba repository.
- Khi một khu vực chưa có nội dung được duyệt, hiển thị trạng thái “đang bổ sung” và không tạo CTA hoặc link giả.

## 3. Cấu trúc thông tin được đề xuất

```text
Trang chủ
├── Đại sứ xanh
│   ├── Bắt đầu
│   ├── Giới thiệu khách hàng
│   ├── Referral, hoa hồng và cấp bậc
│   └── Chính sách và tài nguyên
├── Nhà lắp đặt
│   ├── Bắt đầu hợp tác
│   ├── Quy trình triển khai
│   └── Hỗ trợ kỹ thuật
├── Khách hàng cuối
│   ├── Tìm hiểu giải pháp
│   ├── Mua hàng / nhận tư vấn
│   └── Bảo hành và hỗ trợ
└── Hỗ trợ chung
    ├── Cách sử dụng Trung tâm hỗ trợ
    └── Câu hỏi thường gặp và liên hệ
```

Trang chủ có ba thẻ lớn, mỗi thẻ dẫn tới đúng khu vực của người dùng. Thanh menu gồm: **Trang chủ | Đại sứ xanh | Nhà lắp đặt | Khách hàng cuối | Hỗ trợ**. Tìm kiếm tiếp tục dùng chung toàn website.

## 4. Cách tổ chức nội dung và đường dẫn

Nội dung Docusaurus được sắp xếp theo các thư mục sau:

```text
docs/
├── dai-su-xanh/
├── nha-lap-dat/
├── khach-hang/
└── ho-tro/
```

Các URL mới dùng cùng tiền tố `huong-dan`, ví dụ:

- `/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi`
- `/huong-dan/nha-lap-dat/bat-dau-hop-tac`
- `/huong-dan/khach-hang/tim-hieu-giai-phap`
- `/huong-dan/ho-tro/cach-su-dung-trung-tam-ho-tro`

Nội dung Đại sứ xanh hiện có sẽ được chuyển vào `docs/dai-su-xanh/`. Các URL cũ, chẳng hạn `/huong-dan/bat-dau/dai-su-xanh-la-gi`, phải tự chuyển sang URL mới để các link đã chia sẻ không bị hỏng.

## 5. Phạm vi thay đổi giao diện và cấu hình

- Đổi tiêu đề, tagline, tiêu đề trang chủ, navbar, footer, metadata và nhãn tìm kiếm sang thương hiệu Trung tâm hỗ trợ DAT Universal.
- Giữ logo DAT Group đang dùng.
- Trang chủ thay phần giới thiệu đơn đối tượng bằng ba thẻ điều hướng: Đại sứ xanh, Nhà lắp đặt và Khách hàng cuối.
- Sidebar giữ tự động theo cấu trúc thư mục, với số thứ tự rõ ràng trong từng bài và category.
- Cập nhật cấu hình Docusaurus cùng các link nội bộ để không còn chỉ dẫn riêng Đại sứ xanh ở thành phần dùng chung.
- Đề xuất custom domain sau khi được quyền quản lý DNS: `huongdan.datuniversal.com`. Chưa cấu hình tên miền hoặc DNS trong đợt chuyển đổi nội dung này.

## 6. Nội dung khởi tạo theo từng nhóm

### Đại sứ xanh

Chuyển toàn bộ bài hiện có, giữ nội dung nghiệp vụ đã có. Bài mới hoặc thay đổi về referral, hoa hồng, cấp bậc và chính sách chỉ được xuất bản khi có approver nghiệp vụ.

### Nhà lắp đặt và Khách hàng cuối

Tạo khung category và trang mở đầu có thông báo ngắn rằng nội dung đang được bổ sung. Không viết thay quy trình lắp đặt, chính sách bảo hành, thông số sản phẩm hoặc CTA bán hàng khi chưa có nguồn chính thức.

### Hỗ trợ chung

Giữ bài “Cách sử dụng Trung tâm hỗ trợ”, đổi ngôn ngữ từ chỉ Đại sứ xanh thành ngôn ngữ dùng chung. Bổ sung FAQ chỉ khi đã được content owner xác nhận.

## 7. Quy trình xuất bản và phân quyền

- Người viết dùng branch riêng và tạo Pull Request.
- Người duyệt kiểm tra nội dung, asset, link, desktop/mobile và trạng thái `build-and-test`.
- Chỉ merge vào `main` khi nội dung và kiểm tra đều đạt. GitHub Pages sẽ tự xuất bản sau khi merge.
- Người viết được cấp quyền `Write`; quyền `Admin` chỉ dành cho 1–2 quản trị viên.

## 8. Các giai đoạn triển khai

1. Đổi thương hiệu và tạo cấu trúc điều hướng ba nhóm; chưa xóa nội dung cũ.
2. Chuyển nội dung Đại sứ xanh và thiết lập redirect cho đường dẫn cũ.
3. Tạo khung an toàn cho Nhà lắp đặt, Khách hàng cuối và Hỗ trợ chung.
4. Kiểm tra tìm kiếm, desktop, mobile, link cũ và các CTA không có URL.
5. Sau khi có quyền DNS và tên miền được duyệt, cấu hình custom domain cùng HTTPS.

## 9. Kiểm tra trước khi phát hành

- `npm run typecheck`, `npm run test`, `npm run build` và `npm run test:e2e` đều pass.
- Kiểm tra thủ công trang chủ, ba thẻ điều hướng, sidebar, mục lục, tìm kiếm, menu mobile và trang 404.
- Xác nhận URL cũ của Đại sứ xanh chuyển đúng đến URL mới.
- Kiểm tra ở chiều rộng desktop và mobile 390px để không có cuộn ngang hoặc CTA bị tràn.
- Kiểm tra asset public không chứa dữ liệu cá nhân, tài khoản, password, OTP, token hoặc API key.

## 10. Tiêu chí hoàn thành

Người dùng có thể từ trang chủ vào đúng một trong ba khu vực; nội dung Đại sứ xanh hiện có vẫn mở được bằng link mới và link cũ; các khu vực chưa hoàn thiện không đưa thông tin giả; toàn bộ kiểm tra tự động và kiểm tra giao diện đều đạt.
