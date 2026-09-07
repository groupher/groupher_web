import { cn } from '~/css'
import type { TBgRenderSpec } from '~/lib/bg'
import { getPatternLayerStyle } from '~/render/BgRenderer/helper'

type TProps = {
  branch: TBgRenderSpec
  patternSize: string
  theme: 'light' | 'dark'
}

export default function StaticPreviewBranch({ branch, patternSize, theme }: TProps) {
  return (
    <div
      className={cn(
        'wallpaper-preview-branch abs-full bg-center',
        theme === 'light' ? 'wallpaper-preview-light' : 'wallpaper-preview-dark',
      )}
      style={{ filter: branch.filter, background: branch.background }}
    >
      {branch.hasPattern && branch.patternImage && (
        <div className='abs-full-pe-none' style={getPatternLayerStyle(branch, patternSize)} />
      )}
    </div>
  )
}
