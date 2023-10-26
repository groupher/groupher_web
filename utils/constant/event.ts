const EVENT = {
  // every time when session come back
  LOGIN_PANEL: 'LOGIN_PANEL',
  LOGIN: 'LOGIN',

  // viewing
  VIEWING_CHANGED: 'VIEWING_CHANGED',
  // upvote
  UPVOTE_ARTICLE: 'UPVOTE_ARTICLE',

  // error
  ERR_RESCUE: 'ERR_RESCUE',

  AUTH_WARNING: 'AUTH_WARNING',
  LOGOUT: 'LOGOUT',
  // drawer
  DRAWER: {
    OPEN: 'DRAWER_OPEN',
    CLOSE: 'DRAWER_CLOSE',
    AFTER_CLOSE: 'AFTER_DRAWER_CLOSE',
    CONTENT_DRAGABLE: 'CONTENT_DRAGABLE',
  },

  // report
  REPORT: 'REPORT',
  // new end
  USER_LISTER_OPEN: 'USER_LISTER_OPEN',
  CALL_CASHIER: 'CALL_CASHIER',

  //
  PREVIEW_ARTICLE: 'PREVIEW_ARTICLE',

  // TAB
  // 社区的 Thread 改变（包含所有类型的 Thread）
  COMMUNITY_THREAD_CHANGE: 'COMMUNITY_THREAD_CHANGE',
  // 文章类型的 Thread 改变
  ARTICLE_THREAD_CHANGE: 'ARTICLE_THREAD_CHANGE',
  // 切换社区前 (主要设置路由和 ViewingCommunity 的 Raw 值)
  COMMUNITY_CHANGE_BEFORE: 'COMMUNITY_CHANGE_BEFORE',
  // 切换社区
  COMMUNITY_CHANGE: 'COMMUNITY_CHANGE',

  // refresh
  RELOAD_ARTICLE: 'RELOAD_ARTICLE',
  REFRESH_COMMUNITIES: 'REFRESH_COMMUNITIES',
  REFRESH_ARTICLES: 'REFRESH_ARTICLES',
  REFRESH_POSTS: 'REFRESH_POSTS',
  REFRESH_TAGS: 'REFRESH_TAGS',
  REFRESH_MODERATORS: 'REFRESH_MODERATORS',

  // sync repo

  // favorites
  SET_FAVORITE_CONTENT: 'SET_FAVORITE_CONTENT',
  // customization
  SET_C11N: 'SET_C11N',
  // bills
  NEW_BILLS: 'NEW_BILLS',

  // doramon
  QUERY_DORAMON: 'QUERY_DORAMON',

  // set/unset community
  MIRROR_TO_COMMUNITY: 'MIRROR_TO_COMMUNITY',
  MOVE_TO_COMMUNITY: 'MOVE_TO_COMMUNITY',
  SELECT_COMMUNITY: 'SELECT_COMMUNITY',
  SET_TAG: 'SET_TAG',

  JOIN_US: 'JOIN_US',
  //
  C11N_DENSITY_CHANGE: 'C11N_DENSITY_CHANGE',
  //
  // publish selectors
  ARTICLE_SELECTOR: 'ARTICLE_SELECTOR',

  // subscribe
  SUBSCRIBE: 'SUBSCRIBE',
  AUTH: 'AUTH',
}

export default EVENT
