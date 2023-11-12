// most of the cycle import error is caused by @/types, which is fine
// since @/types is used only when TS compiler, will not effect production code
/* eslint-disable import/no-cycle */

/*
 * utils functiosn
 */

export { default as asyncSuit } from './async/index'

export { buildLog, log } from './logger'

export { default as uid } from './uid'

export { send, joinUS, closeDrawer, report, errRescue } from './signal'
export {
  Global,
  getRandomInt,
  sortByColor,
  sortByIndex,
  Rlog,
  countWords,
  debounce,
  extractMentions,
  extractAttachments,
  isCypressRunning,
  findDeepMatch,
  groupByKey,
} from './helper'

export { titleCase, singular, plural, cutRest, prettyNum, numberWithCommas } from './fmt'

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

export { makeGQClient, makeGithubExplore, later, pagiFilter, atomizeValues } from './graphql'

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

export { markStates, toJS, updateEditing } from './mobx'

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
  multiClick,
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
  rainbow,
  rainbowLight,
} from './themes'

// helpers
export { default as css } from './css'
export { WIDTH } from './css/metric'
export { default as BStore } from './bstore'
export { Trans } from './i18n'
export { default as GA } from './analytics/ga'

export { mockImage, mockImages } from './mock'
