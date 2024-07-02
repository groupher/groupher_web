/*
 *
 * CommunityEditor
 *
 */

import useMetric from '~/hooks/useMetric'

import Header from './Header'
import Banner from './Banner'
import Content from './Content'

import { Wrapper, InnerWrapper, ContentWrapper } from './styles'

export default () => {
  const metric = useMetric()

  return (
    <Wrapper metric={metric}>
      <Header />
      <Banner />
      <InnerWrapper metric={metric}>
        <ContentWrapper>
          <Content />
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}
