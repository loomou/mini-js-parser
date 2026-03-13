export type FrontmatterLayout = 'doc' | 'home' | 'page' | false | string;

export type NavItem =
  | {
      text: string;
      link: string;
      activeMatch?: string;
    }
  | {
      text: string;
      items: (
        | { text: string; link: string }
        | { text?: string; items: { text: string; link: string }[] }
      )[];
    };

export interface SidebarItem {
  text?: string;
  title?: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}

export interface SocialLink {
  icon: 'github' | 'twitter' | 'bluesky' | 'discord' | string;
  link: string;
  ariaLabel?: string;
}

export interface ThemeLogo {
  src?: string;
  light?: string;
  dark?: string;
  alt?: string;
  href?: string;
}

export interface ThemeConfig {
  nav: NavItem[];
  sidebar: Record<string, SidebarItem[]>;
  logo?: ThemeLogo;
  footer?: {
    brand?: string;
    copyright?: string;
  };
  socialLinks?: SocialLink[];
  outlineTitle?: string;
  carbonAds?: {
    code: string;
    placement: string;
  };
  langMenuLabel?: string;
  localeLinks?: { text: string; link: string }[];
  currentLangLabel?: string;
  darkModeSwitchLabel?: string;
  sidebarMenuLabel?: string;
  skipToContentLabel?: string;
  returnToTopLabel?: string;
}

export interface PageData {
  isNotFound: boolean;
  title?: string;
  description?: string;
  headers?: { level: number; title: string; slug: string }[];
  lastUpdated?: string;
}

export interface Frontmatter {
  layout?: FrontmatterLayout;
  pageClass?: string;
  theme?: 'dark' | 'light';
  outline?: boolean | 'deep';
  editLink?: boolean;
  hero?: {
    text?: string;
    tagline?: string;
    image?: {
      src: string;
      alt?: string;
    };
    actions?: {
      text: string;
      link: string;
      theme?: 'brand' | string;
    }[];
  };
  features?: {
    icon?: string;
    title?: string;
    details?: string;
  }[];
}

export interface SiteData {
  title: string;
  description?: string;
  appearance?: boolean | 'force-dark' | 'force-auto';
}

export interface ThemeContextValue {
  site: SiteData;
  theme: ThemeConfig;
  getFrontmatter: () => Frontmatter;
  getPage: () => PageData;
  getRoute: () => { path: string };
  getIsDark: () => boolean;
  setDark: (isDark: boolean) => void;
  navigate: (to: string) => void;
}

export interface OutlineHeader {
  level: number;
  title: string;
  link: string;
  children?: OutlineHeader[];
}
