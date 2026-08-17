# Footer DAT Corporate — Thiết kế

## Mục tiêu

Thay footer mặc định của Trung tâm hỗ trợ DAT Universal bằng footer DAT Group theo nội dung công khai trong ảnh người dùng cung cấp ngày 2026-08-17. Footer giúp người đọc nhận diện đơn vị vận hành và thấy thông tin liên hệ chính thức ở mọi trang.

## Phạm vi đã chốt

- Thay favicon bằng file nguồn do người dùng cung cấp: `D:/MyWorkspace/02_DAT_Work/00_Inbox/favicon.DujayeFC.png`.
- Footer nền DAT blue deep gồm nhận diện DAT Group; ba nhóm “Về DAT Group”, “Dịch vụ”, “Chính sách”; ba địa điểm liên hệ TP.HCM, Hà Nội, Cần Thơ; và dòng “© DAT Group | Established 2006 | All Rights Reserved.”
- Dùng layout nhiều cột ở desktop; tự xếp dọc, dễ đọc ở điện thoại.
- Các phần tử tương tác có trạng thái focus rõ ràng.

## Quy ước an toàn nội dung

Ảnh chỉ xác nhận nhãn hiển thị, không xác nhận URL đích của các mục “Về DAT Group”, dịch vụ, chính sách, mạng xã hội hoặc chứng nhận. Phiên bản này chỉ render các mục đó dưới dạng nội dung thông tin, không tự tạo link ngoài, link mạng xã hội hay ảnh chứng nhận. `tel:` và `mailto:` chỉ áp dụng cho số/email xuất hiện công khai trong ảnh.

## Kiến trúc

- `src/theme/Footer/index.tsx`: swizzle tối thiểu của Footer Docusaurus.
- `src/components/DatCorporateFooter/index.tsx`: dữ liệu public và markup footer có semantic `<address>`.
- `src/css/custom.css`: stylesheet scoped `dat-corporate-footer`, gồm desktop/mobile, typography và focus.
- `docusaurus.config.ts`: trỏ favicon PNG mới.
- `tests/e2e/help-center.spec.ts`: kiểm tra nội dung liên hệ, bản quyền, favicon và không overflow mobile.

## Tiêu chí chấp nhận

1. Mọi trang hiển thị footer DAT Group với ba địa điểm và dòng bản quyền.
2. Favicon trỏ đến PNG người dùng cung cấp.
3. Không có URL ngoài, hotline, chính sách hoặc mạng xã hội nào được bịa thêm.
4. Ở viewport 390px, footer không tạo horizontal overflow và thứ tự nội dung vẫn đọc được.
