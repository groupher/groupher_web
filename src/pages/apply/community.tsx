/*
   this page is for /apply/community
 */

import { useStore } from '@/stores/init'
import { Provider } from 'mobx-react'

import { ROUTE } from '@/constant/route'
import METRIC from '@/constant/metric'

import { ssrFetchPrepare, ssrBaseStates, refreshIfneed, ssrError, log } from '@/utils'

import GlobalLayout from '@/containers/layout/GlobalLayout'
import CommunityEditor from '@/containers/editor/CommunityEditor'

import { P } from '@/schemas'

const loader = async (context, opt = {}) => {
  const { gqClient } = ssrFetchPrepare(context, opt)

  const sessionState = gqClient.request(P.sessionState)

  return {
    ...(await sessionState),
  }
}

export const getServerSideProps = async (context) => {
  let resp
  try {
    resp = await loader(context)
    const { sessionState } = resp
    refreshIfneed(sessionState, `/${ROUTE.APPLY_COMMUNITY}`, context)
  } catch (e) {
    log('#### error from server: ', e)
    return ssrError(context, 'fetch', 500)
  }

  const initProps = {
    ...ssrBaseStates(resp),
  }

  return { props: { errorCode: null, ...initProps } }
}

const ApplyCommunityPage = (props) => {
  const store = useStore(props)

  return (
    <Provider store={store}>
      <GlobalLayout metric={METRIC.COMMUNITY}>
        <CommunityEditor />
      </GlobalLayout>
    </Provider>
  )
}

export default ApplyCommunityPage
