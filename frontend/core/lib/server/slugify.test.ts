import { describe, expect, it } from 'vitest'

import { validateSlug } from '../validator'
import { slugify } from './slugify'

describe('slugify', () => {
  it('keeps latin text and converts han characters to pinyin', async () => {
    await expect(slugify('Next.js 中文教程')).resolves.toBe('next-js-zhong-wen-jiao-cheng')
    await expect(slugify('React经验分享')).resolves.toBe('react-jing-yan-fen-xiang')
  })

  it('handles mixed latin, han, numbers, and separators', async () => {
    await expect(slugify('React 19 中文版 Part 2')).resolves.toBe('react-19-zhong-wen-ban-part-2')
    await expect(slugify('API接口-v2')).resolves.toBe('api-jie-kou-v2')
    await expect(slugify('  hello___world  ')).resolves.toBe('hello-world')
  })

  it('folds latin diacritics', async () => {
    await expect(slugify('Café Über uns')).resolves.toBe('cafe-uber-uns')
    await expect(slugify('Crème brûlée à la carte')).resolves.toBe('creme-brulee-a-la-carte')
  })

  it('falls back when no URL-safe content remains', async () => {
    await expect(slugify('と')).resolves.toBe('untitled')
    await expect(slugify('と', 'tag')).resolves.toBe('tag')
    await expect(slugify('と', 'bad fallback')).resolves.toBe('untitled')
  })

  it('shares the same slug validator contract', () => {
    expect(validateSlug('react-19-zhong-wen').valid).toBe(true)
    expect(validateSlug('React').valid).toBe(false)
    expect(validateSlug('react_19').valid).toBe(false)
    expect(validateSlug('react--tag').valid).toBe(false)
    expect(validateSlug('-react').valid).toBe(false)
    expect(validateSlug('').valid).toBe(false)
  })
})
