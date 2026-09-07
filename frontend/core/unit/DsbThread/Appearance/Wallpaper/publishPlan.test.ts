import { GRADIENT_WALLPAPER_NAME, WALLPAPER_TYPE } from '~/const/wallpaper'
import { initState } from '~/stores/wallpaper/helper'

import { buildWallpaperPublishPlan } from './publishPlan'

describe('buildWallpaperPublishPlan', () => {
  const baseInput = {
    community: 'home',
    baseVersion: 7,
    theme: 'light' as const,
  }

  it('builds a NONE plan without export targets', () => {
    const wallpaper = { ...initState({}).light, type: WALLPAPER_TYPE.NONE }

    const plan = buildWallpaperPublishPlan({ ...baseInput, wallpaper })

    expect(plan).toMatchObject({
      baseVersion: 7,
      community: 'home',
      theme: 'light',
      type: 'none',
    })
    expect(plan).not.toHaveProperty('targets')
    expect(plan).not.toHaveProperty('renderSpec')
  })

  it('builds one generated plan with the fixed responsive target matrix', () => {
    const wallpaper = {
      ...initState({}).light,
      source: GRADIENT_WALLPAPER_NAME.AMBER_MAUVE,
      type: WALLPAPER_TYPE.GRADIENT,
    }

    const plan = buildWallpaperPublishPlan({ ...baseInput, wallpaper })

    expect(plan.type).toBe('generated')
    if (plan.type !== 'generated') return

    expect(plan.targets).toHaveLength(4)
    expect(plan.theme).toBe('light')
    expect(plan.renderSpec).toBeDefined()
  })

  it('freezes the render input before later draft mutation', () => {
    const wallpaper = {
      ...initState({}).light,
      source: GRADIENT_WALLPAPER_NAME.AMBER_MAUVE,
      type: WALLPAPER_TYPE.GRADIENT,
    }

    const plan = buildWallpaperPublishPlan({ ...baseInput, wallpaper })
    const renderSpec = JSON.stringify(plan.type === 'generated' ? plan.renderSpec : null)
    wallpaper.gradient = null

    expect(plan.type).toBe('generated')
    if (plan.type !== 'generated') return

    expect(JSON.stringify(plan.renderSpec)).toBe(renderSpec)
  })
})
