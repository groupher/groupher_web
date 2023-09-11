import { GetServerSideProps } from 'next'
import { merge } from 'ramda'
import { Provider } from 'mobx-react'

import { HCN } from '@/constant/name'
import { ROUTE } from '@/constant/route'
import { THREAD } from '@/constant/thread'
import METRIC from '@/constant/metric'
import { useStore } from '@/stores/init'

import {
  isArticleThread,
  ssrBaseStates,
  ssrFetchPrepare,
  ssrError,
  ssrPagedArticleSchema,
  ssrPagedArticlesFilter,
  ssrRescue,
  log,
} from '@/utils'

import GlobalLayout from '@/containers/layout/GlobalLayout'
import DashboardContent from '@/containers/content/CommunityContent/DashboardContent'

import { P } from '@/schemas'

const thread = THREAD.DASHBOARD

const loader = async (context, opt = {}) => {
  const { query } = context
  const { gqClient, userHasLogin } = ssrFetchPrepare(context, opt)

  // 线上环境会直接跳过 index 到这里，有待排查。。
  const community = query.community || HCN

  // query data
  const sessionState = gqClient.request(P.sessionState)
  const curCommunity = gqClient.request(P.community, {
    slug: community,
    userHasLogin,
    incViews: false,
  })

  const filter = ssrPagedArticlesFilter(context, userHasLogin)

  const pagedArticles = isArticleThread(thread)
    ? gqClient.request(ssrPagedArticleSchema(thread), filter)
    : {}

  return {
    filter,
    ...(await sessionState),
    ...(await curCommunity),
    ...(await pagedArticles),
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context

  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  let resp
  try {
    resp = await loader(context)
  } catch (e) {
    log('#### error from server: ', e)
    if (ssrRescue.hasLoginError(e.response?.errors)) {
      // token 过期了，重新用匿名方式请求一次
      await loader(context, { tokenExpired: true })
    } else {
      return ssrError(context, 'fetch', 500)
    }
  }

  const { community } = resp

  const initProps = merge(
    {
      ...ssrBaseStates(resp),
      route: {
        communityPath: community.slug,
        mainPath: community.slug === HCN ? '' : community.slug,
        subPath: thread,
        thread,
      },
      viewing: {
        community,
        activeThread: thread,
      },
      dashboardThread: {
        curTab: ROUTE.DASHBOARD.LAYOUT,
        layoutTab: THREAD.CHANGELOG,
      },
    },
    {
      articleThread: thread,
    },
  )

  return { props: { errorCode: null, ...initProps } }
}

const CommunityDashboardPage = (props) => {
  const store = useStore(props)

  return (
    <Provider store={store}>
      <GlobalLayout metric={METRIC.DASHBOARD}>
        <DashboardContent />
      </GlobalLayout>
    </Provider>
  )
}

export default CommunityDashboardPage
