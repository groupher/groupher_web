//

/*
 *
 * AbuseReport
 *
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { buildLog } from '@/logger'
import { bond } from '@/mobx'

import Modal from '@/widgets/Modal'

import type { TView } from './spec'
import Header from './Header'
import Footer from './Footer'
import ReportContent from './ReportContent'

import type { TStore } from './store'
import { Wrapper } from './styles'
import { useInit, close } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:AbuseReport')

type TProps = {
  abuseReport?: TStore
  testid?: string
}

const AbuseReportContainer: FC<TProps> = ({ abuseReport: store, testid = 'abuse-report' }) => {
  useInit(store)
  const { show, type, view, itemsData, activeItem, viewingArticle } = store

  const { isMobile } = useMobileDetect()

  if (isMobile) {
    return (
      <Wrapper testid={testid}>
        <Header type={type} view={view as TView} activeItem={activeItem} article={viewingArticle} />
        <ReportContent view={view as TView} items={itemsData} activeItem={activeItem} />
        <Footer view={view as TView} />
      </Wrapper>
    )
  }

  return (
    <Modal width="500px" show={show} showCloseBtn onClose={() => close()}>
      <Wrapper testid={testid}>
        <Header type={type} view={view as TView} activeItem={activeItem} article={viewingArticle} />
        <ReportContent view={view as TView} items={itemsData} activeItem={activeItem} />
        <Footer view={view as TView} />
      </Wrapper>
    </Modal>
  )
}

export default bond(AbuseReportContainer, 'abuseReport') as FC<TProps>
