import type { TBrandLayout } from '@/spec'
import useSubStore from '@/hooks/useSubStore'

export default (): TBrandLayout => {
  const store = useSubStore('dashboard')

  return store.brandLayout
}
