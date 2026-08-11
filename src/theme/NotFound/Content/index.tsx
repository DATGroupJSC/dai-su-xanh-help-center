import Link from '@docusaurus/Link';
import clsx from 'clsx';
import type {ReactNode} from 'react';
import type {Props} from '@theme/NotFound/Content';

export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <main className={clsx('not-found-page container', className)}>
      <p className="not-found-page__code">404</p>
      <h1>Không tìm thấy trang này</h1>
      <p>
        Đường dẫn có thể đã thay đổi. Hãy quay lại trang chủ hoặc bắt đầu từ
        mục hỗ trợ.
      </p>
      <div className="not-found-page__actions">
        <Link className="button button--primary button--lg" to="/">
          Về trang chủ
        </Link>
        <Link
          className="button button--secondary button--lg"
          to="/huong-dan/ho-tro/su-dung-trung-tam-ho-tro">
          Xem mục Hỗ trợ
        </Link>
      </div>
    </main>
  );
}
