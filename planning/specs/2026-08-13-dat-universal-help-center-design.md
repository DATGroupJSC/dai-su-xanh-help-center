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
- Sidebar giữ tự động theo cấu trúc thư mục, với số thứ tự rõ ràng trong từng bài và category. Khi vừa mở trang, menu trái hiển thị tới hai cấp: cấp 1 là nhóm người dùng (Đại sứ xanh, Nhà lắp đặt, Khách hàng cuối, Hỗ trợ chung) và cấp 2 là nhóm chủ đề bên trong. Tên bài ở cấp 3 chỉ mở khi người đọc chọn nhóm chủ đề đó hoặc đang đọc bài bên trong nhóm; quy tắc này áp dụng cả trong menu mobile.
- Cập nhật cấu hình Docusaurus cùng các link nội bộ để không còn chỉ dẫn riêng Đại sứ xanh ở thành phần dùng chung.
- Đề xuất custom domain sau khi được quyền quản lý DNS: `huongdan.datuniversal.com`. Chưa cấu hình tên miền hoặc DNS trong đợt chuyển đổi nội dung này.

## 6. Chuẩn hình thức tham chiếu Antsomi

Trang tham chiếu là trang tài liệu Antsomi do người dùng cung cấp. Website DAT sử dụng cùng **nguyên tắc bố cục và nhịp đọc**, không sao chép logo, nội dung, hình ảnh, font asset hoặc nhận diện thương hiệu Antsomi.

### Desktop

- Header nền trắng, cao và thoáng, có đường viền đáy mảnh; không dùng bóng đổ nặng. Mục tiêu desktop là cao khoảng 7.5–8rem, logo DAT đặt ở mép trái và ô tìm kiếm rộng khoảng 280px ở mép phải.
- Khu vực bài viết dùng ba cột rõ ràng: menu trái, nội dung chính ở giữa và mục lục “Trên trang này” ở phải.
- Khung trang rộng, tối đa khoảng 1720px, lề ngang responsive từ 24px đến 96px. Ở chiều rộng 1920px, nội dung không dàn kín màn hình; mục tiêu là cảm giác thoáng tương tự ảnh tham chiếu.
- Cột trái khoảng 250–300px, cột phải 220–260px; cột nội dung giữa giới hạn khoảng 820–900px. Khoảng cách giữa mỗi cột là 48–80px, tránh để chữ sát menu hoặc mục lục.
- Menu trái và mục lục phải sticky khi cuộn. Menu trái có tiêu đề nhóm in hoa, item cách nhau rõ; item đang mở dùng DAT blue. Mục lục phải tối giản, chữ nhỏ hơn nội dung và đánh dấu heading đang đọc bằng DAT blue.
- Nội dung mở đầu bằng breadcrumb xanh nhỏ, H1 màu gần đen khoảng 48–52px, sau đó cách heading cấp 2 khoảng 64–80px. Body text khoảng 18px, line-height 1.65–1.75 và đoạn văn cách nhau tối thiểu 1.25rem.
- Heading cấp 2 dùng DAT blue/dark blue, cỡ khoảng 30–34px và có khoảng cách trên rõ ràng. Ảnh trong bài có margin trên/dưới 2rem, giữ nguyên tỉ lệ, không vượt quá bề rộng cột nội dung, có caption/alt text khi cần.
- Không dùng nền màu hoặc card bao quanh toàn bài viết. Nền trắng, chữ đậm dễ đọc và đường viền xám-blue mảnh là mặc định.

### Trang chủ và điều hướng

- Trang chủ dùng cùng header trắng, khoảng lề rộng và typography trên, nhưng thay phần hero đơn đối tượng bằng ba thẻ điều hướng cho ba nhóm người dùng.
- Ba thẻ này là điểm vào chính, có tiêu đề, mô tả một câu và link rõ ràng. Thẻ dùng DAT blue/cyan/orange làm điểm nhấn tiết chế, không tạo cảm giác dashboard hoặc quảng cáo nặng.
- Navbar trên desktop hiển thị năm mục đã chốt; trên mobile dùng menu thu gọn.

### Mobile và accessibility

- Dưới breakpoint tablet, chỉ hiển thị nội dung chính; menu trái chuyển vào nút mở menu và mục lục phải được ẩn/thu gọn.
- Giữ lề đọc dễ chịu, chữ không nhỏ hơn 16px, không có cuộn ngang ở chiều rộng 390px.
- Giữ focus state có độ tương phản đủ, vùng bấm tối thiểu 44px và alt text cho ảnh. Màu DAT được kiểm tra contrast thay vì lấy màu Antsomi nguyên xi.

## 7. Nội dung khởi tạo theo từng nhóm

### Đại sứ xanh

Chuyển toàn bộ bài hiện có, giữ nội dung nghiệp vụ đã có. Bài mới hoặc thay đổi về referral, hoa hồng, cấp bậc và chính sách chỉ được xuất bản khi có approver nghiệp vụ.

### Nhà lắp đặt và Khách hàng cuối

Tạo khung category và trang mở đầu có thông báo ngắn rằng nội dung đang được bổ sung. Không viết thay quy trình lắp đặt, chính sách bảo hành, thông số sản phẩm hoặc CTA bán hàng khi chưa có nguồn chính thức.

### Hỗ trợ chung

Giữ bài “Cách sử dụng Trung tâm hỗ trợ”, đổi ngôn ngữ từ chỉ Đại sứ xanh thành ngôn ngữ dùng chung. Bổ sung FAQ chỉ khi đã được content owner xác nhận.

## 8. Quy trình xuất bản và phân quyền

- Người viết dùng branch riêng và tạo Pull Request.
- Người duyệt kiểm tra nội dung, asset, link, desktop/mobile và trạng thái `build-and-test`.
- Chỉ merge vào `main` khi nội dung và kiểm tra đều đạt. GitHub Pages sẽ tự xuất bản sau khi merge.
- Người viết được cấp quyền `Write`; quyền `Admin` chỉ dành cho 1–2 quản trị viên.

## 9. Các giai đoạn triển khai

1. Đổi thương hiệu, header, spacing và tạo cấu trúc điều hướng ba nhóm; chưa xóa nội dung cũ.
2. Áp dụng lưới ba cột, sidebar và mục lục theo chuẩn hình thức đã chốt.
3. Chuyển nội dung Đại sứ xanh và thiết lập redirect cho đường dẫn cũ.
4. Tạo khung an toàn cho Nhà lắp đặt, Khách hàng cuối và Hỗ trợ chung.
5. Kiểm tra tìm kiếm, desktop, mobile, link cũ và các CTA không có URL.
6. Sau khi có quyền DNS và tên miền được duyệt, cấu hình custom domain cùng HTTPS.

## 10. Kiểm tra trước khi phát hành

- `npm run typecheck`, `npm run test`, `npm run build` và `npm run test:e2e` đều pass.
- Kiểm tra thủ công trang chủ, ba thẻ điều hướng, sidebar, mục lục, tìm kiếm, menu mobile và trang 404.
- So sánh trực quan desktop với các đặc điểm đã chốt: header trắng thoáng, ba cột, lề rộng, body text dễ đọc, menu trái và mục lục phải tối giản.
- Xác nhận URL cũ của Đại sứ xanh chuyển đúng đến URL mới.
- Kiểm tra ở chiều rộng desktop và mobile 390px để không có cuộn ngang hoặc CTA bị tràn.
- Kiểm tra asset public không chứa dữ liệu cá nhân, tài khoản, password, OTP, token hoặc API key.

## 11. Tiêu chí hoàn thành

Người dùng có thể từ trang chủ vào đúng một trong ba khu vực; nội dung Đại sứ xanh hiện có vẫn mở được bằng link mới và link cũ; các khu vực chưa hoàn thiện không đưa thông tin giả; toàn bộ kiểm tra tự động và kiểm tra giao diện đều đạt. Layout tài liệu có lề, khoảng trắng và bố cục ba cột tương tự trang tham chiếu, đồng thời giữ nhận diện DAT và accessibility đạt yêu cầu.
