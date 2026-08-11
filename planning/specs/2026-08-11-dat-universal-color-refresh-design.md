# DAT Universal Color Refresh — Design Specification

**Ngày:** 11/08/2026  
**Trạng thái:** Design đã được user duyệt; chờ review spec trước implementation plan  
**Phạm vi:** Help Center Đại sứ xanh  
**Reference:** https://datuniversal.com/doi-tac-lap-dat?datid=yj25ix

## 1. Mục tiêu

Điều chỉnh hệ màu của Help Center theo nhận diện đang xuất hiện trên DAT Universal, giúp người dùng cảm nhận đây là một phần của cùng hệ sinh thái. Thay đổi chỉ tác động visual system; không thay đổi sitemap, nội dung, cấu trúc ba cột, search flow hoặc CTA logic.

Hướng được chọn là **DAT trực diện**: xanh DAT xuất hiện mạnh ở navbar và hero; cam là màu hành động; các trang đọc tài liệu vẫn giữ nền sáng để tránh mỏi mắt.

## 2. Nguồn và giới hạn tham chiếu

Reference được kiểm tra trực quan ngày 11/08/2026. Các màu CSS chính quan sát được trên trang:

- `--primary`: HSL `201 100% 39%`, tương đương `#0081C7`.
- `--secondary`: HSL `31 100% 50%`, tương đương `#FF8400`.
- Heading chính dùng `rgb(0, 129, 199)`.
- Heading phụ dùng `rgb(255, 132, 0)`.

Help Center chỉ kế thừa hướng màu và cảm giác thương hiệu. Không sao chép hình ảnh hero, nội dung marketing, cấu trúc landing page hoặc asset chưa được cung cấp quyền sử dụng.

## 3. Design tokens

| Token | Giá trị | Vai trò |
| --- | --- | --- |
| `--dat-blue` | `#0081C7` | Primary brand, link, active state |
| `--dat-blue-dark` | `#006DA8` | Navbar, đầu gradient, hover |
| `--dat-blue-deep` | `#004F7A` | Heading trên nền sáng, focus contrast |
| `--dat-cyan` | `#00D5DF` | Eyebrow hoặc decorative highlight trên nền xanh |
| `--dat-orange` | `#FF8400` | CTA chính, số thứ tự, điểm nhấn hành động |
| `--dat-orange-dark` | `#D96800` | Hover/focus của CTA cam |
| `--dat-sky-50` | `#EAF8FF` | Nền xanh rất nhạt, active background |
| `--dat-border` | `#D5E6EF` | Border card, sidebar và search |
| `--dat-text` | `#17212B` | Nội dung chính trên nền sáng |
| `--dat-muted` | `#5B6D78` | Nội dung phụ |

Infima primary scale sẽ được ánh xạ từ `--dat-blue`. Các component không được khai báo màu xanh/cam rời rạc nếu đã có token tương ứng.

## 4. Áp dụng theo bề mặt

### 4.1 Navbar

- Navbar dùng nền `--dat-blue-dark`.
- Brand và navigation dùng chữ trắng hoặc xanh trắng có contrast đạt chuẩn.
- Search ở navbar dùng nền trắng.
- Color mode toggle bị loại bỏ vì website chuyển sang light-only.
- Nếu CTA đăng ký hoặc đăng nhập được bổ sung sau này, CTA dùng màu cam; không render khi URL chưa được duyệt.

### 4.2 Homepage hero

- Hero dùng gradient từ `--dat-blue-dark` sang `--dat-blue`.
- Heading màu trắng; eyebrow dùng `--dat-cyan`; body copy dùng xanh trắng nhạt.
- Search box nền trắng, border trong suốt hoặc xanh nhạt, shadow xanh đậm ở mức nhẹ.
- CTA đăng ký dùng `--dat-orange`; CTA chỉ xuất hiện theo fail-closed logic hiện tại.

### 4.3 Quick actions

- Section nền trắng hoặc xanh rất nhạt.
- Card nền trắng, border `--dat-border`.
- Tiêu đề và link dùng xanh DAT; số thứ tự dùng cam.
- Hover tăng border xanh và shadow; không đổi layout hoặc kích thước card.

### 4.4 Khối kêu gọi người mới

- Nền xanh DAT đậm thay cho xanh lá hiện tại.
- Eyebrow dùng cyan; CTA chính dùng cam; CTA phụ có nền trắng hoặc transparent có border trắng.

### 4.5 Trang docs ba cột

- Content canvas giữ nền trắng và chữ `--dat-text`.
- Sidebar nền trắng hoặc `--dat-sky-50`; item active có nền xanh nhạt, chữ xanh đậm và indicator cam.
- Link, breadcrumb và heading anchor dùng xanh DAT.
- Table of contents bên phải giữ nền trắng; item active dùng xanh DAT.
- Khối “Cần thêm hỗ trợ” dùng nền xanh rất nhạt, border xanh và link xanh; cam chỉ dành cho hành động quan trọng.

### 4.6 Trang 404 và footer

- 404 dùng heading xanh đậm, mã `404` màu cam và CTA chính cam.
- Footer dùng xanh DAT đậm thay cho neutral dark mặc định.

## 5. Light-only behavior

- Docusaurus không còn tự chuyển theme theo hệ điều hành.
- Navbar không hiển thị color mode toggle.
- Không duy trì một bộ token dark riêng.
- Site phải luôn render cùng palette light để đồng nhất với reference DAT Universal.

## 6. Accessibility và responsive

- Body text và heading phải đạt WCAG AA trên background tương ứng.
- Chữ trắng chỉ dùng trên xanh đủ đậm; không dùng cyan hoặc cam làm body text dài.
- Focus ring phải nhìn thấy rõ, ưu tiên `--dat-orange` trên nền xanh và `--dat-blue` trên nền trắng.
- Hover không được là tín hiệu duy nhất; active/focus phải có border, underline hoặc background.
- Mobile 390px không tràn ngang; navbar, search, sidebar và CTA giữ hành vi responsive hiện tại.

## 7. Phạm vi code dự kiến

- Cập nhật color mode config trong `docusaurus.config.ts`.
- Thay design tokens và shared styles trong `src/css/custom.css`.
- Cập nhật homepage palette trong `src/pages/index.module.css`.
- Chỉ sửa component khi cần thêm class/state để đạt design; không thay data flow.
- Cập nhật E2E assertion cho light-only và giữ nguyên các test self-service, docs ba cột, mobile, 404.

## 8. Không nằm trong phạm vi

- Không thay logo hoặc dùng hình ảnh từ landing page reference.
- Không thay đổi content taxonomy, sidebar structure hoặc URL.
- Không thêm animation lớn, video, carousel hoặc marketing sections.
- Không cấu hình URL đăng ký hoặc support khi chưa được DAT duyệt.
- Không thay đổi chính sách, hoa hồng, cấp bậc hoặc nội dung nghiệp vụ.

## 9. Tiêu chí nghiệm thu

1. Homepage thể hiện rõ xanh DAT và CTA cam theo hướng DAT trực diện.
2. Navbar và hero dùng hệ màu mới; không còn toggle dark mode.
3. Docs vẫn dễ đọc, có đủ sidebar trái, nội dung giữa và mục lục phải.
4. CTA fail-closed tiếp tục hoạt động khi URL đăng ký rỗng.
5. Search, 404, desktop và mobile không bị regression.
6. Unit tests, TypeScript, production build và Playwright E2E đều pass.
7. Visual QA xác nhận không có console error và không có contrast/overflow rõ ràng.

## 10. Quyết định đã chốt

- User chọn phương án **B — DAT trực diện**.
- User chọn **light-only**, bỏ dark mode.
- Layout, nội dung và cấu trúc Help Center được giữ nguyên.
