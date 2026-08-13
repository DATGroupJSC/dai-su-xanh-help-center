import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {audienceHubs} from '@site/src/data/site';
import styles from './index.module.css';

export default function HomePage() {
  return (
    <Layout
      title="Trung tâm hỗ trợ DAT Universal"
      description="Hướng dẫn dành cho Đại sứ xanh, Nhà lắp đặt và Khách hàng.">
      <main>
        <section className={styles.intro}>
          <div className="container">
            <p className={styles.eyebrow}>DAT UNIVERSAL</p>
            <h1>Trung tâm hỗ trợ DAT Universal</h1>
            <p className={styles.lead}>
              Hướng dẫn dành cho Đại sứ xanh, Nhà lắp đặt và Khách hàng.
            </p>
          </div>
        </section>

        <section className={styles.audiences} aria-labelledby="audience-title">
          <div className="container">
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>BẮT ĐẦU TỪ ĐÂY</p>
              <h2 id="audience-title">Chọn nhóm của bạn</h2>
            </div>

            <div className={styles.audienceGrid}>
              {audienceHubs.map((hub) => (
                <Link className={styles.audienceCard} key={hub.title} to={hub.to}>
                  <span className={styles.status}>{hub.status}</span>
                  <h3>{hub.title}</h3>
                  <p>{hub.description}</p>
                  <span className={styles.audienceLink}>Xem hướng dẫn →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
