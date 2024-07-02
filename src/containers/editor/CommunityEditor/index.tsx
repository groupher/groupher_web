/*
 *
 * CommunityEditor
 *
 */

import useMetric from '~/hooks/useMetric'

import Header from './Header'
import Banner from './Banner'
import Content from './Content'

import useLogic from './useLogic'
import { Wrapper, InnerWrapper, ContentWrapper } from './styles'

export default () => {
  const metric = useMetric()
  const { step, headerStatus, selectTypeStatus, setupDomainStatus, setupInfoStatus, validState } =
    useLogic()

  return (
    <Wrapper metric={metric}>
      <Header status={headerStatus} />
      <Banner />
      <InnerWrapper metric={metric}>
        <ContentWrapper>
          <Content
            step={step}
            selectTypeStatus={selectTypeStatus}
            setupDomainStatus={setupDomainStatus}
            setupInfoStatus={setupInfoStatus}
            validState={validState}
          />
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}
