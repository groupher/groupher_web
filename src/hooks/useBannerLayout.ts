import type { TBannerLayout } from '@/spec'
import useSubStore from '@/hooks/useSubStore'

export default (): TBannerLayout => {
  const store = useSubStore('dashboard')

  return store.bannerLayout
}
