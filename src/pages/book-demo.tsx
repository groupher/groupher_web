import { GetServerSideProps } from 'next'
import { Provider } from 'mobx-react'

import METRIC from '@/constant/metric'

import { landingSEO } from '@/utils'

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
  return { props: { errorCode: null } }
}

export const HomePage = (props) => {
  const store = useStore(props)

  const seoConfig = landingSEO()

  return (
    <Provider store={store}>
      <GlobalLayout metric={METRIC.HOME} seoConfig={seoConfig}>
        <BookDemo />
      </GlobalLayout>
    </Provider>
  )
}

export default HomePage
