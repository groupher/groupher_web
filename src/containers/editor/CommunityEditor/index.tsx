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
import { useInit } from './logic'
import { useStore } from './store'
import { Wrapper, InnerWrapper, ContentWrapper } from './styles'

export default () => {
  const store = useStore()
  useInit(store)
  const metric = useMetric()
  const { count, add } = useLogic()

  const {
    step,
    headerStatus,
    selectTypeStatus,
    setupDomainStatus,
    setupInfoStatus,
    setupExtraStatus,
    finishedStatus,
    validState,
  } = store

  return (
    <Wrapper metric={metric}>
      <Header status={headerStatus} />
      <h2>{count}</h2>
      <button onClick={add}>+</button>
      <Banner
        step={step}
        selectTypeStatus={selectTypeStatus}
        setupDomainStatus={setupDomainStatus}
        setupInfoStatus={setupInfoStatus}
        setupExtraStatus={setupExtraStatus}
        finishedStatus={finishedStatus}
        validState={validState}
      />
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
