export type TArticleThread =
  | 'post'
  // for groupher
  | 'changelog'
  | 'kanban'
  | 'help'
  | 'about'

export type TThread =
  | TArticleThread
  | 'dashboard'
  | 'kanban'
  | 'team'
  | 'account'
