import { GetServerSideProps } from 'next'
import { Provider } from 'mobx-react'

import METRIC from '@/constant/metric'

import { landingSEO } from '@/utils'

import { useStore } from '@/stores/init'
import GlobalLayout from '@/containers/layout/GlobalLayout'

import LandingPage from '@/widgets/LandingPage'

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
        <LandingPage />
      </GlobalLayout>
    </Provider>
  )
}

export default HomePage
