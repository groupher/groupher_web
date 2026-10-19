import { describe, expect, it } from 'vitest'

import { titleSlugify } from './slugify-route'

const request = (body: string) =>
  new Request('http://localhost/api/utils/slugify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })

describe('titleSlugify', () => {
  it('returns a valid JSON slug response', async () => {
    const response = await titleSlugify(request(JSON.stringify({ value: 'Page 1 中文' })))

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/json')
    await expect(response.json()).resolves.toEqual({
      ok: true,
      slug: 'page-1-zhong-wen',
    })
  })

  it.each([
    ['missing value', JSON.stringify({})],
    ['blank value', JSON.stringify({ value: '   ' })],
    ['invalid JSON', '{'],
  ])('rejects %s', async (_case, body) => {
    const response = await titleSlugify(request(body))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: 'value is required',
    })
  })
})
