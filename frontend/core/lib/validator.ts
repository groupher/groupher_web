import { either, isEmpty, isNil, trim } from 'ramda'

/**
 * Shared nil-or-empty predicate used by legacy form validation chains.
 */
export const nilOrEmpty = either(isNil, isEmpty)

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type TSlugValidation = {
  valid: boolean
  value: string
  reason?: 'empty' | 'format'
}

/**
 * Validates public slugs before they cross the GraphQL/backend boundary.
 *
 * The accepted shape is lowercase words separated by single dashes. Returning a
 * reason lets form UIs distinguish empty input from invalid formatting without
 * duplicating the regex.
 */
export const validateSlug = (value?: string | null): TSlugValidation => {
  const next = isString(value) ? trim(value) : ''

  if (!next) {
    return { valid: false, value: next, reason: 'empty' }
  }

  if (!SLUG_RE.test(next)) {
    return { valid: false, value: next, reason: 'format' }
  }

  return { valid: true, value: next }
}

/** Reports whether valid slug at the frontend shared boundary. */
export const isValidSlug = (value?: string | null): boolean => validateSlug(value).valid

/**
 * Runtime object guard used by older validation and merge helpers.
 */
export const isObject = (value: unknown): boolean => {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

/**
 * judge if given thing is string
 *
 * @param {*} value
 * @return {Boolean}
 * @returns
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String
}
