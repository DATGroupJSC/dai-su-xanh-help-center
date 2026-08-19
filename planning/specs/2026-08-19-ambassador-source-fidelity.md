# Khôi phục nội dung nguồn cho bài Đại sứ xanh

## Mục tiêu

Đưa 19 bài Đại sứ xanh đã có tài liệu nguồn lên website theo đúng tài liệu: giữ nguyên câu chữ, cấu trúc bước, chữ đậm/nghiêng, bảng, ghi chú và ảnh nguồn. Mỗi trang chỉ hiển thị một tiêu đề chính do website tạo từ trường `title`.

## Phạm vi

Áp dụng cho các bài trong danh sách nguồn đã được duyệt:

1. `gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh/khai-niem-va-gia-tri-nen-tang.mdx`
2. `gia-nhap-he-sinh-thai/chia-se-bai-viet-va-noi-dung/cach-lay-hinh-anh-video.mdx`
3. `gia-nhap-he-sinh-thai/chia-se-bai-viet-va-noi-dung/cach-chia-se-len-facebook-zalo.mdx`
4. `gia-nhap-he-sinh-thai/chia-se-bai-viet-va-noi-dung/cach-lay-link-ca-nhan.mdx`
5. `gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/tao-khach-hang.mdx`
6. `gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/theo-doi-trang-thai.mdx`
7. `gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/quan-ly-khach-hang.mdx`
8. `gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/meo-tim-khach-hang.mdx`
9. `kien-thuc-giai-phap/tong-quan-giai-phap/cau-tao-dien-mat-troi.mdx`
10. `kien-thuc-giai-phap/tong-quan-giai-phap/nguyen-ly-hoat-dong.mdx`
11. `kien-thuc-giai-phap/tong-quan-giai-phap/loi-ich.mdx`
12. `kien-thuc-giai-phap/tong-quan-giai-phap/thuat-ngu-co-ban.mdx`
13. `kien-thuc-giai-phap/giai-phap-theo-nhu-cau/hoa-luoi.mdx`
14. `kien-thuc-giai-phap/giai-phap-theo-nhu-cau/hybrid.mdx`
15. `trung-tam-ho-tro/cau-hoi-thuong-gap/index.mdx`
16. `trung-tam-ho-tro/huong-dan-quan-ly-tai-khoan/thay-doi-thong-tin-tai-khoan.mdx`
17. `quy-uoc-hop-tac/quy-che-dai-su-xanh/dieu-kien-tham-gia.mdx`
18. `quy-uoc-hop-tac/quy-che-dai-su-xanh/vai-tro-dai-su.mdx`
19. `quy-uoc-hop-tac/quy-che-dai-su-xanh/quy-tac-hoat-dong.mdx`

## Quy tắc chuyển nội dung

- Dùng `title` trong phần đầu của file MDX làm tiêu đề trang duy nhất. Xoá dòng tiêu đề trùng lặp của tài liệu nguồn, kể cả khi viết in hoa.
- Giữ nguyên nguyên văn phần nội dung còn lại. Không rút gọn, diễn giải lại hoặc thêm hướng dẫn nghiệp vụ.
- Chuyển các phần được in đậm thành `**chữ đậm**`; chuyển phần in nghiêng thành `*chữ nghiêng*`.
- Chuyển danh sách, trích dẫn, bảng và liên kết theo Markdown/MDX tương đương, không thay đổi ý nghĩa.
- Mỗi ảnh trong tài liệu nguồn được lưu ở `static/img/ambassador/<slug-bai-viet>/`. Bài viết tham chiếu ảnh bằng đường dẫn `/img/ambassador/<slug-bai-viet>/<ten-anh>.png` và đặt ảnh sau đoạn hoặc bước tương ứng.
- Không tạo ảnh mới, không dùng ảnh minh hoạ thay thế và không đưa ảnh có dữ liệu cá nhân, password, OTP hoặc thông tin khách hàng chưa được che lên GitHub public.
- Giữ `<ConfiguredArticleHelp />` ở cuối mỗi bài để người đọc vẫn có lối sang phần hỗ trợ đã cấu hình.

## Kiểm tra

- Mỗi bài có tài liệu nguồn phải còn nội dung chi tiết bên dưới phần frontmatter và không chứa `<SampleArticle ... />`.
- Bài có ảnh phải có đường dẫn ảnh tồn tại trong `static/img/`.
- Bài không còn tiêu đề nguồn trùng lặp ngay phía dưới dòng `import`.
- Chạy `npm run test`, `npm run typecheck` và `npm run build` trước khi tạo Pull Request.
- Pull Request chỉ được merge sau khi GitHub Actions đạt và người duyệt đã kiểm tra trực quan một số bài có ảnh, danh sách và bảng.
