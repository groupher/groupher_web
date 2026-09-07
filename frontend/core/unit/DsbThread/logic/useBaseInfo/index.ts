import type { TEditFunc } from '~/spec'

import useHelper from '../useHelper'
import useDangerZone, { type TRet as TUseDangerZone } from './useDangerZone'
import useInfo, { type TRet as TUseInfo } from './useInfo'
import useLogos, { type TRet as TUseLogos } from './useLogos'
import useMediaReports, { type TRet as TUseMediaReports } from './useMediaReports'
import useSocialLinks, { type TRet as TUseSocialLinks } from './useSocialLinks'

type TRet = TUseInfo &
  TUseLogos &
  TUseMediaReports &
  TUseSocialLinks &
  TUseDangerZone & {
    loading: boolean
    saving: boolean
    edit: TEditFunc
  }

/** Exposes base info state and actions through the shared React hook boundary. */
export default function useBaseInfo(): TRet {
  const { edit, isPending } = useHelper()

  const useInfoData = useInfo()
  const useLogosData = useLogos()
  const useMediaReportsData = useMediaReports()
  const useSocialLinksData = useSocialLinks()
  const useDangerZoneData = useDangerZone()

  return {
    edit,
    loading: false,
    saving: isPending,
    ...useInfoData,
    ...useLogosData,
    ...useSocialLinksData,
    ...useMediaReportsData,
    ...useDangerZoneData,
  }
}
