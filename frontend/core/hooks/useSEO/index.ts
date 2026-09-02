import { pick } from 'ramda'

import { SEO_KEYS } from '~/const/seo'
import useDsb from '~/query/useDsbConfig'
import type { TDsdSEOConf } from '~/spec'

/** Exposes seo state and actions through the shared React hook boundary. */
export default function useSEO(): TDsdSEOConf {
  const dsb$ = useDsb()

  return pick(SEO_KEYS, dsb$)
}
