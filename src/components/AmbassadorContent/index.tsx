import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  ambassadorArticlePath,
  findAmbassadorTopic,
  type AmbassadorArticleKind,
} from '@site/src/data/ambassadorContent';

const kindLabels: Record<AmbassadorArticleKind, string> = {
  guide: 'Hướng dẫn',
  video: 'Video',
  document: 'Tài liệu',
};

export function AmbassadorTopicCards({topicId}: {topicId: string}) {
  const topic = findAmbassadorTopic(topicId);
  if (!topic) {
    throw new Error(`Unknown Đại sứ xanh topic: ${topicId}`);
  }

  if (topic.articles.length === 0) {
    return <UpdatingArticle />;
  }

  return (
    <section className="ambassador-topic-cards" aria-label="Bài viết trong chủ đề">
      <p className="ambassador-topic-cards__intro">
        Chọn bài viết bạn cần. Nội dung chi tiết đang được DAT Universal cập nhật.
      </p>
      <div className="ambassador-topic-cards__grid">
        {topic.articles.map((article) => (
          <Link
            className="ambassador-topic-card"
            key={article.id}
            to={ambassadorArticlePath(topic, article)}
          >
            <span className="ambassador-topic-card__kind">
              {kindLabels[article.kind]}
            </span>
            <h2>{article.title}</h2>
            <span className="ambassador-topic-card__status">Đang cập nhật</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function UpdatingArticle({
  kind = 'guide',
}: {
  kind?: AmbassadorArticleKind;
}) {
  return (
    <section className="ambassador-updating" data-content-kind={kind}>
      {kind === 'video' && (
        <div className="ambassador-video-placeholder">
          Video đang cập nhật
        </div>
      )}
      <h2>Nội dung đang cập nhật</h2>
      <p>DAT Universal đang cập nhật nội dung chính thức cho mục này.</p>
    </section>
  );
}

export function SampleArticle({
  kind,
}: {
  kind: AmbassadorArticleKind;
}) {
  const sampleImage = useBaseUrl('img/sample-guide-illustration.svg');
  const videoDescription =
    kind === 'video'
      ? 'Đây là vị trí dành cho video của bài viết này.'
      : 'Đây là ví dụ về vị trí nhúng video trong một bài hướng dẫn.';

  return (
    <section className="ambassador-sample-article">
      <p className="ambassador-sample-article__notice">
        <strong>Nội dung minh hoạ</strong> — thay bằng nội dung chính thức khi
        được duyệt.
      </p>
      <p>
        Đây là đoạn <strong>chữ đậm</strong> và <em>chữ nghiêng</em> để minh
        hoạ cách trình bày.
      </p>
      <h2>Các bước minh hoạ</h2>
      <ol>
        <li>Chuẩn bị thông tin cần thiết.</li>
        <li>Thực hiện thao tác theo hướng dẫn.</li>
        <li>Kiểm tra kết quả hiển thị.</li>
      </ol>
      <h3>Lưu ý khi thực hiện</h3>
      <ul>
        <li>Chỉ dùng thông tin đã được duyệt để xuất bản.</li>
        <li>Không đưa dữ liệu khách hàng vào bài public.</li>
      </ul>
      <img
        src={sampleImage}
        alt="Hình minh hoạ bố cục một bài hướng dẫn DAT"
      />
      <blockquote>
        Thay phần minh hoạ này bằng nội dung chính thức sau khi content owner
        xác nhận.
      </blockquote>
      <table>
        <thead>
          <tr>
            <th>Hạng mục</th>
            <th>Ví dụ trình bày</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Trạng thái</td>
            <td>Nội dung mẫu</td>
          </tr>
          <tr>
            <td>Nguồn</td>
            <td>Chờ phê duyệt</td>
          </tr>
        </tbody>
      </table>
      <figure className="ambassador-sample-video" aria-label="Khung Video mẫu">
        <div className="ambassador-sample-video__screen" aria-hidden="true">
          ▶
        </div>
        <figcaption>
          <strong>Video mẫu</strong>
          <br />
          {videoDescription}
        </figcaption>
      </figure>
    </section>
  );
}
