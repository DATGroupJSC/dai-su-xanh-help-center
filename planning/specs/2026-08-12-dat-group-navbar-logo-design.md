# Thiết kế logo DAT Group trên thanh điều hướng

## Mục tiêu

Thêm logo DAT Group vào website Trung tâm hỗ trợ Đại sứ xanh để nhận diện thương hiệu rõ ràng trên mọi trang, đồng thời giữ nguyên khả năng đọc và bố cục trên desktop/mobile.

## Phương án đã duyệt

- Dùng nguyên bản SVG màu xanh–cam do người dùng cung cấp.
- Đặt logo ở đầu thanh điều hướng, trước chữ `Đại sứ xanh`.
- Logo nằm trên một ô nền trắng bo nhẹ để phần màu xanh không bị chìm trên nền xanh DAT của thanh điều hướng.
- Bấm vào vùng thương hiệu sẽ quay về trang chủ.
- Giữ nguyên chữ `Đại sứ xanh`; không thay đổi menu, nội dung, CTA hoặc màu thương hiệu hiện tại.

## Kích thước và responsive

- Desktop: logo cao khoảng 38 px, không làm tăng chiều cao thanh điều hướng hiện tại.
- Mobile: logo cao khoảng 32 px để còn đủ chỗ cho tiêu đề và nút menu.
- Giữ đúng tỉ lệ gốc; không kéo giãn, cắt hoặc đổi màu SVG.
- Không tạo horizontal overflow ở viewport 390 px.

## Cấu trúc triển khai

- Sao chép asset được duyệt vào `static/img/logo_DAT_Group.svg` để website và GitHub Pages phục vụ ổn định.
- Khai báo logo qua cấu hình navbar của Docusaurus.
- Chỉ thêm CSS có phạm vi trong navbar/mobile sidebar để tạo nền trắng và kích thước responsive.

## Kiểm tra

- Unit test xác nhận navbar dùng đúng asset và alt text.
- E2E desktop xác nhận logo hiển thị, đúng tỉ lệ và có nền trắng.
- E2E mobile xác nhận logo hiển thị, không tràn ngang và menu vẫn sử dụng được.
- Chạy typecheck, unit test, production build và E2E trước khi publish.

## Ngoài phạm vi

- Không đổi favicon, social card hoặc logo trong footer/hero.
- Không sửa nội dung bài viết hay bật CTA đăng ký.
