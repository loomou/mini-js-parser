import { NavItem, SidebarItem, ThemeConfig } from '~/types';

const nav: NavItem[] = [
  { text: '主页', link: '/' },
  { text: '文档', link: '/docs/architecture' },
];

const sidebar: Record<string, SidebarItem[]> = {
  '/docs/': [
    {
      text: '介绍',
      collapsed: false,
      items: [
        {
          text: '整体架构',
          link: '/docs/architecture',
        },
        {
          text: '语法',
          link: '/docs/grammar',
        },
        {
          text: 'Compiler',
          link: '/docs/compiler',
        },
      ],
    },
    {
      text: '代码扫描',
      collapsed: true,
      items: [
        {
          text: 'AST',
          link: '/docs/ast',
        },
        {
          text: 'Parser',
          link: '/docs/parser',
        },
        {
          text: 'Scanner',
          link: '/docs/scanner',
        },
        {
          text: 'Binder',
          link: '/docs/binder',
        },
      ],
    },
    {
      text: '代码转换',
      collapsed: true,
      items: [
        {
          text: 'Transformer',
          link: '/docs/transformer',
        },
        {
          text: 'Factory',
          link: '/docs/factory',
        },
        {
          text: '常量折叠',
          link: '/docs/transformers/constantFolding',
        },
        {
          text: '代码消除',
          link: '/docs/transformers/deadCodeElimination',
        },
        {
          text: '变量重命名',
          link: '/docs/transformers/renameIdentifiers',
        },
      ],
    },
    {
      text: '代码生成',
      collapsed: true,
      items: [
        {
          text: 'Emitter',
          link: '/docs/emitter',
        },
        {
          text: 'Minifier',
          link: '/docs/minifier',
        },
        {
          text: 'Source Map',
          link: '/docs/sourcemap',
        },
      ],
    },
  ],
};

const socialLinks = [{ icon: 'github', link: 'https://github.com/' }];

const footer = {
  brand: 'Mini JS Parser',
  copyright: '© 2026',
};

export const themeConfig: ThemeConfig = {
  nav,
  sidebar,
  footer,
  socialLinks,
};
