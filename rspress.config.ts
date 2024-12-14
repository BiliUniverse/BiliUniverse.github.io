import fs from 'node:fs';
import path from 'node:path';
import { pluginChangelog } from 'rspress-plugin-changelog';
import type { ChangelogPluginOptions } from 'rspress-plugin-changelog';
import pluginSitemap from 'rspress-plugin-sitemap';
import { defineConfig } from 'rspress/config';

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
  logoText: 'BiliUniverse',
  // logo: {
  //   light: '/rspress-light-logo.png',
  //   dark: '/rspress-dark-logo.png',
  // },
  head: [
    ['link', { ref: 'preconnect', href: '//ipolyfill.edge-byted.com' }],
    ['link', { ref: 'dns-prefetch', href: '//ipolyfill.edge-byted.com' }],
    ['script', { src: '//ipolyfill.edge-byted.com/0.0.25/polyfill.min.js', crossorigin: '' }],
  ],
  themeConfig: {
    lastUpdated: true,
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
  },
  plugins: [
    pluginSitemap({
      domain: 'https://BiliUniverse.github.io',
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
