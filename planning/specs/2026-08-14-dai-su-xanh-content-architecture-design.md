# Thiết kế: cấu trúc nội dung hướng dẫn Đại sứ xanh

Ngày: 2026-08-14<br>
Trạng thái: Đã được người dùng chốt về cấu trúc, chờ người dùng duyệt bản đặc tả này trước khi lập kế hoạch triển khai

## Mục tiêu

Tổ chức lại toàn bộ khu vực **Đại sứ xanh** trên Trung tâm hỗ trợ DAT Universal để:

1. Đại sứ xanh tự tìm được hướng dẫn theo đúng việc cần làm, giảm thời gian hướng dẫn lặp lại.
2. Menu trái luôn gọn, chỉ hiện tối đa hai cấp nội dung.
3. Tạo đủ vị trí bài viết theo danh mục đã cung cấp, nhưng không tự tạo thông tin chính sách, quyền lợi, hoa hồng, điều kiện hợp tác hoặc kênh liên hệ khi chưa có nguồn DAT chính thức.
4. Giữ các link bài cũ hoạt động bằng chuyển hướng sang vị trí mới phù hợp.

## Nguồn và phạm vi

- Nguồn cấu trúc: file `20260811 Hỗ trợ ĐSX.xlsx`, liên kết Google Drive do người dùng cung cấp, phiên bản được đọc ngày 2026-08-14.
- Chỉ áp dụng cho `docs/dai-su-xanh/`. Không thay đổi nội dung của Nhà lắp đặt, Khách hàng cuối hay Hỗ trợ chung.
- Không đưa owner, deadline, ghi chú nội bộ, link tài liệu nội bộ hoặc dữ liệu cá nhân từ file nguồn lên website public.

## Cách điều hướng đã chốt — menu hai cấp

Khi người đọc chọn **Đại sứ xanh**, menu trái chỉ có:

- Cấp 1: bốn nhóm lớn.
- Cấp 2: các chủ đề nhỏ trực thuộc từng nhóm lớn.

Tên từng bài chi tiết **không** xuất hiện trong menu trái. Khi bấm một chủ đề nhỏ, ví dụ **Chào mừng Đại sứ xanh**, người đọc vào một trang tổng quan có các thẻ bài. Mỗi thẻ mở một bài chi tiết. Vì vậy menu giữ được gọn dù số bài tăng lên.

```text
Đại sứ xanh
├── Gia nhập hệ sinh thái
│   ├── Chào mừng Đại sứ xanh
│   ├── Chia sẻ bài viết & nội dung
│   └── Tìm kiếm & theo dõi khách hàng
├── Kiến thức giải pháp
│   ├── Tổng quan giải pháp
│   ├── Giải pháp theo nhu cầu
│   ├── Tài liệu giải pháp
│   └── Dự án thực tế
├── Trung tâm hỗ trợ
│   ├── Câu hỏi thường gặp
│   ├── Hướng dẫn quản lý tài khoản
│   ├── Gửi yêu cầu hỗ trợ
│   ├── Liên hệ DAT Universal
│   └── Thông báo & cập nhật
└── Quy ước hợp tác
    ├── Quy chế Đại sứ xanh
    ├── Chính sách hoa hồng
    ├── Quy trình giới thiệu khách hàng
    └── Quy định xử lý vi phạm
```

## Danh mục bài viết

Mỗi chủ đề nhỏ có một trang tổng quan và các bài chi tiết sau.

| Nhóm lớn | Chủ đề nhỏ | Bài chi tiết |
| --- | --- | --- |
| Gia nhập hệ sinh thái | Chào mừng Đại sứ xanh | Khái niệm & giá trị nền tảng; Giới thiệu nền tảng (Video); Quyền lợi; Chính sách; Hướng dẫn nền tảng (Video) |
| Gia nhập hệ sinh thái | Chia sẻ bài viết & nội dung | Cách lấy hình ảnh/video; Cách chia sẻ lên Facebook/Zalo; Cách lấy link cá nhân |
| Gia nhập hệ sinh thái | Tìm kiếm & theo dõi khách hàng | Tạo khách hàng; Theo dõi trạng thái; Quản lý khách hàng; Mẹo tìm khách hàng |
| Kiến thức giải pháp | Tổng quan giải pháp | Cấu tạo điện mặt trời; Nguyên lý hoạt động; Lợi ích; Thuật ngữ cơ bản |
| Kiến thức giải pháp | Giải pháp theo nhu cầu | Hòa lưới; Hybrid; Lưu trữ |
| Kiến thức giải pháp | Tài liệu giải pháp | Catalogue; Brochure |
| Kiến thức giải pháp | Dự án thực tế | Công trình tiêu biểu; Video thực tế |
| Trung tâm hỗ trợ | Câu hỏi thường gặp | Trang FAQ chờ DAT cung cấp danh sách 10 câu hỏi chính thức |
| Trung tâm hỗ trợ | Hướng dẫn quản lý tài khoản | Thay đổi thông tin tài khoản; Cách rút hoa hồng |
| Trung tâm hỗ trợ | Gửi yêu cầu hỗ trợ | Báo lỗi hệ thống; Cần hỗ trợ khách hàng; Vấn đề tài khoản; Vấn đề hoa hồng |
| Trung tâm hỗ trợ | Liên hệ DAT Universal | Hotline; Mail; Zalo; Thời gian hỗ trợ; Chuyên viên hỗ trợ |
| Trung tâm hỗ trợ | Thông báo & cập nhật | Bảo trì hệ thống; Sự kiện; Chương trình thưởng |
| Quy ước hợp tác | Quy chế Đại sứ xanh | Điều kiện tham gia; Vai trò đại sứ; Quy tắc hoạt động |
| Quy ước hợp tác | Chính sách hoa hồng | Cách tính hoa hồng; Điều kiện nhận hoa hồng; Thời gian thanh toán; Các trường hợp không được tính hoa hồng; Cách tính thưởng |
| Quy ước hợp tác | Quy trình giới thiệu khách hàng | Quy trình tạo khách hàng; Quy trình thanh toán hoa hồng |
| Quy ước hợp tác | Quy định xử lý vi phạm | Trang tổng quan, chờ DAT cung cấp nội dung chính thức |

Mục trong file nguồn có tên **“Tạo nền tảng để thông tin Hỗ trợ đại sứ xanh”** là công việc triển khai nội bộ, không phải bài hướng dẫn public, nên không tạo thành bài trên website.

## Nội dung và trạng thái “Đang cập nhật”

Các bài được tạo theo danh mục trên sẽ có tiêu đề, mô tả ngắn, vị trí trong luồng đọc và trạng thái rõ ràng.

- Khi chưa có source chính thức: hiển thị khối **“Nội dung đang được DAT Universal cập nhật”**; không suy đoán quy trình, mức hoa hồng, quyền lợi, điều kiện, thời gian hay thông tin liên hệ.
- Bài dạng Video: hiển thị vị trí video và trạng thái cập nhật; chỉ nhúng YouTube sau khi có URL được duyệt.
- Bài dạng tài liệu (Catalogue/Brochure): chỉ hiển thị nút tải khi có file public được duyệt; không tạo link giả.
- FAQ: chỉ có khung chờ cập nhật, không tự viết mười câu hỏi/đáp án.
- Khi có source được duyệt, người quản trị thay phần trạng thái bằng nội dung chính thức ngay trong bài đó; không cần đổi menu hay URL.

## Cấu trúc kỹ thuật và URL

Mỗi chủ đề nhỏ có một trang tổng quan (trang thẻ bài) và thư mục các bài chi tiết. Sidebar sẽ được khai báo rõ ràng thay vì tự liệt kê toàn bộ file, nhằm bảo đảm đúng hai cấp.

Ví dụ đường dẫn nội bộ:

```text
docs/dai-su-xanh/
└── gia-nhap-he-sinh-thai/
    └── chao-mung-dai-su-xanh/
        ├── index.mdx                         # Trang thẻ bài
        ├── khai-niem-va-gia-tri-nen-tang.mdx
        ├── gioi-thieu-nen-tang.mdx
        ├── quyen-loi.mdx
        ├── chinh-sach.mdx
        └── huong-dan-nen-tang.mdx
```

Slug public dùng tiếng Việt không dấu, theo cấu trúc nhóm/chủ đề/bài; ví dụ:

`/huong-dan/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh/khai-niem-va-gia-tri-nen-tang`

Các URL cũ được chuyển hướng như sau:

| URL cũ | Điểm đến mới |
| --- | --- |
| `/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi` | Bài Khái niệm & giá trị nền tảng |
| `/huong-dan/dai-su-xanh/gioi-thieu-khach-hang/tong-quan` | Trang Quy trình giới thiệu khách hàng |
| `/huong-dan/dai-su-xanh/referral-hoa-hong/tong-quan` | Trang Chính sách hoa hồng |
| `/huong-dan/dai-su-xanh/chinh-sach-tai-nguyen/tong-quan` | Trang Quy ước hợp tác |

## Trải nghiệm người đọc

1. Người đọc vào **Đại sứ xanh** từ thanh menu.
2. Chọn một trong bốn nhóm lớn ở cột trái, rồi chọn chủ đề nhỏ.
3. Xem các thẻ bài ở phần nội dung giữa, chọn bài cần đọc.
4. Trong bài chi tiết, dùng mục lục bên phải (nếu bài có các đề mục) và nút Bài trước/Bài tiếp theo để đọc tiếp.
5. Nếu cần tìm bài khác, dùng ô Tìm kiếm; kết quả chỉ mở bài liên quan, không làm thay đổi menu của nhóm người dùng khác.

## Không thay đổi

- Nhận diện DAT, layout ba cột và cách hiển thị responsive hiện có.
- Nội dung của Nhà lắp đặt, Khách hàng cuối và Hỗ trợ chung.
- Custom domain public `https://hotro.datuniversal.com`.

## Tiêu chí kiểm tra trước khi đưa lên website

1. Sidebar Đại sứ xanh chỉ hiện đúng bốn nhóm lớn và 16 chủ đề nhỏ; không liệt kê các bài chi tiết.
2. Mỗi chủ đề nhỏ mở được trang tổng quan, có thẻ dẫn tới toàn bộ bài theo bảng danh mục.
3. Các bài chưa có source chính thức đều có trạng thái “Đang cập nhật”, không có dữ liệu nghiệp vụ bị suy đoán.
4. Bốn URL cũ vẫn mở được và chuyển tới nội dung mới tương ứng.
5. Không có bài, menu hay kết quả tìm kiếm của Nhà lắp đặt/Khách hàng cuối lẫn vào Đại sứ xanh.
6. Website build thành công, không có link hỏng; desktop và mobile vẫn không tràn ngang.
