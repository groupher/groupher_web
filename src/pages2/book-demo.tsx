import { GetServerSideProps } from 'next'
import { Provider } from 'mobx-react'

import METRIC from '@/constant/metric'

import { useStore } from '@/stores/init'
import GlobalLayout from '@/containers/layout/GlobalLayout'

import BookDemo from '@/widgets/BookDemo'

// export const getServerSideProps = async (context) => {
//   return {
//     redirect: {
//       permanent: false,
//       destination: '/home',
//     },
//   }
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initProps = {
    metric: METRIC.HOME,
  }

  return { props: { errorCode: null, ...initProps } }
}

export const HomePage = (props) => {
  const store = useStore(props)

  return (
    <Provider store={store}>
      <GlobalLayout>
        <BookDemo />
      </GlobalLayout>
    </Provider>
  )
}

export default HomePage
