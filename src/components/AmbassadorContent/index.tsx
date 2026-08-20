import Link from '@docusaurus/Link';
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
        Chọn bài viết bạn cần. Trạng thái của từng bài viết được hiển thị ngay trên thẻ.
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
            <span className="ambassador-topic-card__status">
              {article.status === 'published' ? 'Đã xuất bản' : 'Coming soon'}
            </span>
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
          Video Coming soon
        </div>
      )}
      <h2>Coming soon</h2>
      <p>DAT Universal đang cập nhật nội dung chính thức cho mục này.</p>
    </section>
  );
}

export function SampleArticle({
  kind,
}: {
  kind: AmbassadorArticleKind;
}) {
  return <UpdatingArticle kind={kind} />;
}
