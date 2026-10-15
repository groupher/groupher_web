import { useEffect, useEffectEvent } from 'react'

type Cleanup = () => void
type MountEffect = (...args: never[]) => unknown

const useMount = (effect: MountEffect): void => {
  const runMountEffect = useEffectEvent(effect)

  useEffect(() => {
    const result = runMountEffect()
    if (typeof result === 'function') {
      return result as Cleanup
    }
  }, [])
}

export default useMount
