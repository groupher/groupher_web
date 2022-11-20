// most of the cycle import error is caused by @/types, which is fine
// since @/types is used only when TS compiler, will not effect production code
/* eslint-disable import/no-cycle */

/*
 * utils functiosn
 */

export { default as asyncSuit } from './async/index'

export { buildLog, log } from './logger'

export { default as uid } from './uid'

export {
  Global,
  send,
  mapKeys,
  getRandomInt,
  cutRest,
  prettyNum,
  numberWithCommas,
  sortByColor,
  sortByIndex,
  Rlog,
  countWords,
  joinUS,
  closeDrawer,
  report,
  errRescue,
  debounce,
  extractMentions,
  extractAttachments,
  isCypressRunning,
  multiClick,
  findDeepMatch,
  groupByKey,
  titleCase,
  singular,
} from './helper'

export { errorForHuman, ssrRescue } from './errors'

export {
  cast,
  changeset,
  notEmpty,
  hasValue,
  isEmptyValue,
  nilOrEmpty,
  isObject,
  isString,
} from './validator'

export {
  makeGQClient,
  makeGithubExplore,
  later,
  pagedFilter,
  atomizeValues,
} from './graphql'

// export { default as githubAPI } from './github_api'

export {
  parseURL,
  ssrParseURL,
  akaTranslate,
  getParameterByName,
  getQueryFromUrl,
  queryStringToJSON,
  serializeQuery,
  parseDomain,
  getRoutePathList,
  getRouteMainPath,
  markRoute,
} from './route'

export {
  bond,
  markStates,
  flashState,
  meteorState,
  toJS,
  updateEditing,
} from './mobx'

export {
  isServerSide,
  isClientSide,
  getJwtToken,
  isArticleThread,
  ssrBaseStates,
  ssrFetchPrepare,
  ssrPagedArticleSchema,
  ssrPagedArticlesFilter,
  isrPagedArticlesFilter,
  ssrHomePagedArticlesFilter,
  ssrError,
  ssrParseArticleThread,
  validCommunityFilters,
  parseTheme,
  ssrGetParam,
  refreshIfneed,
} from './ssr'

export {
  scrollIntoEle,
  scrollToHeader,
  scrollToTabber,
  scrollToTop,
  scrollDrawerToTop,
  scrollToComments,
  lockPage,
  unlockPage,
  focusDoraemonBar,
  hideDoraemonBarRecover,
  isBrowser,
  toggleGlobalBlur,
  clearGlobalBlur,
  isElementInViewport,
  pixelAdd,
  isDescendant,
} from './dom'
/*
 * theme related
 */
export {
  theme,
  themeMeta,
  themeSkins,
  themeCoverMap,
  themeCoverIndexMap,
} from './themes'

// helpers
export { default as css } from './css'
export { WIDTH } from './css/metric'
export { default as BStore } from './bstore'
export { Trans } from './i18n'
export { default as GA } from './analytics/ga'

export { mockImage, mockImages } from './mock'

export {
  communitySEO,
  articleSEO,
  articlePublishSEO,
  articleUpdateSEO,
  userSEO,
  publishCommunitySEO,
} from './seo'
