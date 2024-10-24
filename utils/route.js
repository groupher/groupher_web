import {
  compose,
  isEmpty,
  head,
  split,
  reject,
  prop,
  pickBy,
  endsWith,
  slice,
  clone,
  toUpper,
  mergeRight,
  includes,
} from 'ramda'

import { HCN } from '~/const/name'
import { THREAD } from '~/const/thread'
import { ROUTE } from '~/const/route'

import { nilOrEmpty } from './validator'
import { Global } from './helper'

// example: /getme/xxx?aa=bb&cc=dd
const parseMainPath = compose(head, split('?'), head, reject(isEmpty), split('/'), prop('asPath'))

// example: /xxx/getme?aa=bb&cc=dd
const parsePathList = compose(
  reject(isEmpty),
  split('/'),
  head,
  reject(includes('=')),
  reject(isEmpty),
  split('?'),
  prop('url'),
)

const INDEX = ''
const getMainPath = (args) => {
  if (args.asPath === '/') return INDEX

  return parseMainPath(args)
}

const getSubPath = (args) => {
  if (args.asPath === '/') return INDEX

  const asPathList = parsePathList(args)
  // const subPath = asPathList.length > 1 ? asPathList[1] : asPathList[0]
  const subPath = asPathList.length > 1 ? asPathList[1] : ''

  return subPath
}

const getThirdPath = (args) => {
  if (args.asPath === '/') return INDEX

  const asPathList = parsePathList(args)
  // const subPath = asPathList.length > 1 ? asPathList[1] : asPathList[0]
  const subPath = asPathList.length > 2 ? asPathList[2] : ''

  return subPath
}

/**
 * parse subdomain of a url
 * like emacs.groupher.com
 * will return emacs
 * otherwise will return ""
 */
const parseSubDomain = (args) => {
  let communityPath = ''
  const isServerSide = false
  if (isServerSide) {
    // on server side
    const { subdomains } = args.req
    // eslint-disable-next-line no-console
    // NOTE:  subdomains is reversed
    // http://expressjs.com/en/4x/api.html#req.subdomains
    if (!isEmpty(subdomains)) {
      communityPath = subdomains[subdomains.length - 1]
    }
  } else {
    // browser side
    // eslint-disable-next-line no-useless-escape
    const domain = /:\/\/([^\/]+)/.exec(window.location.href)[1]
    const domainList = domain.split('.')

    if (domainList.length >= 3) {
      // eslint-disable-next-line prefer-destructuring
      communityPath = domainList[0]
    }
    // eslint-disable-next-line no-console
  }
  return communityPath
}

export const parseURL = (args) => {
  // const isServer = typeof window === 'undefined'
  // props 可能来自服务端的 props
  // props 也可能来自客户端的 routeObj
  let mainPath = ''
  let subPath = ''
  let thirdPath = ''
  let communityPath = parseSubDomain(args)
  let threadPath = ''

  if (communityPath === '') {
    mainPath = getMainPath(args)
    subPath = getSubPath(args)
    thirdPath = getThirdPath(args)
    communityPath = mainPath
    threadPath = subPath
  } else {
    mainPath = communityPath
    subPath = getMainPath(args)
    thirdPath = getSubPath(args)
    threadPath = subPath
  }

  return {
    communityPath,
    threadPath,
    mainPath,
    subPath,
    thirdPath,
  }
}

// --------------

export const getRoutePathList = compose(
  reject(isEmpty),
  split('/'),
  head,
  reject(includes('=')),
  reject(isEmpty),
  split('?'),
)

const doGetRouteMainPath = compose(head, split('?'), head, reject(isEmpty), split('/'))

export const getRouteMainPath = (asPath) => {
  if (asPath === '/') return ROUTE.HOME

  return doGetRouteMainPath(asPath)
}

export const ssrParseURL = (req) => {
  const { url } = req
  if (url === '/') {
    const mainPath = 'home'
    const subPath = THREAD.POST

    return {
      community: mainPath,
      communityPath: mainPath,
      threadPath: subPath,
      mainPath,
      subPath,
      thirdPath: '',
      thread: toUpper(THREAD.POST),
    }
  }

  const pathList = getRoutePathList(url)
  const mainPath = pathList[0]
  const subPath = pathList[1]
  const thirdPath = pathList[2] || ''

  const thread = endsWith('s', subPath) ? slice(0, -1, subPath) : subPath

  return {
    community: mainPath,
    communityPath: mainPath,
    threadPath: subPath,
    mainPath,
    subPath,
    thirdPath,
    thread: toUpper(thread),
  }
}

export const akaTranslate = (communitySlug) => {
  switch (communitySlug) {
    case 'k8s':
      return 'kubernetes'

    case 'js':
      return 'javascript'

    case 'webassembly':
      return 'wasm'

    case 'rn':
      return 'react-native'

    // 生产环境首页的诡异问题， fix later
    case 'index':
      return HCN

    default:
      return communitySlug
  }
}

const mergePagiQuery = (query = {}, opt = { pagi: 'string' }) => {
  const routeQuery = clone(query)

  let defaultQuery = { page: '1', size: '20' }

  if (opt.pagi === 'number') {
    defaultQuery = { page: 1, size: 20 }
  }

  if (routeQuery.page && opt.pagi === 'number') {
    routeQuery.page = Number.parseInt(routeQuery.page, 10)
  }

  return mergeRight(defaultQuery, routeQuery)
}

// convert url query string to json, with optional pagi info
export const queryStringToJSON = (path, opt = { noPagiInfo: false, pagi: 'string' }) => {
  const splited = split('?', path)
  if (splited.length === 1) return mergePagiQuery({}, opt)

  const result = {}
  const paris = splited[1].split('&')

  paris.forEach((pair) => {
    pair = pair.split('=')
    result[pair[0]] = decodeURIComponent(pair[1] || '')
  })

  const json = JSON.parse(JSON.stringify(result))

  return opt.noPagiInfo ? json : mergePagiQuery(json, opt)
}

/* eslint-disable */

export const getParameterByName = (name) => {
  /* if (!url) url = window.location.href;*/
  const url = Global.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export const getQueryFromUrl = (name, url) => {
  if (!url) url = window.location.href
  const nameVal = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${nameVal}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
/* eslint-enable */

export const serializeQuery = (obj) => {
  /* eslint-disable */
  const qstring = Object.keys(obj)
    .reduce((a, k) => {
      a.push(`${k}=${encodeURIComponent(obj[k])}`)
      return a
    }, [])
    .join('&')

  return isEmpty(qstring) ? '' : `?${qstring}`
  /* eslint-enable */
}

/* eslint-disable */
// see: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
export const parseDomain = (url) => {
  try {
    const parsedUrl = {}

    if (url === null || url.length === 0) return parsedUrl

    const protocolI = url.indexOf('://')
    parsedUrl.protocol = url.substr(0, protocolI)

    const remainingUrl = url.substr(protocolI + 3, url.length)
    let domainI = remainingUrl.indexOf('/')
    domainI = domainI === -1 ? remainingUrl.length - 1 : domainI
    parsedUrl.domain = remainingUrl.substr(0, domainI)
    parsedUrl.path =
      domainI === -1 || domainI + 1 === remainingUrl.length
        ? null
        : remainingUrl.substr(domainI + 1, remainingUrl.length)

    const domainParts = parsedUrl.domain.split('.')
    switch (domainParts.length) {
      case 2:
        parsedUrl.subdomain = null
        parsedUrl.host = domainParts[0]
        parsedUrl.tld = domainParts[1]
        break
      case 3:
        parsedUrl.subdomain = domainParts[0]
        parsedUrl.host = domainParts[1]
        parsedUrl.tld = domainParts[2]
        break
      case 4:
        parsedUrl.subdomain = domainParts[0]
        parsedUrl.host = domainParts[1]
        parsedUrl.tld = `${domainParts[2]}.${domainParts[3]}`
        break
    }

    parsedUrl.parent_domain = `${parsedUrl.host}.${parsedUrl.tld}`

    return parsedUrl.host
  } catch (e) {
    return '??'
  }
}
/* eslint-enable */

// sync json query to the brower url without reload the page
// empty value obj will be omit
export const markRoute = (query, opt = { noPagiInfo: true }) => {
  if (nilOrEmpty(query)) query = {}

  const exsitQuery = queryStringToJSON(Global.location.search, {
    ...opt,
  })

  const newQueryObj = pickBy((v) => !nilOrEmpty(v), mergeRight(exsitQuery, query))
  const newQueryString = serializeQuery(newQueryObj)

  Global.history.pushState({}, null, newQueryString)
}
