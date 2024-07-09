import type { TGlowEffect } from '~/spec'

import useSubStore from '~/hooks/useSubStore'

export default (): TGlowEffect => {
  const dashboard = useSubStore('dashboard')
  const { wallpaper } = useSubStore('wallpaper')

  const { glowType, glowFixed, glowOpacity } = dashboard

  const changeGlowEffect = (glowType: string): void => dashboard.commit({ glowType })

  return {
    glowType: wallpaper && glowType,
    glowFixed,
    glowOpacity,
    changeGlowEffect,
  }
}
