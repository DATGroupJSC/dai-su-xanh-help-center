import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {RegistrationCta} from '../../src/components/RegistrationCta';

describe('RegistrationCta', () => {
  it('does not render a dead CTA when the approved URL is absent', () => {
    render(<RegistrationCta href="" />);

    expect(
      screen.queryByRole('link', {name: 'Đăng ký Đại sứ xanh'}),
    ).not.toBeInTheDocument();
  });

  it('renders a safe external registration link when the URL exists', () => {
    render(
      <RegistrationCta href="https://register.dat.example/dai-su-xanh" />,
    );

    const link = screen.getByRole('link', {name: 'Đăng ký Đại sứ xanh'});
    expect(link).toHaveAttribute(
      'href',
      'https://register.dat.example/dai-su-xanh',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
