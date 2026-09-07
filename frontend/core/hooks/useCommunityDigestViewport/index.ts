import useCommunityViewport from '~/stores/communityViewport/hooks'

type TRet = {
  enterView: () => void
  leaveView: () => void
  inView: boolean
}

/** Exposes community digest viewport state and actions through the shared React hook boundary. */
export default function useCommunityDigestViewport(): TRet {
  return useCommunityViewport()
}
