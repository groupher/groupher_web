import useGlowLight from '~/hooks/useGlowLight'

import useSalon from './salon/glow_background'

export default () => {
  const s = useSalon()

  const { glowType } = useGlowLight()
  if (!glowType) return null

  return <div className={s.wrapper} style={{ background: s.bgStyle }} />
}
