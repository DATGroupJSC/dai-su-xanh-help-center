# Thiết kế: lề trang và vị trí tên website

Ngày: 2026-08-13  
Trạng thái: Đã được người dùng chốt, sẵn sàng triển khai

## Mục tiêu

Tạo cảm giác thoáng và cân đối như trang tài liệu Antsomi, nhưng giữ nguyên nhận diện DAT và toàn bộ nội dung hiện có.

## Phần lề desktop

1. Khung ba cột dùng độ rộng tối đa khoảng 1.720px và được căn giữa.
2. Trên màn hình rộng 1.920px, chừa lề ngoài xấp xỉ 90–100px ở mỗi bên.
3. Giữ ba cột: menu trái, bài viết và mục lục phải; tăng khoảng hở giữa các cột.
4. Độ rộng phần đọc bài giữ quanh 900px. Khi màn hình nhỏ hơn, khung tự co linh hoạt.
5. Trên tablet và điện thoại, giữ cách responsive hiện có; không tạo thanh cuộn ngang.

## Vị trí tên website — phương án B đã chọn

Nhãn `Trung tâm hỗ trợ DAT Universal` được giữ nguyên chữ. Không đặt nhãn này trong thanh menu desktop nữa để không cạnh tranh chỗ với năm mục menu.

- Thanh menu desktop: chỉ còn logo DAT, các mục menu và ô tìm kiếm.
- Phần đầu bài viết: bổ sung dòng nhận diện nhỏ `TRUNG TÂM HỖ TRỢ DAT UNIVERSAL` phía trên breadcrumb/bài viết.
- Trên trang chủ và metadata, tên đầy đủ vẫn giữ nguyên như hiện tại.
- Trên điện thoại, nhận diện đầy đủ vẫn hiện trong menu mở ra hoặc đầu nội dung, không ép các mục điều hướng trên một hàng.

## Không thay đổi

- URL, cấu trúc nội dung, thứ tự bài viết và các link public.
- Màu DAT, logo, menu theo nhóm người dùng và mục lục bên phải.
- Nội dung nghiệp vụ, hình ảnh và cách người quản trị đăng bài trên GitHub.

## Tiêu chí kiểm tra

- Desktop 1.920px: bài viết bắt đầu gần vị trí 510px; mục lục gần 1.530px.
- Thanh menu desktop đủ chỗ cho: Trang chủ, Đại sứ xanh, Nhà lắp đặt, Khách hàng cuối và Hỗ trợ.
- Tên đầy đủ vẫn xuất hiện rõ ràng trên mỗi trang hướng dẫn nhưng không làm dồn menu.
- Mobile 390px không tràn ngang và vẫn đọc/điều hướng được.
