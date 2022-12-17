export type TNonCommunityPath = 'apply_community'

export type TDashboardPath =
  | 'overview'
  // basic-info
  | 'info'
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
