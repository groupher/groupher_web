'use client'

import useMetric from '@/hooks/useMetric'

import { Wrapper, InnerWrapper } from '@/widgets/Article/styles/post'

const Layout = ({ children }) => {
  const metric = useMetric()

  return (
    <Wrapper metric={metric}>
      {/* <FixedHeader show={!inViewport} article={viewingArticle} metric={metric} /> */}
      <InnerWrapper metric={metric}>{children}</InnerWrapper>
    </Wrapper>
  )
}

export default Layout
