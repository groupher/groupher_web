'use client'

import GlobalLayoutWrapper from '@/widgets/GlobalLayout'

const GlobalLayout = ({ children, globalLayout }) => {
  return <GlobalLayoutWrapper globalLayout={globalLayout}>{children}</GlobalLayoutWrapper>
}

export default GlobalLayout
