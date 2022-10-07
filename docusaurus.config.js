// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Spacetime Docs',
  tagline: 'Spacetime is the decentralized storage, index and query protocol for structured data.',
  url: 'https://spacetime.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    'posthog-docusaurus'
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          breadcrumbs: false,
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'twitter',
        content:
          '<a class="twitter-announcement" target="_blank" rel="noopener noreferrer" href="https://twitter.com/spacetime_xyz"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg><span>Follow us on Twitter for updates</span></a>',
        backgroundColor: '#1d9bf0',
        textColor: '#fff',
        isCloseable: false,
      },
      navbar: {
        title: 'Spacetime Docs',
        logo: {
          alt: 'Spacetime Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://spacetime.xyz',
            label: 'Home',
            position: 'right',
          },
          {
            href: 'https://twitter.com/spacetime_xyz',
            label: 'Twitter',
            position: 'right',
          },
          {
            href: 'https://github.com/spacetimehq',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/spacetime_xyz',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/DrXkRpCFDX',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Spacetime`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      posthog: {
        apiKey: "phc_DBZY8MbRdRIIwSwX4ZSwTAjy5ogdQPDMVdPObOuQQf",
        // appUrl: "https://docs.spacetime.xyz",  // optional
        enableInDevelopment: false  // optional
      }
    }),
};

module.exports = config;
