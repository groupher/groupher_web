import { useMemo } from 'react'

import { normalizeFooterLinks, normalizeFooterOnelineLinks } from '~/lib/footerLinks'
import useDsb from '~/query/useDsbConfig'
import type { TFooterLinks } from '~/spec'

/** Exposes footer links state and actions through the shared React hook boundary. */
export default function useFooterLinks(): TFooterLinks {
  const { footerLayout, footerLinks, footerOnelineLinks } = useDsb()

  return useMemo(
    () => ({
      layout: footerLayout,
      links: normalizeFooterLinks(footerLinks),
      onelineLinks: normalizeFooterOnelineLinks(footerOnelineLinks),
    }),
    [footerLayout, footerLinks, footerOnelineLinks],
  )
}
