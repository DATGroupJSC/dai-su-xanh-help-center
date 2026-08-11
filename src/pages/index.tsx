import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';
import {RegistrationCta} from '@site/src/components/RegistrationCta';
import {quickActions, readSiteLinks} from '@site/src/data/site';
import styles from './index.module.css';

export default function HomePage() {
  const {siteConfig} = useDocusaurusContext();
  const {registrationUrl} = readSiteLinks(siteConfig.customFields);

  return (
    <Layout
      title="Trung tâm hỗ trợ"
      description="Hướng dẫn tự phục vụ dành cho Đại sứ xanh và người đang tìm hiểu chương trình.">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>TRUNG TÂM HỖ TRỢ ĐẠI SỨ XANH</p>
            <h1>Bạn cần hỗ trợ nội dung gì?</h1>
            <p className={styles.lead}>
              Tìm câu trả lời nhanh, làm đúng từng bước và chỉ liên hệ đội hỗ
              trợ khi thật sự cần.
            </p>
            <div className={styles.search} aria-label="Tìm kiếm hướng dẫn">
              <SearchBar />
            </div>
            <RegistrationCta
              href={registrationUrl}
              className="button button--primary button--lg">
              Đăng ký Đại sứ xanh
            </RegistrationCta>
          </div>
        </section>

        <section className={styles.actions} aria-labelledby="quick-actions">
          <div className="container">
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>BẮT ĐẦU TỪ ĐÂY</p>
              <h2 id="quick-actions">Chọn việc bạn muốn thực hiện</h2>
            </div>
            <div className={styles.actionGrid}>
              {quickActions.map((action, index) => (
                <Link className={styles.actionCard} key={action.title} to={action.to}>
                  <span className={styles.actionNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                  <span className={styles.actionLink}>Xem hướng dẫn →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.recruit} aria-labelledby="recruit-title">
          <div className={`container ${styles.recruitInner}`}>
            <div>
              <p className={styles.eyebrow}>DÀNH CHO NGƯỜI MỚI</p>
              <h2 id="recruit-title">Bạn chưa là Đại sứ xanh?</h2>
              <p>
                Tìm hiểu vai trò, cách chương trình vận hành và những điều cần
                chuẩn bị trước khi đăng ký.
              </p>
            </div>
            <div className={styles.recruitActions}>
              <Link
                className="button button--secondary button--lg"
                to="/huong-dan/bat-dau/dai-su-xanh-la-gi">
                Tìm hiểu chương trình
              </Link>
              <RegistrationCta
                href={registrationUrl}
                className="button button--primary button--lg">
                Đăng ký Đại sứ xanh
              </RegistrationCta>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
