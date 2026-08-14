import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Trung tâm hỗ trợ DAT Universal',
  tagline: 'Hướng dẫn dành cho Đại sứ xanh, Nhà lắp đặt và Khách hàng.',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  url: 'https://hotro.datuniversal.com',
  baseUrl: '/',
  organizationName: 'DATGroupJSC',
  projectName: 'dat-universal-help-center',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onDuplicateRoutes: 'throw',
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
          sidebarItemsGenerator: async ({
            defaultSidebarItemsGenerator,
            ...generatorArgs
          }) => {
            const items = await defaultSidebarItemsGenerator(generatorArgs);

            return items.map((item) => {
              if (item.type !== 'category') {
                return item;
              }

              return {
                ...item,
                collapsible: item.items.length > 0,
                collapsed: false,
                items: item.items.map((child) =>
                  child.type !== 'category'
                    ? child
                    : {
                        ...child,
                        collapsible: child.items.length > 0,
                        collapsed: true,
                      },
                ),
              };
            });
          },
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
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi',
            from: '/huong-dan/bat-dau/dai-su-xanh-la-gi',
          },
          {
            to: '/huong-dan/dai-su-xanh/bat-dau',
            from: '/huong-dan/bat-dau',
          },
          {
            to: '/huong-dan/dai-su-xanh/gioi-thieu-khach-hang',
            from: '/huong-dan/gioi-thieu-khach-hang',
          },
          {
            to: '/huong-dan/dai-su-xanh/gioi-thieu-khach-hang/tong-quan',
            from: '/huong-dan/gioi-thieu-khach-hang/tong-quan',
          },
          {
            to: '/huong-dan/dai-su-xanh/referral-hoa-hong',
            from: '/huong-dan/referral-hoa-hong',
          },
          {
            to: '/huong-dan/dai-su-xanh/referral-hoa-hong/tong-quan',
            from: '/huong-dan/referral-hoa-hong/tong-quan',
          },
          {
            to: '/huong-dan/dai-su-xanh/chinh-sach-tai-nguyen',
            from: '/huong-dan/chinh-sach-tai-nguyen',
          },
          {
            to: '/huong-dan/dai-su-xanh/chinh-sach-tai-nguyen/tong-quan',
            from: '/huong-dan/chinh-sach-tai-nguyen/tong-quan',
          },
        ],
      },
    ],
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
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: 'DAT Group',
        src: 'img/logo_DAT_Group.svg',
      },
      items: [
        {
          to: '/',
          label: 'Trang chủ',
          position: 'left',
        },
        {
          to: '/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi',
          label: 'Đại sứ xanh',
          position: 'left',
        },
        {
          to: '/huong-dan/nha-lap-dat/bat-dau-hop-tac',
          label: 'Nhà lắp đặt',
          position: 'left',
        },
        {
          to: '/huong-dan/khach-hang/tim-hieu-giai-phap',
          label: 'Khách hàng cuối',
          position: 'left',
        },
        {
          to: '/huong-dan/ho-tro/su-dung-trung-tam-ho-tro',
          label: 'Hỗ trợ',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Trung tâm hỗ trợ',
          items: [
            {
              label: 'Trang chủ',
              to: '/',
            },
            {
              label: 'Đại sứ xanh',
              to: '/huong-dan/dai-su-xanh/bat-dau/dai-su-xanh-la-gi',
            },
            {
              label: 'Nhà lắp đặt',
              to: '/huong-dan/nha-lap-dat/bat-dau-hop-tac',
            },
            {
              label: 'Khách hàng cuối',
              to: '/huong-dan/khach-hang/tim-hieu-giai-phap',
            },
            {
              label: 'Hỗ trợ chung',
              to: '/huong-dan/ho-tro/su-dung-trung-tam-ho-tro',
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
