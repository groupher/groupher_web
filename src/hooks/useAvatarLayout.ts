import type { TAvatarLayout } from '@/spec'
import useSubStore from '@/hooks/useSubStore'

export default (): TAvatarLayout => {
  const store = useSubStore('dashboard')

  return store.avatarLayout
}
