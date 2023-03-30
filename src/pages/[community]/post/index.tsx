import { GetServerSideProps } from 'next'
import { merge, toLower } from 'ramda'
import { Provider } from 'mobx-react'
import { getSelectorsByUserAgent } from 'react-device-detect'

import type { TCommunity } from '@/spec'
// import { PAGE_SIZE } from '@/config'
import { HCN } from '@/constant/name'
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
  ssrParseArticleThread,
  ssrRescue,
  communitySEO,
  singular,
  log,
} from '@/utils'

import GlobalLayout from '@/containers/layout/GlobalLayout'
import PostContent from '@/containers/content/CommunityContent/PostContent'
// import SidebarContent from '@/containers/content/CommunityContent/SidebarContent'

import { P } from '@/schemas'

const thread = THREAD.POST

let respCache = null

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

  // const subscribedCommunities = gqClient.request(P.subscribedCommunities, {
  //   filter: {
  //     page: 1,
  //     size: PAGE_SIZE.M,
  //   },
  // })

  return {
    filter,
    ...(await pagedArticleTags),
    ...(await sessionState),
    ...(await curCommunity),
    ...(await pagedArticles),
    // ...(await subscribedCommunities),
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context
  const device = getSelectorsByUserAgent(req.headers['user-agent'])

  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  // tmp solution
  // see: https://github.com/vercel/next.js/discussions/19611#discussioncomment-972107
  const isFirstServerCall = req?.url?.indexOf('/_next/data/') === -1

  let resp

  if (!isFirstServerCall) {
    resp = respCache
  } else {
    try {
      resp = await loader(context)
      respCache = resp
    } catch (e) {
      log('#### error from server: ', e)
      if (ssrRescue.hasLoginError(e.response?.errors)) {
        // token 过期了，重新用匿名方式请求一次
        await loader(context, { tokenExpired: true })
      } else {
        return ssrError(context, 'fetch', 500)
      }
    }
  }

  const { filter, community, pagedArticleTags } = resp
  const articleThread = ssrParseArticleThread(resp, thread, filter)

  const initProps = merge(
    {
      ...ssrBaseStates(resp),
      globalLayout: {
        isMobile: device?.isMobile,
      },
      route: {
        communityPath: community.raw,
        mainPath: community.raw === HCN ? '' : community.raw,
        subPath: '',
        thread,
      },
      tagsBar: {
        tags: pagedArticleTags?.entries || [],
      },
      viewing: {
        community,
        activeThread: toLower(thread),
      },
    },
    articleThread,
  )

  return { props: { errorCode: null, ...initProps } }
}

const CommunityPage = (props) => {
  const store = useStore(props)

  const { viewing } = props
  const { community, activeThread } = viewing

  return (
    <Provider store={store}>
      <GlobalLayout
        metric={METRIC.COMMUNITY}
        seoConfig={communitySEO(community as TCommunity, activeThread)}
      >
        <PostContent />
      </GlobalLayout>
    </Provider>
  )
}

export default CommunityPage
