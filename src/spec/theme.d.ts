export type TThemeName = 'github'

// export type TTheme = ((obj: any) => unknown) | string
export type TTheme = any
// export type TTheme = string

export type TThemeMap = {
  name?: string
  _meta?: {
    category: string // TODO: 'dark' | 'light'
  }
  baseColor?: {
    red: string
    orange: string
    yellow: string
    green: string
    cyan: string
    blue: string
    purple: string

    grey: string
    pink: string

    pinkLite: string
    pinkBtnText: string
  }
  hoverBg?: string
  article?: {
    title?: string
    digest?: string
    info?: string
  }
  divider: string
  thread?: {
    articleDigest?: string
    articleTitle?: string
    extraInfo?: string
  }
  toast?: {
    successBar: string
    errorBar: string
    warnBar: string
    infoBar: string
  }
  footer?: {
    text: string
    hover: string
  }
  drawer?: {
    bg: string
  }
  loading?: {
    basic: string
    animate: string
  }
  editor?: {
    border: string
  }
  mobileTab?: string
  logoText?: string
  heatmap?: { activityLow: string; activityHight: string }
}
