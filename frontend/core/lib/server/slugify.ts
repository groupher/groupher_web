import { isValidSlug } from '~/validator'

const HAN_RE = /\p{Script=Han}/u
const LATIN_NUMBER_RE = /[a-zA-Z0-9]/
const COMBINING_MARK_RE = /\p{Mark}/gu
const SEPARATOR_RE = /[^a-z0-9]+/g
const EDGE_SEPARATOR_RE = /^-+|-+$/g

type TPinyin = (typeof import('pinyin-pro'))['pinyin']

const toPinyin = (char: string, pinyin: TPinyin): string => {
  const [first] = pinyin(char, { toneType: 'none', type: 'array' }) as string[]
  return first || ''
}

/** Runs the slugify operation at the frontend shared boundary. */
export const slugify = async (value: string, fallback = 'untitled'): Promise<string> => {
  const { pinyin } = await import('pinyin-pro')
  const normalized = value.normalize('NFKD').replace(COMBINING_MARK_RE, '')
  let next = ''

  for (const char of normalized) {
    if (HAN_RE.test(char)) {
      next += ` ${toPinyin(char, pinyin)} `
      continue
    }

    if (LATIN_NUMBER_RE.test(char)) {
      next += char.toLowerCase()
      continue
    }

    next += '-'
  }

  const slug = next.replace(SEPARATOR_RE, '-').replace(EDGE_SEPARATOR_RE, '')
  if (slug) return slug

  return isValidSlug(fallback) ? fallback : 'untitled'
}
