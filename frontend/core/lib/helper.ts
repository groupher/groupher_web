import { includes, isEmpty, keys, remove, sort, startsWith } from 'ramda'

import { ASSETS_ENDPOINT } from '~/config'
import { COLOR } from '~/const/colors'
import type { TColorName, TCommunityThread, TDsdThreadConf, TWindow } from '~/spec'

export const Global: TWindow = typeof window !== 'undefined' ? window : null

type TSortableItem = {
  color?: string
  index?: number
  groupIndex?: number
  id?: string
  title?: string
  slug?: string
  logo?: string
  group?: string
}

/** Runs the sort by key operation at the frontend shared boundary. */
export const sortByKey = <T, K extends keyof T>(source: readonly T[], key: K): T[] => {
  if (isEmpty(source)) return []

  const sortKey = key

  return sort((a, b) => {
    const av = a[sortKey]
    const bv = b[sortKey]

    if (av == null) return 1
    if (bv == null) return -1

    return av > bv ? 1 : av < bv ? -1 : 0
  }, source)
}

/** Runs the sort by color operation at the frontend shared boundary. */
export const sortByColor = (items: readonly TSortableItem[]) => sortByKey(items, 'color')
/** Runs the sort by index operation at the frontend shared boundary. */
export const sortByIndex = (items: readonly TSortableItem[]) => sortByKey(items, 'index')

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 *
 * see: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
export const getRandomInt = (min: number, max: number): number => {
  const minNum = Math.ceil(min)
  const maxNum = Math.floor(max)
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
}

/** Runs the num2 percent operation at the frontend shared boundary. */
export const num2Percent = (decimal: number): string => {
  if (!decimal) return '0%'

  const percentage = (decimal * 100).toFixed(1)
  return `${percentage}%`
}

/**
 * get radom backgrounds from COLOR_NAMEs
 */
export const randomBgNames = (
  count: number,
  excepts: readonly TColorName[] = [COLOR.CYAN, COLOR.GREEN],
): TColorName[] => {
  let colorKeys = isEmpty(excepts) ? keys(COLOR) : keys(COLOR).filter((k) => !includes(k, excepts))

  let randomIdx: number
  const ret: TColorName[] = []

  for (let idx = 0; idx < count; idx += 1) {
    if (isEmpty(colorKeys)) break

    randomIdx = getRandomInt(0, colorKeys.length - 1)
    const color = colorKeys[randomIdx]
    if (!color) break
    ret.push(color)
    colorKeys = remove(randomIdx, 1, colorKeys)
  }

  return ret
}

/**
 * groupByKey
 * see @link: https://stackoverflow.com/a/47385953/4050784
 * @param {Array} - array
 * @param {String} - key
 * @returns {Object}
 */
export const groupByKey = (array, key) => {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash
    const groupKey = obj[key]
    hash[groupKey] = (hash[groupKey] || []).concat(obj)
    return hash
  }, {})
}

type TShareParam = {
  url?: string
  title?: string
  text?: string
  subject?: string
  body?: string
  u?: string
  href?: string
  name?: string
}
/** Runs the open share window operation at the frontend shared boundary. */
export const openShareWindow = (platformUrl: string, param: TShareParam): void => {
  const safeParam: string[] = []

  for (const i in param) {
    safeParam.push(`${i}=${encodeURIComponent(param[i] || '')}`)
  }
  /* eslint-enable */
  const targetUrl = `${platformUrl}?${safeParam.join('&')}`

  Global?.open(targetUrl, '_blank', 'height=500, width=600')
}

/**
 * remove empty value from given object
 */
export const removeEmptyValuesFromObject = (object) => {
  const newObject = {}

  for (const key in object) {
    if (Object.hasOwn(object, key)) {
      const value = object[key]
      if (value !== null && value !== undefined) {
        newObject[key] = value
      }
    }
  }

  return newObject
}

/**
 * filter public threads & map alias name for community's threads
 */
export const publicThreads = (
  threads: TCommunityThread[],
  dashboardSettings: TDsdThreadConf,
): TCommunityThread[] => {
  const { enable, nameAlias } = dashboardSettings

  const enabledThreads = sortByIndex(
    threads
      .filter((thread) => enable[thread.slug] && thread.index !== undefined)
      .map((thread) => ({ ...thread, index: thread.index! })),
  )

  const mappedThreads = enabledThreads.map((pThread) => {
    const aliasItem = nameAlias.find((alias) => alias.slug === pThread.slug)

    return {
      ...pThread,
      title: aliasItem?.name || pThread.title,
    }
  })

  return mappedThreads as TCommunityThread[]
}

/**
 * for combine OSS endpoint with path
 */
export const assetSrc = (path: string): string => {
  if (!path) return ''

  if (startsWith('http://', path) || startsWith('https://', path)) {
    return path
  }

  return `${ASSETS_ENDPOINT}/${path}`
}

/**
 * for store to server
 */
export const assetPath = (url: string): string => {
  const splitUrl = url.split(`${ASSETS_ENDPOINT}/`)

  return splitUrl.join('')
}
