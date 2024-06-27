import type { TGlowEffect } from '~/spec'
import useSubStore from '~/hooks/useSubStore'

export default (): TGlowEffect => {
  const store = useSubStore('dashboard')
  const { wallpaper } = useSubStore('wallpaper')

  const { glowType, glowFixed, glowOpacity } = store

  const changeGlowEffect = (glowType: string): void => {
    store.commit({ glowType })
  }

  return {
    glowType: wallpaper && glowType,
    glowFixed,
    glowOpacity,
    changeGlowEffect,
  }
}
