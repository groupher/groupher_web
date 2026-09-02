import useDsb from '~/query/useDsbConfig'
import type { TMediaReport, TSocialItem } from '~/spec'

type TABoutInfo = {
  homepage: string | null
  cities: string[]
  techstacks: string[]
  socialLinks: readonly TSocialItem[]
  mediaReports: readonly TMediaReport[]
}

/** Exposes about info state and actions through the shared React hook boundary. */
export default function useAboutInfo(): TABoutInfo {
  const dsb$ = useDsb()

  const { homepage = '', city = '', techstack = '', socialLinks = [], mediaReports = [] } = dsb$

  return {
    homepage: homepage || null,
    cities: city ? city.split(',') : [],
    techstacks: techstack ? techstack.split(',') : [],
    socialLinks,
    mediaReports,
  }
}
