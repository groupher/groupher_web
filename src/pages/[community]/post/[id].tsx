// import { GetStaticPaths, GetStaticProps } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Provider } from 'mobx-react'
import { getSelectorsByUserAgent } from 'react-device-detect'

import { HCN } from '@/constant/name'
import { ARTICLE_THREAD } from '@/constant/thread'
import METRIC from '@/constant/metric'

import {
  ssrFetchPrepare,
  ssrRescue,
  ssrError,
  ssrParseDashboard,
  ssrParseWallpaper,
  ssrBaseStates,
} from '@/utils'
import { useStore } from '@/stores/init'

import GlobalLayout from '@/containers/layout/GlobalLayout'

import ArticlePost from '@/widgets/Article/Post'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { P } from '@/schemas'

const loader = async (context, opt = {}) => {
  const { query } = context
  const { gqClient, userHasLogin } = ssrFetchPrepare(context, opt)

  const community = query.community || HCN

  // query data
  const sessionState = gqClient.request(P.sessionState)
  const curCommunity = gqClient.request(P.community, {
    slug: community,
    userHasLogin,
  })
  const post = gqClient.request(P.post, { community, id: query.id, userHasLogin: false })

  return {
    ...(await sessionState),
    ...(await curCommunity),
    ...(await post),
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context
  const device = getSelectorsByUserAgent(req.headers['user-agent'])
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

  let resp

  try {
    resp = await loader(context)
  } catch (e) {
    if (ssrRescue.hasLoginError(e.response?.errors)) {
      // token 过期了，重新用匿名方式请求一次
      await loader(context, { tokenExpired: true })
    } else {
      return ssrError(context, 'fetch', 500)
    }
  }

  const { community, post } = resp

  const dashboard = ssrParseDashboard(community)
  const wallpaper = ssrParseWallpaper(community)

  const initProps = {
    ...ssrBaseStates(resp),
    metric: METRIC.ARTICLE,
    globalLayout: {
      isMobile: device?.isMobile,
    },
    viewing: {
      community,
      post,
      activeThread: ARTICLE_THREAD.POST,
    },
    wallpaperEditor: {
      ...wallpaper,
    },
    dashboardThread: {
      ...dashboard,
    },
  }

  return {
    props: {
      errorCode: null,
      ...initProps,
    },
  }
}

const PostPage = (props) => {
  const store = useStore(props)

  const { isFallback } = useRouter()
  if (isFallback) return <LavaLampLoading top={20} left={30} />

  return (
    <Provider store={store}>
      <GlobalLayout>
        <ArticlePost />
      </GlobalLayout>
    </Provider>
  )
}

export default PostPage
