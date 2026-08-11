import type {PropsWithChildren} from 'react';

type RegistrationCtaProps = PropsWithChildren<{
  href: string;
  className?: string;
}>;

export function RegistrationCta({
  href,
  className = '',
  children = 'Đăng ký Đại sứ xanh',
}: RegistrationCtaProps) {
  if (!href) {
    return null;
  }

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
