import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Trung tâm hỗ trợ Đại sứ xanh',
  tagline: 'Tự tìm hướng dẫn, làm đúng việc, nhận hỗ trợ khi cần.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://dai-su-xanh-help-center.pages.dev',
  baseUrl: '/',
  organizationName: 'dat',
  projectName: 'dai-su-xanh-help-center',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'huong-dan',
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@cmfcmf/docusaurus-search-local',
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        indexDocSidebarParentCategories: 1,
        includeParentCategoriesInPageTitle: true,
        language: 'vi',
        maxSearchResults: 8,
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Đại sứ xanh',
      items: [
        {
          to: '/huong-dan/bat-dau/dai-su-xanh-la-gi',
          label: 'Hướng dẫn',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Bắt đầu',
          items: [
            {
              label: 'Trung tâm hỗ trợ',
              to: '/huong-dan/bat-dau/dai-su-xanh-la-gi',
            },
          ],
        },
      ],
      copyright: 'Copyright © DAT.',
    },
  } satisfies Preset.ThemeConfig,
  customFields: {
    registrationUrl: '',
    supportUrl: '',
  },
};

export default config;

