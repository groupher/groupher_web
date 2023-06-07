// import { GetStaticPaths, GetStaticProps } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Provider } from 'mobx-react'
import { getSelectorsByUserAgent } from 'react-device-detect'

import { HCN } from '@/constant/name'
import { ARTICLE_THREAD } from '@/constant/thread'
import METRIC from '@/constant/metric'

import { articleSEO, ssrFetchPrepare, ssrRescue, ssrError } from '@/utils'
import { useStore } from '@/stores/init'

import GlobalLayout from '@/containers/layout/GlobalLayout'
import ArticleDigest from '@/containers/digest/ArticleDigest'
import ArticleContent from '@/containers/content/ArticleContent'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { P } from '@/schemas'

const loader = async (context, opt = {}) => {
  const { query } = context
  const { gqClient } = ssrFetchPrepare(context, opt)

  const community = query.community || HCN

  // query data
  const sessionState = gqClient.request(P.sessionState)
  const post = gqClient.request(P.post, { community, id: query.id, userHasLogin: false })

  return {
    ...(await sessionState),
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