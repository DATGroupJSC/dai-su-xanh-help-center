# Thiết kế menu Đại sứ xanh ba cấp và bài viết mẫu

**Ngày:** 2026-08-17

**Phạm vi:** khu vực hướng dẫn `Đại sứ xanh` của Trung tâm hỗ trợ DAT Universal.
**Nguồn yêu cầu:** trao đổi trực tiếp với người quản trị website và ảnh tham khảo giao diện Antsomi.

## Mục tiêu

1. Hiển thị menu trái theo ba cấp để người đọc vào thẳng từng bài viết.
2. Giữ menu gọn: chỉ chủ đề đang xem mới mở danh sách bài viết cấp ba.
3. Làm mũi tên thu gọn/mở tinh tế như cách trình bày Antsomi.
4. Thay favicon bằng biểu tượng DAT xanh–cam dễ nhìn ở kích thước nhỏ.
5. Đưa một mẫu bài viết hoàn chỉnh vào toàn bộ 47 bài chi tiết, chỉ nhằm minh hoạ cách trình bày.

## Không thuộc phạm vi

- Không thêm hoặc suy diễn chính sách, hoa hồng, quyền lợi, quy trình nghiệp vụ, URL đăng ký hay kênh liên hệ chưa được DAT phê duyệt.
- Không thay đổi nội dung của khu vực Nhà lắp đặt, Khách hàng cuối hoặc Hỗ trợ chung.
- Không nhúng YouTube hoặc video ngoài khi chưa có URL video DAT chính thức.

## Thiết kế menu trái

### Cấu trúc

```
Nhóm lớn (cấp 1)
├── Chủ đề (cấp 2)
│   ├── Bài viết (cấp 3)
│   └── Bài viết
└── Chủ đề
```

- Có bốn nhóm lớn hiện hữu của Đại sứ xanh. Tất cả nhóm lớn và chủ đề cấp hai hiển thị ngay khi mở trang.
- Chủ đề cấp hai được liên kết tới trang tổng quan của chủ đề.
- Chủ đề có bài con có nút mở/đóng riêng. Khi người đọc mở một bài, nhóm và chủ đề cha của bài đó tự mở; các chủ đề khác giữ đóng.
- Các thẻ bài viết hiện ở giữa trang chủ đề vẫn được giữ lại. Người đọc có thể chọn bài từ menu trái hoặc từ thẻ bài.

### Trình bày desktop

- Cấp 1: chữ đậm, có khoảng cách phía trên, màu `#20242B` gần với Antsomi.
- Cấp 2: chữ trọng lượng thường, màu xám; trạng thái đang xem dùng xanh DAT đậm `#006DA8`.
- Cấp 3: thụt vào nhẹ, có đường dọc mảnh màu xanh-xám nhạt ở trái; bài đang xem dùng xanh DAT và nền xanh rất nhạt.
- Nút mũi tên dùng chevron 12 px, nét mảnh và vùng bấm đủ lớn cho chuột/bàn phím.
- Mũi tên cấp 1 chỉ hiện khi rê chuột vào nhóm hoặc khi thao tác bằng bàn phím; khi nhóm mở, chevron hướng lên. Mũi tên cấp 2 có bài con luôn hiện và đổi hướng theo trạng thái mở/đóng.

### Trình bày điện thoại và khả năng tiếp cận

- Trên điện thoại, mũi tên vẫn luôn hiện vì thiết bị cảm ứng không có trạng thái rê chuột.
- Tất cả nút mở/đóng có nhãn hỗ trợ trình đọc màn hình và có focus outline tương phản cao.
- Không để menu hoặc nội dung tràn ngang ở chiều rộng 390 px.

## Favicon DAT

- Tạo favicon SVG vuông từ biểu tượng chữ `D` xanh với điểm nhấn tròn cam trong logo DAT hiện có.
- Cấu hình Docusaurus trỏ tới favicon mới. Không dùng toàn bộ logo ngang vì sẽ khó nhận diện khi hiển thị ở 16–32 px.

## Mẫu cho 47 bài viết chi tiết

Mỗi bài chi tiết giữ tiêu đề hiện có, sau đó hiển thị cùng một mẫu nội dung với nhãn rõ ràng:

> Nội dung minh hoạ — thay bằng nội dung chính thức khi được duyệt.

Mẫu bao gồm:

1. Đoạn mở đầu có chữ **đậm** và *nghiêng*.
2. Heading cấp hai và cấp ba.
3. Danh sách gạch đầu dòng và các bước đánh số.
4. Quote hoặc lưu ý được trình bày tách biệt.
5. Ảnh SVG minh hoạ trung tính mang màu DAT, có `alt` rõ ràng.
6. Bảng thông tin ngắn chỉ sử dụng dữ liệu ví dụ.
7. Khung `Video mẫu` có biểu tượng phát và lời nhắc thay bằng URL video DAT được duyệt; không nhúng video ngoài.

Mẫu được xây thành component dùng lại để bảo đảm 47 bài hiển thị nhất quán và sau này có thể thay nội dung từng bài mà không ảnh hưởng bài khác.

## Kiểm tra chấp nhận

- Menu Đại sứ xanh có bốn nhóm cấp 1, 16 chủ đề cấp 2 và 47 bài cấp 3.
- Khi mở một bài, bài đó và cha của nó hiển thị; chủ đề khác không tự bung bài cấp 3.
- Chevron cấp 2 có kích thước trực quan 12 px; chevron cấp 1 chỉ lộ trên hover/focus ở desktop và luôn dùng được trên mobile.
- Favicon có biểu tượng DAT thay vì favicon cũ.
- Một bài bất kỳ trong 47 bài hiển thị đầy đủ text, heading, danh sách, quote, ảnh, bảng và khung video mẫu.
- Build, unit test, kiểm tra giao diện desktop/mobile và kiểm tra không tràn ngang đều pass.

## Rủi ro và xử lý

- Nội dung mẫu có thể bị hiểu là hướng dẫn thật. Nhãn “Nội dung minh hoạ” sẽ xuất hiện rõ ràng ở đầu từng bài.
- Mẫu lặp lại có thể làm kết quả tìm kiếm giống nhau. Nội dung mẫu không dùng từ khoá chính sách hoặc số liệu nghiệp vụ; khi có nội dung đã duyệt, owner thay lần lượt ở từng bài.
- Cập nhật Docusaurus sau này có thể thay đổi HTML menu. CSS sẽ bám theo class chính thức của Docusaurus và có kiểm tra E2E cho hành vi ba cấp.
