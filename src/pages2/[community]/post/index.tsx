import { GetServerSideProps } from 'next'
import { mergeRight, toLower } from 'ramda'
import { Provider } from 'mobx-react'
import { getSelectorsByUserAgent } from 'react-device-detect'

import { HCN } from '@/constant/name'
import { THREAD } from '@/constant/thread'
import { useStore } from '@/stores/init'

import {
  isArticleThread,
  ssrBaseStates,
  ssrFetchPrepare,
  ssrError,
  ssrPagedArticleSchema,
  ssrPagedArticlesFilter,
  ssrParseArticleThread,
  ssrParseDashboard,
  ssrParseWallpaper,
  ssrRescue,
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
    slug: community,
    userHasLogin,
  })

  // tmply
  const pagedArticleTags = isArticleThread(thread)
    ? gqClient.request(P.pagedArticleTags, {
        filter: {
          community,
          thread: singular(thread, 'upperCase'),
        },
      })
    : {}

  const filter = ssrPagedArticlesFilter(context, userHasLogin)

  const pagedArticles = isArticleThread(thread)
    ? gqClient.request(ssrPagedArticleSchema(thread), filter)
    : {}

  return {
    filter,
    ...(await pagedArticleTags),
    ...(await sessionState),
    ...(await curCommunity),
    ...(await pagedArticles),
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

  const debugIds = articleThread.articlesThread.pagedPosts?.entries.map((item) => item.innerId)
  console.log('## articleThread: ', debugIds)

  const dashboard = ssrParseDashboard(community)
  const wallpaper = ssrParseWallpaper(community)

  const initProps = mergeRight(
    {
      ...ssrBaseStates(resp),
      globalLayout: {
        isMobile: device?.isMobile,
      },
      route: {
        communityPath: community.slug,
        mainPath: community.slug === HCN ? '' : community.slug,
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
      wallpaperEditor: {
        ...wallpaper,
      },
      dashboardThread: {
        ...dashboard,
      },
    },
    articleThread,
  )

  return { props: { errorCode: null, ...initProps } }
}

const CommunityPage = (props) => {
  const store = useStore(props)

  return (
    <Provider store={store}>
      <GlobalLayout>
        <PostContent />
      </GlobalLayout>
    </Provider>
  )
}

export default CommunityPage
