import { describe, expect, it } from 'vitest'

import { toArticleListFilter } from './filter'

describe('toArticleListFilter', () => {
  it('omits inactive optional filters from GraphQL variables', () => {
    expect(toArticleListFilter({ community: 'home', page: 1, size: 20 })).toEqual({
      community: 'home',
      page: 1,
      size: 20,
    })
  })

  it('serializes active filters after normalization', () => {
    expect(
      toArticleListFilter({
        community: ' home ',
        page: 2,
        size: 10,
        communityTag: ' product ',
        communityTags: ['beta', 'alpha', 'beta'],
        cat: 'IDEA',
        status: 'WIP',
        order: 'PUBLISH',
        when: 'THIS_WEEK',
        sort: 'DESC',
      }),
    ).toEqual({
      community: 'home',
      page: 2,
      size: 10,
      communityTag: 'product',
      communityTags: ['alpha', 'beta'],
      cat: 'IDEA',
      status: 'WIP',
      order: 'PUBLISH',
      when: 'THIS_WEEK',
      sort: 'DESC',
    })
  })
})
