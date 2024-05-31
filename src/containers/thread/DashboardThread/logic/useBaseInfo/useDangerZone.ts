import useDashboard from '@/hooks/useDashboard'
// import useHelper from '../useHelper'

export type TRet = {
  deleteCommunity: () => void
  archiveCommunity: () => void
  toggleVisiable: () => void
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useDangerZone = (): TRet => {
  const { dashboard: store } = useDashboard()

  // TODO: handle image upload
  const deleteCommunity = () => {
    console.log('## deleteCommunity')
    return
  }

  const archiveCommunity = () => {
    console.log('## archiveCommunity')
    return
  }

  const toggleVisiable = () => {
    console.log('## toggleVisiable')
    return
  }

  return {
    deleteCommunity,
    archiveCommunity,
    toggleVisiable,
  } as TRet
}

export default useDangerZone
