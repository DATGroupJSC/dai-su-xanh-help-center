# Trung tâm hỗ trợ DAT Universal

Website public để Đại sứ xanh, Nhà lắp đặt và Khách hàng cuối tự tìm hướng dẫn chính thức. Website dùng Docusaurus 3; nội dung bài viết được lưu bằng Markdown/MDX và xuất bản qua GitHub Pages.

## Cấu trúc nội dung

Mỗi nhóm người dùng có một khu vực và menu trái riêng:

```text
docs/
├── dai-su-xanh/       # Hướng dẫn riêng cho Đại sứ xanh
├── nha-lap-dat/       # Hướng dẫn riêng cho Nhà lắp đặt
├── khach-hang/        # Hướng dẫn riêng cho Khách hàng cuối
└── ho-tro/            # Hỗ trợ chung cho mọi nhóm
```

Khi người đọc chọn một nhóm, cột trái chỉ hiển thị bài của nhóm đó. Riêng Đại sứ xanh, menu mặc định hiển thị hai cấp: bốn nhóm lớn và các chủ đề nhỏ. Bài chi tiết được mở bằng thẻ trên trang chủ đề, không nằm trong menu trái. Không để bài của nhóm này trong thư mục của nhóm khác.

Chỉ thêm quy trình, chính sách, SLA, giá, bảo hành hoặc thông số khi có nguồn chính thức đã được content owner phê duyệt. Không tự điền URL đăng ký, hoa hồng, quyền lợi hay kênh hỗ trợ tạm.

## Thêm hoặc sửa một bài

1. Trên GitHub, tạo branch mới từ `main`, ví dụ `content/huong-dan-referral`.
2. Mở đúng thư mục nhóm người đọc. Ví dụ, bài cho Đại sứ xanh nằm trong `docs/dai-su-xanh/`.
3. Sao chép `docs/_templates/huong-dan.mdx`, đổi tên file theo nội dung không dấu và dùng dấu gạch ngang, ví dụ `cach-gioi-thieu-khach-hang.mdx`.
4. Sửa phần đầu bài: `title`, `description`, `sidebar_position`. Số `sidebar_position` nhỏ hơn sẽ đứng trước trong menu cùng cấp.
5. Nếu tạo nhóm chủ đề mới, tạo thư mục mới cùng file `_category_.json`; dùng `position` để xếp thứ tự nhóm đó trong cột trái.
6. Thêm ảnh vào `static/img/`, đặt tên chữ thường không dấu/không khoảng trắng. Trong bài, chèn theo mẫu: `![Mô tả ảnh](/img/ten-anh.png)`.
7. Commit thay đổi vào branch, sau đó mở Pull Request để kiểm tra trước khi đưa lên website.

Không đưa password, OTP, token, API key, dữ liệu khách hàng hay ảnh chụp chưa che thông tin cá nhân lên GitHub public.

## Quy trình duyệt Pull Request

1. Người viết tạo Pull Request từ branch nội dung vào `main`.
2. Người duyệt mở tab **Files changed**, kiểm tra câu chữ, ảnh, đường link và vị trí menu.
3. Chờ GitHub Actions `build-and-test` đạt. Nếu báo đỏ, không merge; mở phần `Checks` để xem bài hoặc link nào lỗi.
4. Với nội dung về chính sách, hoa hồng, quyền lợi, điều kiện hợp tác hoặc kỹ thuật, cần một người quản trị khác review trước khi merge.
5. Sau khi merge vào `main`, GitHub Pages tự build và cập nhật website public.

## Chạy website tại máy

Yêu cầu Node.js 22 hoặc mới hơn.

```bash
npm ci
npm run start
```

Trước khi mở Pull Request, chạy:

```bash
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

`npm run build` kiểm tra đặc biệt quan trọng: nó báo link hỏng, trang trùng URL và lỗi MDX trước khi website public bị ảnh hưởng.

## Quyết định giao diện

- [2026-08-13 — Lề trang và vị trí tên website](planning/specs/2026-08-13-antsomi-layout-and-identity.md): khung desktop căn giữa, ba cột thoáng hơn; tên đầy đủ nằm ở đầu nội dung thay vì cạnh menu.
- [2026-08-13 — Kế hoạch triển khai lề Antsomi](planning/plans/2026-08-13-antsomi-gutters-and-header-identity.md): kiểm tra và thay đổi theme cho shell tài liệu.
- [2026-08-14 — Kế hoạch triển khai nội dung Đại sứ xanh](planning/plans/2026-08-14-dai-su-xanh-content-architecture.md): tạo menu hai cấp, trang chủ đề, bài viết “Đang cập nhật” và chuyển hướng link cũ.
- [2026-08-14 — Cấu trúc nội dung Đại sứ xanh](planning/specs/2026-08-14-dai-su-xanh-content-architecture-design.md): menu hai cấp, danh mục bài viết và quy ước sử dụng trạng thái “Đang cập nhật”.

## GitHub Pages và custom domain

Website hiện tại: `https://hotro.datuniversal.com`

GitHub Pages tự deploy khi branch `main` thay đổi. Custom domain hiện tại là `hotro.datuniversal.com`.
