/*
   this page is for /user/xxx
 */

import { Provider } from 'mobx-react'

import METRIC from '@/constant/metric'
import { ssrGetParam, ssrFetchPrepare, ssrBaseStates, ssrError, refreshIfneed, log } from '@/utils'

import { useStore } from '@/stores/init'

import GlobalLayout from '@/containers/layout/GlobalLayout'
import UserContent from '@/containers/content/UserContent'

import { P } from '@/schemas'

const loader = async (context, opt = {}) => {
  const login = ssrGetParam(context, 'login')

  const { gqClient, userHasLogin } = ssrFetchPrepare(context, opt)

  const sessionState = gqClient.request(P.sessionState)
  const user = gqClient.request(P.user, { login, userHasLogin })

  return {
    ...(await sessionState),
    ...(await user),
  }
}

export const getServerSideProps = async (context) => {
  // const query = queryStringToJSON(context.req.url)

  let resp
  try {
    resp = await loader(context)
    const { user, sessionState } = resp
    refreshIfneed(sessionState, `/user/${user.login}`, context)
  } catch (e) {
    log('#### error from server: ', e)
    return ssrError(context, 'fetch', 500)
  }

  const { user, subscribedCommunities } = resp

  const initProps = {
    ...ssrBaseStates(resp),
    // userContent: { activeThread: query.tab || USER_THREAD.PROFILE },
    viewing: { user },
    userProfile: { subscribedCommunities },
  }

  return {
    props: { errorCode: null, namespacesRequired: ['general'], ...initProps },
  }
}

const UserPage = (props) => {
  const store = useStore(props)

  return (
    <Provider store={store}>
      <GlobalLayout metric={METRIC.USER}>
        <UserContent />
      </GlobalLayout>
    </Provider>
  )
}

export default UserPage
