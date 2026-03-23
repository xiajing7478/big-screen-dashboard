export type ThemeKey = 'dark' | 'light'

/** 所有 CSS 变量 token（会被注入到 :root，也作为 Ant Design ConfigProvider token） */
export interface ThemeVars {
  // Ant Design 核心 token
  colorPrimary: string
  colorPrimaryLight: string
  colorBgBase: string
  colorBgContainer: string
  colorText: string
  colorBorder: string
  // 布局专用 token
  colorBgSidebar: string
  colorBgHover: string
  colorBgActive: string
  colorTextSecondary: string
  colorTextMuted: string
  colorBorderStrong: string
  colorShadow: string
  colorAvatarBg: string
  colorAvatarBorder: string
  // 内容区面板
  colorPanelBg: string
  colorScrollThumb: string
}

export interface ThemeConfig {
  label: string
  vars: ThemeVars
  token: Record<string, string | number>
}

const themes: Record<ThemeKey, ThemeConfig> = {
  dark: {
    label: '深色主题',
    vars: {
      colorPrimary: '#00b4ff',
      colorPrimaryLight: '#00d4ff',
      colorBgBase: '#0a0e1a',
      colorBgContainer: '#0d1424',
      colorText: '#e0f4ff',
      colorBorder: 'rgba(0,180,255,0.14)',
      colorBgSidebar: '#060d1f',
      colorBgHover: 'rgba(0,180,255,0.08)',
      colorBgActive: 'rgba(0,180,255,0.14)',
      colorTextSecondary: 'rgba(160,210,240,0.65)',
      colorTextMuted: 'rgba(160,210,240,0.38)',
      colorBorderStrong: 'rgba(0,180,255,0.38)',
      colorShadow: 'rgba(0,0,0,0.4)',
      colorAvatarBg: 'rgba(0,180,255,0.12)',
      colorAvatarBorder: 'rgba(0,180,255,0.3)',
      colorPanelBg: 'rgba(255,255,255,0.03)',
      colorScrollThumb: 'rgba(0,180,255,0.25)',
    },
    token: {
      borderRadius: 2,
      controlHeight: 40,
    },
  },
  light: {
    label: '浅色主题',
    vars: {
      colorPrimary: '#1677ff',
      colorPrimaryLight: '#4096ff',
      colorBgBase: '#f0f3f9',
      colorBgContainer: '#ffffff',
      colorText: '#1a1f2e',
      colorBorder: '#e4e7ed',
      colorBgSidebar: '#ffffff',
      colorBgHover: '#f0f7ff',
      colorBgActive: '#e6f0ff',
      colorTextSecondary: '#5c6b82',
      colorTextMuted: '#9ba8b9',
      colorBorderStrong: '#91caff',
      colorShadow: 'rgba(0,0,0,0.07)',
      colorAvatarBg: '#dbeafe',
      colorAvatarBorder: '#93c5fd',
      colorPanelBg: '#ffffff',
      colorScrollThumb: '#c1d4e8',
    },
    token: {
      borderRadius: 2,
      controlHeight: 40,
    },
  },
}

export default themes
