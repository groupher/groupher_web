import { print } from 'graphql'
import { describe, expect, it } from 'vitest'

import { CONTENT_PUBLISH_OPERATIONS } from './server-operations'

describe('Content Publisher server operations', () => {
  it('are importable and printable in a Node runtime', () => {
    for (const operation of Object.values(CONTENT_PUBLISH_OPERATIONS)) {
      expect(print(operation)).toMatch(/mutation /)
    }
  })
})
