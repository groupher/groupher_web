// import { GetStaticPaths, GetStaticProps } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Provider } from 'mobx-react'
import { getSelectorsByUserAgent } from 'react-device-detect'

import { ARTICLE_THREAD } from '@/constant/thread'
import METRIC from '@/constant/metric'

import { articleSEO, ssrFetchPrepare, ssrRescue, ssrError } from '@/utils'
import { useStore } from '@/stores/init'

import GlobalLayout from '@/containers/layout/GlobalLayout'
import ArticleDigest from '@/containers/digest/ArticleDigest'
import ArticleContent from '@/containers/content/ArticleContent'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { P } from '@/schemas'

let respCache = null

const loader = async (context, opt = {}) => {
  const { query } = context
  const { gqClient } = ssrFetchPrepare(context, opt)

  // query data
  const sessionState = gqClient.request(P.sessionState)
  const post = gqClient.request(P.post, { id: query.id, userHasLogin: false })

  return {
    ...(await sessionState),
    ...(await post),
  }
}

/**
const loader = async (params) => {
  const gqClient = makeGQClient('')
  const { id } = params

  const post = gqClient.request(P.post, { id, userHasLogin: false })

  return {
    ...(await post),
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx

  const resp = await loader(params)

  return {
    props: {
      viewing: {
        post: resp.post,
        activeThread: ARTICLE_THREAD.POST,
      },
    },
    revalidate: 5,
  }
}
 */

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
      if (ssrRescue.hasLoginError(e.response?.errors)) {
        // token 过期了，重新用匿名方式请求一次
        await loader(context, { tokenExpired: true })
      } else {
        return ssrError(context, 'fetch', 500)
      }
    }
  }

  const initProps = {
    globalLayout: {
      isMobile: device?.isMobile,
    },
    viewing: {
      post: resp.post,
      activeThread: ARTICLE_THREAD.POST,
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

  const { viewing, globalLayout } = props
  const { post } = viewing

  const seoConfig = articleSEO(ARTICLE_THREAD.POST, post)

  return (
    <Provider store={store}>
      <GlobalLayout metric={METRIC.ARTICLE} seoConfig={seoConfig}>
        <ArticleDigest isMobile={globalLayout.isMobile} />
        <ArticleContent isMobile={globalLayout.isMobile} />
      </GlobalLayout>
    </Provider>
  )
}

export default PostPage
