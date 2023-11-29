import type { TTestable, TActive, TDashboardLayout, TPostLayout } from '@/spec'

export type TSwipeOption = {
  direction: 'bottom' | 'top'
  // inspired by the vim shortcut
  position: 'H' | 'M' | 'L'
}

export type TSwipe = {
  swipeUpY?: number
  swipeDownY?: number
  // options: Record<string, unknown>
  options: TSwipeOption
}

export type TDrawer = TTestable &
  TActive &
  TSwipe & {
    $mobile: boolean
    $rightOffset?: string
    type: string
  } & {
    $fromContentEdge?: boolean
  }

export type TExtraInfo = {
  mmType: string
  userListerType: string
  dashboardDescLayout: TDashboardLayout
  postLayout: TPostLayout
}
