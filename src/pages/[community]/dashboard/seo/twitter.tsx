import { GetServerSideProps } from 'next'
import { merge } from 'ramda'
import { Provider } from 'mobx-react'

import type { TCommunity } from '@/spec'
import { PAGE_SIZE } from '@/config'
import { HCN } from '@/constant/name'
import { DASHBOARD_SEO_ROUTE, ROUTE } from '@/constant/route'
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
  communitySEO,
  singular,
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
    raw: community,
    userHasLogin,
  })

  // tmply
  const pagedArticleTags = isArticleThread(thread)
    ? gqClient.request(P.pagedArticleTags, {
        filter: {
          communityRaw: community,
          thread: singular(thread, 'upperCase'),
        },
      })
    : {}

  const filter = ssrPagedArticlesFilter(context, userHasLogin)

  const pagedArticles = isArticleThread(thread)
    ? gqClient.request(ssrPagedArticleSchema(thread), filter)
    : {}

  const subscribedCommunities = gqClient.request(P.subscribedCommunities, {
    filter: {
      page: 1,
      size: PAGE_SIZE.M,
    },
  })

  return {
    filter,
    ...(await pagedArticleTags),
    ...(await sessionState),
    ...(await curCommunity),
    ...(await pagedArticles),
    ...(await subscribedCommunities),
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

  const { community, pagedArticleTags } = resp

  const initProps = merge(
    {
      ...ssrBaseStates(resp),
      route: {
        communityPath: community.raw,
        mainPath: community.raw === HCN ? '' : community.raw,
        subPath: thread,
        thread,
      },
      tagsBar: {
        tags: pagedArticleTags?.entries || [],
      },
      viewing: {
        community,
        activeThread: thread,
      },
      dashboardThread: {
        curTab: ROUTE.DASHBOARD.SEO,
        seoTab: DASHBOARD_SEO_ROUTE.TWITTER,
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

  const { viewing } = props
  const { community, activeThread } = viewing

  return (
    <Provider store={store}>
      <GlobalLayout
        metric={METRIC.COMMUNITY}
        seoConfig={communitySEO(community as TCommunity, activeThread)}
      >
        <DashboardContent />
      </GlobalLayout>
    </Provider>
  )
}

export default CommunityDashboardPage
