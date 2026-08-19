# Publish Ambassador Source Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish every Đại sứ xanh article with a source in the spreadsheet's `Kết quả` column, preserving approved wording, text emphasis and supplied illustrations without duplicated document titles.

**Architecture:** Keep the current sidebar, frontmatter titles and article paths unchanged. Replace only the 19 corresponding MDX article bodies with source-faithful Markdown; map Word run formatting to Markdown emphasis; copy each approved source image to `static/img/ambassador/<article-slug>/`; and retain `<ConfiguredArticleHelp />` at the end of each detailed article. The Docusaurus `title` is the only page title, so the document title line is removed from the body.

**Tech Stack:** Docusaurus 3, MDX, Vitest, Playwright, Google Drive sources, GitHub Actions.

---

### Task 1: Prepare a source-to-article manifest

**Files:**
- Modify: `planning/plans/2026-08-19-publish-ambassador-source-batch.md`
- Verify: `docs/dai-su-xanh/**`

- [ ] Record the 19 approved spreadsheet results: 11 tabs in `20261408 - NỘI DUNG HỖ TRỢ DAT UNIVERSAL` and 8 linked Word guides.
- [ ] Map each source only to the existing matching MDX path, including the FAQ topic index.
- [ ] Exclude rows with no `Kết quả`, including `Lưu trữ`, `Catalogue`, `Brochure`, project, support, and policy rows without a source.

### Task 2: Add a failing source-batch test

**Files:**
- Modify: `tests/unit/ambassador-content.test.ts`

- [ ] Add a test that reads the 19 mapped MDX files and requires a `##` heading plus `<ConfiguredArticleHelp />`.
- [ ] Add an assertion that each `/img/ambassador/` path used by the batch resolves beneath `static/img/ambassador/`.
- [ ] Add an assertion for every imported Word guide that its all-caps source title is absent while its first meaningful heading remains.
- [ ] Run `npm run test -- ambassador-content` and confirm it fails before the corresponding source-fidelity update.

### Task 3: Publish the Google Docs sources

**Files:**
- Modify: `docs/dai-su-xanh/gia-nhap-he-sinh-thai/chao-mung-dai-su-xanh/khai-niem-va-gia-tri-nen-tang.mdx`
- Modify: `docs/dai-su-xanh/kien-thuc-giai-phap/tong-quan-giai-phap/{nguyen-ly-hoat-dong,loi-ich,thuat-ngu-co-ban}.mdx`
- Modify: `docs/dai-su-xanh/kien-thuc-giai-phap/giai-phap-theo-nhu-cau/{hoa-luoi,hybrid}.mdx`
- Modify: `docs/dai-su-xanh/trung-tam-ho-tro/cau-hoi-thuong-gap/index.mdx`
- Modify: `docs/dai-su-xanh/quy-uoc-hop-tac/quy-che-dai-su-xanh/{dieu-kien-tham-gia,vai-tro-dai-su,quy-tac-hoat-dong}.mdx`
- Create: `static/img/ambassador/*`

- [ ] Preserve each existing frontmatter title and sidebar path.
- [ ] Convert source headings, paragraphs, lists, notices and tables into native MDX without changing wording.
- [ ] Preserve source bold and italic runs as `**text**` and `*text*` respectively.
- [ ] Remove the document title that repeats the page `title`, but retain all lower-level source headings.
- [ ] Download only source illustrations embedded in the relevant Google Doc tab; reference them by a local `/img/ambassador/<article-slug>/...` path with meaningful Vietnamese alt text.

### Task 4: Publish the eight Word guide sources

**Files:**
- Modify: `docs/dai-su-xanh/gia-nhap-he-sinh-thai/chia-se-bai-viet-va-noi-dung/{cach-lay-hinh-anh-video,cach-chia-se-len-facebook-zalo,cach-lay-link-ca-nhan}.mdx`
- Modify: `docs/dai-su-xanh/gia-nhap-he-sinh-thai/tim-kiem-va-theo-doi-khach-hang/{tao-khach-hang,theo-doi-trang-thai,quan-ly-khach-hang,meo-tim-khach-hang}.mdx`
- Modify: `docs/dai-su-xanh/trung-tam-ho-tro/huong-dan-quan-ly-tai-khoan/thay-doi-thong-tin-tai-khoan.mdx`
- Create: `static/img/ambassador/*`

- [ ] Inspect each source Word document's heading hierarchy, run-level emphasis and embedded images before converting it.
- [ ] Retain the original instruction order and render each supplied screenshot locally beneath its corresponding step.
- [ ] Omit the single source document title that duplicates the web page title, while preserving all step headings, subheadings and notes.
- [ ] Do not publish credentials, OTP values, personal customer data, or temporary Google/Drive image URLs. If an embedded screenshot exposes them, stop that article and report it for source-owner redaction instead of uploading it.

### Task 5: Verify and submit

**Files:**
- Modify: `tests/unit/ambassador-content.test.ts`
- Verify: all changed MDX and `static/img/ambassador/*`

- [ ] Run `npm run test -- ambassador-content` and confirm the source-fidelity test passes.
- [ ] Run `npm run test`, `npm run typecheck`, `npm run build`, and the relevant Playwright rendering checks.
- [ ] Run `git diff --check`, commit the source batch, push `docs/publish-ambassador-source-batch`, and create one Pull Request.
