/*
 *
 * CommunityEditor
 *
 */

import { FC } from 'react'

import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import type { TMetric } from '@/spec'
import METRIC from '@/constant/metric'

import Header from './Header'
import Banner from './Banner'
import Content from './Content'

import type { TStore } from './store'
import { Wrapper, InnerWrapper, ContentWrapper } from './styles'
import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:CommunityEditor')

type TProps = {
  communityEditor?: TStore
  metric?: TMetric
}

const CommunityEditorContainer: FC<TProps> = ({
  communityEditor: store,
  metric = METRIC.COMMUNITY_EDITOR,
}) => {
  useInit(store)
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

export default bond(CommunityEditorContainer, 'communityEditor') as FC<TProps>
