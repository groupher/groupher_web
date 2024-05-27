/*
 *
 * CommunityEditor
 *
 */

import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useMetric from '@/hooks/useMetric'

import Header from './Header'
import Banner from './Banner'
import Content from './Content'

import { useStore } from './store'
import { Wrapper, InnerWrapper, ContentWrapper } from './styles'
import { useInit } from './logic'

const CommunityEditor: FC = () => {
  const store = useStore()
  useInit(store)
  const metric = useMetric()

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

export default observer(CommunityEditor)
