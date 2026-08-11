# Trung tâm hỗ trợ Đại sứ xanh

Website public giúp Đại sứ xanh tự tra cứu hướng dẫn và giúp người chưa tham gia tìm hiểu chương trình. Source dùng Docusaurus 3, nội dung nghiệp vụ viết bằng Markdown/MDX.

## Trạng thái phát hành

Bản hiện tại là pre-launch. CTA đăng ký và link hỗ trợ tự ẩn hoặc chuyển về hướng dẫn nội bộ khi chưa có URL chính thức. Không publish production trước khi đủ ba điều kiện:

1. Có ít nhất một bài nghiệp vụ được content owner và approver duyệt.
2. Có URL đăng ký Đại sứ xanh chính thức.
3. Có kênh hỗ trợ chính thức dành cho Đại sứ xanh.

Không tự điền URL tạm, mức hoa hồng, điều kiện quyền lợi hoặc SLA chưa được owner xác nhận.

## Chạy website tại máy

Yêu cầu Node.js 22.

```bash
npm ci
npm run start
```

Local search được tạo trong production build. Để kiểm tra đầy đủ:

```bash
npm run build
npm run serve
```

## Quy trình thêm hoặc sửa bài

1. Tạo branch mới từ `main`, ví dụ `content/huong-dan-referral`.
2. Sao chép `docs/_templates/huong-dan.mdx` vào đúng category và đổi tên file theo nội dung.
3. Viết theo một nhiệm vụ cụ thể; ưu tiên câu ngắn, từng bước và kết quả mong đợi.
4. Mở Pull Request, điền đủ source nội bộ, content owner, approver và ngày kiểm chứng trong PR.
5. Kiểm tra preview desktop/mobile và chờ CI `build-and-test` pass.
6. Quản trị viên thứ hai review trước khi merge nội dung chính sách, hoa hồng, quyền lợi hoặc cấp bậc.

Source nội bộ chỉ ghi trong Pull Request có giới hạn quyền truy cập; không chép đường dẫn hoặc dữ liệu nhạy cảm vào nội dung public.

## Quality gate

Chạy trước khi mở Pull Request:

```bash
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

CI trên GitHub chạy lại bốn bước này bằng Node.js 22 và Chromium. Bảo vệ branch `main` với Pull Request bắt buộc, tối thiểu một approval và status check `build-and-test`.

Dependabot kiểm tra npm dependencies hằng tuần. Review advisory và test bản nâng cấp qua Pull Request; không dùng `npm audit fix --force` nếu chưa đánh giá breaking change.

## Cấu hình release

Sau khi DAT duyệt URL, cập nhật `docusaurus.config.ts`:

```ts
url: 'https://domain-huong-dan-da-duyet-cua-dat',
customFields: {
  registrationUrl: 'https://url-dang-ky-da-duyet-cua-dat',
  supportUrl: 'https://kenh-ho-tro-da-duyet-cua-dat',
},
```

`registrationUrl` rỗng thì CTA đăng ký không render. `supportUrl` rỗng thì cuối bài dẫn về hướng dẫn hỗ trợ trong website.

## Cloudflare Pages

Khi repository GitHub đã sẵn sàng, import repository vào Cloudflare Pages với:

- Production branch: `main`
- Framework preset: `Docusaurus`
- Build command: `npm run build`
- Build output directory: `build`
- Node.js version: `22`

Cloudflare tạo preview cho Pull Request và deploy production khi `main` thay đổi. Sau deploy phải smoke test homepage, bốn quick actions, search, sidebar trái, mục lục phải, menu mobile, 404, CTA đăng ký và link hỗ trợ.

## An toàn nội dung

Không commit dữ liệu cá nhân, hồ sơ khách hàng, password, OTP, token hoặc API key. Không dùng ảnh chụp chứa thông tin thật nếu chưa che dữ liệu và xác nhận quyền công khai.
