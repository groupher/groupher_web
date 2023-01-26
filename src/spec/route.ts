export type TNonCommunityPath = 'apply_community'

export type TDashboardBaseInfoRoute = 'basic' | 'social' | 'other'
export type TDashboardSEORoute = 'search_engine' | 'twitter'
export type TDashboardLayoutRoute = 'global' | 'post' | 'kanban' | 'changelog' | 'help' | 'about'

export type TDashboardPath =
  | 'dashboard'
  // basic-info
  | 'info'
  | 'seo'
  | 'ui'
  | 'layout'
  | 'threads'
  | 'alias'
  | 'domain'
  // analysis
  // --
  // contents
  | 'tags'
  | 'post'
  | 'kanban'
  | 'changelog'
  | 'help'
  | 'header'
  | 'footer'
  | 'blackhouse'
  // integrates
  | 'third_part'
  | 'admins'
  | 'widgets'

export type TPath =
  | 'home'
  | 'post'
  | 'help'
  | 'changelog'
  | 'kanban'
  | 'about'
  | 'user'
  | {
      DASHBOARD: TDashboardPath
    }
