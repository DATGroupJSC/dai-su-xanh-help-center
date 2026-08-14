import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {describe, expect, it} from 'vitest';
import config from '../../docusaurus.config';

describe('GitHub Pages deployment', () => {
  it('targets the DAT Universal support subdomain at its root', () => {
    expect(config.url).toBe('https://hotro.datuniversal.com');
    expect(config.baseUrl).toBe('/');
    expect(config.organizationName).toBe('DATGroupJSC');
    expect(config.projectName).toBe('dat-universal-help-center');
    expect(config.trailingSlash).toBe(false);
  });

  it('deploys the Docusaurus build with the official GitHub Pages actions', () => {
    const workflow = readFileSync(
      join(process.cwd(), '.github', 'workflows', 'deploy-pages.yml'),
      'utf8',
    );

    expect(workflow).toContain('actions/configure-pages@v5');
    expect(workflow).toContain('actions/upload-pages-artifact@v4');
    expect(workflow).toContain('actions/deploy-pages@v4');
    expect(workflow).toContain('path: build');
  });
});
