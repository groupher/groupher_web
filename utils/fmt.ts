import { endsWith, includes } from 'ramda'
import { limit, length } from 'stringz'

import { THREAD } from '@/constant'

import { isString } from './validator'

/**
 * cut extra length of a string
 * 截取固定长度字符串，并添加省略号（...）
 * @param {*string} str 需要进行处理的字符串，可含汉字
 * @param {*number} len 需要显示多少个汉字，两个英文字母相当于一个汉字
 */
export const cutRest = (str: string, len = 20): string => {
  if (!str || !isString(str)) return '...'
  return len >= length(str) ? str : `${limit(str, len, '')}...`
}

/**
 * prettyNum with human format
 * @see @link https://stackoverflow.com/questions/9461621/how-to-format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900-in-javascrip
 * e.g:
 * console.log(prettyNum(1200)) // => 1.2k
 *
 * @param {number} num
 * @param {number} [digits=1]
 * @returns {string}
 */
export const prettyNum = (num: number, digits = 1): string => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break
    }
  }
  /* eslint-disable */
  if (num < 1000) {
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
  }
  return (
    (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol + '+'
  )
  /* eslint-enable  */
}

/**
 * number with commas foramt
 * @see @link https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
 *
 * @param {*} x
 */
export const numberWithCommas = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 *  titlize a string
 */
export const titleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (t) => {
    return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
  })
}

// https://stackoverflow.com/a/2627482/4050784
export const daysBetween = (date1, date2) => {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1 - date2)

  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY)
}

// birthday is a Date
const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs) // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const siteBirthDay = (birthday: string): string => {
  const year = calculateAge(new Date(birthday))
  const days = daysBetween(new Date(birthday), Date.now()) - 365 * year

  return `${year}年${days}天`
}

type TCovert = 'titleCase' | 'upperCase' | null
const doCovert = (value: string, opt: TCovert): string => {
  switch (opt) {
    case 'titleCase': {
      return titleCase(value)
    }
    case 'upperCase': {
      return value.toUpperCase()
    }
    default: {
      return value
    }
  }
}

/**
 * mainly used for url -> thread convert
 *
 * e.g:
 * posts -> post
 */
export const singular = (value: string, opt = null): string => {
  switch (value) {
    default: {
      const singularValue = endsWith('s', value) ? value.slice(0, -1) : value
      return doCovert(singularValue, opt)
    }
  }
}

/**
 * mainly used for thread -> url convert
 *
 * e.g:
 * post -> posts
 */
export const plural = (value: string, opt = null): string => {
  if (
    includes(value, [
      THREAD.ACCOUNT,
      THREAD.CHANGELOG,
      THREAD.HELP,
      THREAD.KANBAN,
      THREAD.ABOUT,
      THREAD.DASHBOARD,
    ])
  ) {
    return doCovert(value, opt)
  }

  return doCovert(`${value}s`, opt)
}

/**
 * @param num The number to round
 * @param precision The number of decimal places to preserve
 * see: https://stackoverflow.com/questions/5191088/how-to-round-up-a-number-in-javascript
 */
export const roundUpNumber = (num: number, precision = 0): number => {
  // eslint-disable-next-line no-restricted-properties
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}
