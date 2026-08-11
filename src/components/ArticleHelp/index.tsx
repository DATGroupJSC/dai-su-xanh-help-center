import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {readSiteLinks} from '@site/src/data/site';

type ArticleHelpProps = {
  supportUrl: string;
};

export function ArticleHelp({supportUrl}: ArticleHelpProps) {
  if (supportUrl) {
    return (
      <section className="article-help" aria-label="Cần thêm hỗ trợ">
        <h2>Cần thêm hỗ trợ?</h2>
        <p>Hãy gửi yêu cầu qua kênh hỗ trợ chính thức của DAT.</p>
        <a href={supportUrl} target="_blank" rel="noreferrer">
          Gửi yêu cầu hỗ trợ
        </a>
      </section>
    );
  }

  return (
    <section className="article-help" aria-label="Cần thêm hỗ trợ">
      <h2>Cần thêm hỗ trợ?</h2>
      <p>
        Hãy đọc hướng dẫn xử lý vấn đề thường gặp trước khi liên hệ đội hỗ
        trợ.
      </p>
      <Link to="/huong-dan/ho-tro/su-dung-trung-tam-ho-tro">
        Xem cách nhận hỗ trợ
      </Link>
    </section>
  );
}

export function ConfiguredArticleHelp() {
  const {siteConfig} = useDocusaurusContext();
  const {supportUrl} = readSiteLinks(siteConfig.customFields);

  return <ArticleHelp supportUrl={supportUrl} />;
}
