import { GetServerSideProps } from 'next'
import { Provider } from 'mobx-react'

import { ARTICLE_THREAD } from '@/constant/thread'
import METRIC from '@/constant/metric'

import { ssrBaseStates, ssrRescue, ssrFetchPrepare, ssrGetParam } from '@/utils'
import { P } from '@/schemas'

import { useStore } from '@/stores/init'
import GlobalLayout from '@/containers/layout/GlobalLayout'
import ArticleEditor from '@/containers/editor/ArticleEditor'

const loader = async (context, opt = {}) => {
  const { gqClient } = ssrFetchPrepare(context, opt)

  const sessionState = gqClient.request(P.sessionState)

  return {
    ...(await sessionState),
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let resp
  try {
    resp = await loader(context)
  } catch ({ response: { errors } }) {
    if (ssrRescue.hasLoginError(errors)) {
      resp = await loader(context, { tokenExpired: true })
    }
  }

  const id = ssrGetParam(context, 'id')

  const initProps = {
    ...ssrBaseStates(resp),
    metric: METRIC.ARTICLE_EDITOR,
    articleEditor: {
      mode: 'update',
    },
    viewing: {
      post: { id },
      viewingThread: ARTICLE_THREAD.POST,
    },
  }

  return { props: { errorCode: null, ...initProps } }
}

export const UpdatePostPage = (props) => {
  const store = useStore(props)

  return (
    <Provider store={store}>
      <GlobalLayout>
        <ArticleEditor />
      </GlobalLayout>
    </Provider>
  )
}

export default UpdatePostPage
