import fs from 'node:fs';
import path from 'node:path';
import type { UrlWithStringQuery } from 'node:url';
import { pluginChangelog } from 'rspress-plugin-changelog';
import type { ChangelogPluginOptions } from 'rspress-plugin-changelog';
import { pluginFontOpenSans } from 'rspress-plugin-font-open-sans';
import pluginSitemap from 'rspress-plugin-sitemap';
import { defineConfig } from 'rspress/config';

const siteUrl = 'https://BiliUniverse.github.io';

const generateChangelogParams = (items: Omit<ChangelogPluginOptions['items'][number], 'type'>[]) =>
  items.map<ChangelogPluginOptions['items'][number]>((item) => ({
    type: 'github-releases',
    templatePath: './changelog.handlebars',
    ...item,
  }));

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'BiliUniverse',
  description: '哔哩哔哩功能优化及增强解决方案',
  icon: 'https://avatars.githubusercontent.com/u/129515498?s=200&v=4',
  logo: 'https://avatars.githubusercontent.com/u/129515498?s=80&v=4',
  // logo: {
  //   light: '/rspress-light-logo.png',
  //   dark: '/rspress-dark-logo.png',
  // },
  globalStyles: path.resolve('./assets/styles/global.css'),
  themeConfig: {
    nav: [
      {
        text: '文档',
        link: '/guide/index',
        activeMatch: '^/guide/',
      },
      {
        text: '更新日志',
        link: '/changelog/enhanced',
        activeMatch: '^/changelog/',
      },
      {
        text: '论坛',
        link: 'https://github.com/orgs/BiliUniverse/discussions',
        activeMatch: '^/discussions/',
      },
    ],
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/BiliUniverse' },
      {
        icon: {
          svg: fs.readFileSync(path.join(__dirname, 'docs', 'public', 'telegram.svg'), 'utf-8'),
        },
        mode: 'link',
        content: 'https://t.me/GetSomeFries',
      },
    ],
  },
  builderConfig: {
    source: {
      alias: {},
    },
  },
  markdown: {
    mdxRs: false,
    remarkPlugins: [[require('remark-github')]],
    rehypePlugins: [
      [
        require('rehype-urls'),
        (url: UrlWithStringQuery, node: any) => {
          switch (url.host) {
            case 't.me':
            case 'github.com':
              node.properties.target = '_blank';
              break;
            case null:
              //console.log(url);
              break;
            default:
              //console.log(url);
              break;
          }
        },
      ],
    ],
  },
  plugins: [
    pluginFontOpenSans(),
    pluginSitemap({
      domain: siteUrl,
    }),
    pluginChangelog({
      fetchOnDev: false,
      items: generateChangelogParams([
        {
          title: '⚙ Enhanced',
          routePath: 'enhanced',
          repo: 'BiliUniverse/Enhanced',
        },
        {
          title: '🌐 Global',
          routePath: 'global',
          repo: 'BiliUniverse/Global',
        },
        {
          title: '🔀 Redirect',
          routePath: 'redirect',
          repo: 'BiliUniverse/Redirect',
        },
        {
          title: '🛡️ ADBlock',
          routePath: 'ad-block',
          repo: 'BiliUniverse/ADBlock',
        },
        {
          title: '✈ Roaming',
          routePath: 'roaming',
          repo: 'BiliUniverse/Roaming',
        },
      ]),
    }),
  ],
});
