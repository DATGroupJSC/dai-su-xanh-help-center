import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {describe, expect, it} from 'vitest';
import config from '../../docusaurus.config';

describe('DAT Group navbar logo', () => {
  it('uses the approved DAT Group SVG with accessible text', () => {
    const navbar = config.themeConfig?.navbar as
      | {logo?: {alt?: string; src?: string}}
      | undefined;

    expect(navbar?.logo).toMatchObject({
      alt: 'DAT Group',
      src: 'img/logo_DAT_Group.svg',
    });
  });

  it('ships the approved blue-orange SVG as a public asset', () => {
    const logoPath = join(
      process.cwd(),
      'static',
      'img',
      'logo_DAT_Group.svg',
    );

    expect(existsSync(logoPath)).toBe(true);
    const svg = readFileSync(logoPath, 'utf8');
    expect(svg).toContain('#0082CA');
    expect(svg).toContain('#FF8300');
  });
});
