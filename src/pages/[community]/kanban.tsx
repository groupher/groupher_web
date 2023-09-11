import { GetServerSideProps } from 'next'
import { merge } from 'ramda'
import { Provider } from 'mobx-react'

import { HCN } from '@/constant/name'
import { THREAD } from '@/constant/thread'
import METRIC from '@/constant/metric'
import { useStore } from '@/stores/init'

import { ssrBaseStates, ssrFetchPrepare, ssrError, ssrRescue, log } from '@/utils'

import GlobalLayout from '@/containers/layout/GlobalLayout'
import KanbanContent from '@/containers/content/CommunityContent/KanbanContent'

import { P } from '@/schemas'

const thread = THREAD.KANBAN

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

  const pagedArticles = gqClient.request(P.groupedKanbanPosts, { community })

  return {
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

  const { community, groupedKanbanPosts } = resp

  const initProps = merge(
    {
      ...ssrBaseStates(resp),
      route: {
        communityPath: community.slug,
        mainPath: community.slug === HCN ? '' : community.slug,
        subPath: thread,
        thread,
      },

      kanbanThread: groupedKanbanPosts,
      viewing: {
        community,
        activeThread: thread,
      },
    },
    {
      articleThread: thread,
    },
  )

  return { props: { errorCode: null, ...initProps } }
}

const CommunityKanbanPage = (props) => {
  const store = useStore(props)

  log('the kanban thread')

  return (
    <Provider store={store}>
      <GlobalLayout metric={METRIC.COMMUNITY}>
        <KanbanContent />
      </GlobalLayout>
    </Provider>
  )
}

export default CommunityKanbanPage
