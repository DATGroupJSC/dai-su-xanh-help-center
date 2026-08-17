import useBaseUrl from '@docusaurus/useBaseUrl';
import type {ReactNode} from 'react';

type FooterColumn = {
  title: string;
  items: string[];
};

type ContactLocation = {
  title: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
};

const footerColumns: FooterColumn[] = [
  {
    title: 'Về DAT Group',
    items: [
      'Về chúng tôi',
      'Liên hệ',
      'Tuyển dụng',
      'Trở thành đối tác lắp đặt',
      'Trở thành đại sứ xanh DAT',
      'Điện mặt trời hộ gia đình',
      'Kiến thức',
      'Dự án tiêu biểu',
    ],
  },
  {
    title: 'Dịch vụ',
    items: [
      'Điện mặt trời áp mái',
      'Điện mặt trời hộ gia đình',
      'Điện mặt trời hòa lưới',
      'Điện mặt trời lưu trữ',
      'Điện mặt trời hòa lưới không lưu trữ',
      'Điện mặt trời hòa lưới có lưu trữ',
      'Thương hiệu cùng hệ thống',
      'DAT Solar',
      'DAT Technology',
    ],
  },
  {
    title: 'Chính sách',
    items: [
      'Chính sách thanh toán',
      'Chính sách đổi trả hàng',
      'Chính sách bảo hành',
      'Chính sách bảo mật',
      'Chính sách giao hàng',
    ],
  },
];

const contactLocations: ContactLocation[] = [
  {
    title: 'Trụ sở chính - TP.HCM',
    address: '12 Đông Hưng Thuận 10, Phường Đông Hưng Thuận, Hồ Chí Minh',
    phone: '(+84) 283 715 7567',
    phoneHref: 'tel:+842837157567',
    email: 'info@datgroup.com.vn',
  },
  {
    title: 'Chi nhánh Hà Nội',
    address: 'Lô 05-10A, KCN Hoàng Mai, Hoàng Mai, Hà Nội',
    phone: '(+84) 243 252 5000',
    phoneHref: 'tel:+842432525000',
    email: 'info@datgroup.com.vn',
  },
  {
    title: 'Chi nhánh Cần Thơ',
    address: '45-47 Bùi Quang Trinh, Hưng Phú, TP. Cần Thơ',
    phone: '(+84) 292 3917137',
    phoneHref: 'tel:+842923917137',
    email: 'info@datgroup.com.vn',
  },
];

function FooterColumnList({title, items}: FooterColumn): ReactNode {
  return (
    <section className="dat-corporate-footer__column" aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li
            className={
              item === 'Thương hiệu cùng hệ thống'
                ? 'dat-corporate-footer__subheading'
                : undefined
            }
            key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ContactLocationCard({
  title,
  address,
  phone,
  phoneHref,
  email,
}: ContactLocation): ReactNode {
  return (
    <address className="dat-corporate-footer__contact">
      <h2>{title}</h2>
      <p>{address}</p>
      <p>
        <a href={phoneHref}>{phone}</a>
      </p>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </address>
  );
}

export default function DatCorporateFooter(): ReactNode {
  const logoSrc = useBaseUrl('/img/logo_DAT_Group.svg');

  return (
    <footer className="footer footer--dark dat-corporate-footer">
      <div className="container dat-corporate-footer__container">
        <div className="dat-corporate-footer__top">
          <section className="dat-corporate-footer__brand" aria-label="DAT Group">
            <img src={logoSrc} alt="DAT Group" />
            <p className="dat-corporate-footer__company-name">
              Công ty Cổ phần Tập đoàn DAT (DAT Group)
            </p>
            <p>Giải pháp tự động hóa và năng lượng tái tạo dẫn đầu</p>
          </section>

          {footerColumns.map((column) => (
            <FooterColumnList {...column} key={column.title} />
          ))}
        </div>

        <div className="dat-corporate-footer__contacts">
          {contactLocations.map((location) => (
            <ContactLocationCard {...location} key={location.title} />
          ))}
        </div>

        <p className="dat-corporate-footer__copyright">
          © DAT Group | Established 2006 | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
