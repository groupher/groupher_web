import { describe, expect, it } from 'vitest'

import { DSB_INFO_ROUTE } from '~/const/route'
import type { TDsbFieldMap } from '~/spec'

import { buildBaseInfoSave } from './baseInfo'
import { buildLayoutSave } from './layout'

const dashboard = { title: 'submitted', footerLayout: 'GROUP' } as TDsbFieldMap
const context = { community: 'home', dashboard, original: dashboard }

describe('Dsb domain response normalization', () => {
  it('reads only the typed layout payload', () => {
    const request = buildLayoutSave({ ...context, field: 'footerLayout' })

    expect(
      request.readConfirmed?.({
        updateDashboardLayout: {
          layout: { footerLayout: 'SIMPLE' },
          nested: { footerLayout: 'WRONG' },
        },
      }),
    ).toEqual({ footerLayout: 'SIMPLE' })
  })

  it('does not recursively match a same-named field outside baseInfo', () => {
    const request = buildBaseInfoSave({ ...context, subTab: DSB_INFO_ROUTE.BASIC })

    expect(
      request.readConfirmed?.({
        updateDashboardBaseInfo: {
          nested: { title: 'WRONG' },
        },
      }),
    ).toEqual({})
  })
})
