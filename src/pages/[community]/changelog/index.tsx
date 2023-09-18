import { GetServerSideProps } from 'next'
import { Provider } from 'mobx-react'

import { HCN } from '@/constant/name'
import { THREAD } from '@/constant/thread'
import { useStore } from '@/stores/init'

import {
  isArticleThread,
  ssrBaseStates,
  ssrFetchPrepare,
  ssrPagedArticleSchema,
  ssrPagedArticlesFilter,
  ssrParseDashboard,
} from '@/utils'

import GlobalLayout from '@/containers/layout/GlobalLayout'
import ChangeLogContent from '@/containers/content/CommunityContent/ChangeLogContent'

import { P } from '@/schemas'

const thread = THREAD.CHANGELOG

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

  const resp = await loader(context)

  const { community, pagedChangelogs } = resp
  const dashboard = ssrParseDashboard(community)

  const initProps = {
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
      ...dashboard,
    },
    changelogThread: {
      pagedChangelogs,
    },
  }

  return { props: { errorCode: null, ...initProps } }
}

const CommunityChangelogPage = (props) => {
  const store = useStore(props)

  return (
    <Provider store={store}>
      <GlobalLayout>
        <ChangeLogContent />
      </GlobalLayout>
    </Provider>
  )
}

export default CommunityChangelogPage
