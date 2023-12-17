/*
 *
 * CommunityEditor
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'

import useMetric from '@/hooks/useMetric'

import Header from './Header'
import Banner from './Banner'
import Content from './Content'

import { useStore } from './store'
import { Wrapper, InnerWrapper, ContentWrapper } from './styles'
import { useInit } from './logic'

const _log = buildLog('C:CommunityEditor')

const CommunityEditor: FC = () => {
  const store = useStore()
  useInit(store)
  const metric = useMetric()

  const {
    step,
    selectTypeStatus,
    setupDomainStatus,
    setupInfoStatus,
    setupExtraStatus,
    finishedStatus,
    validState,
  } = store

  return (
    <Wrapper metric={metric}>
      <Header step={step} showStep={!!selectTypeStatus.communityType} />
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
