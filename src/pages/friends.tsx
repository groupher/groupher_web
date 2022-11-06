import { GetServerSideProps } from 'next'

import { METRIC } from '@/constant'

import {
  ssrBaseStates,
  ssrFetchPrepare,
  refreshIfneed,
  friendsSEO,
  ssrError,
  log,
} from '@/utils'

import { P } from '@/schemas'
import GlobalLayout from '@/containers/layout/GlobalLayout'
import FriendsContent from '@/containers/content/FriendsContent'

import { useStore } from '@/stores/init'

const loader = async (context, opt = {}) => {
  const { gqClient } = ssrFetchPrepare(context, opt)
  const sessionState = gqClient.request(P.sessionState)

  return {
    ...(await sessionState),
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let resp
  try {
    resp = await loader(context)
    const { sessionState } = resp

    refreshIfneed(sessionState, '/friends', context)
  } catch (e) {
    log('#### error from server: ', e)
    return ssrError(context, 'fetch', 500)
  }

  const initProps = {
    ...ssrBaseStates(resp),
  }

  return { props: { errorCode: null, ...initProps } }
}

const FriendsPage = (props) => {
  const store = useStore()
  store.mark(props)

  const seoConfig = friendsSEO()

  return (
    <GlobalLayout metric={METRIC.FRIENDS} seoConfig={seoConfig} noSidebar>
      <FriendsContent />
    </GlobalLayout>
  )
}

export default FriendsPage
