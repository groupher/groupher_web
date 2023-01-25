export type TNonCommunityPath = 'apply_community'

export type TDashboardLayoutRoute = 'global' | 'post' | 'kanban' | 'changelog' | 'help' | 'about'

export type TDashboardPath =
  | 'dashboard'
  // basic-info
  | 'info'
  | 'ui'
  | 'layout'
  | 'threads'
  | 'seo'
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
