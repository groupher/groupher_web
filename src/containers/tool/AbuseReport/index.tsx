//

/*
 *
 * AbuseReport
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { buildLog } from '@/logger'
import Modal from '@/widgets/Modal'

import type { TView } from './spec'
import Header from './Header'
import Footer from './Footer'
import ReportContent from './ReportContent'

import { useStore } from './store'
import { Wrapper } from './styles'
import { useInit, close } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:AbuseReport')

const AbuseReport: FC = () => {
  const store = useStore()
  useInit(store)
  const { show, type, view, itemsData, activeItem, viewingArticle } = store

  const { isMobile } = useMobileDetect()

  if (isMobile) {
    return (
      <Wrapper testid="abuse-report">
        <Header type={type} view={view as TView} activeItem={activeItem} article={viewingArticle} />
        <ReportContent view={view as TView} items={itemsData} activeItem={activeItem} />
        <Footer view={view as TView} />
      </Wrapper>
    )
  }

  return (
    <Modal width="500px" show={show} showCloseBtn onClose={() => close()}>
      <Wrapper testid="abuse-report">
        <Header type={type} view={view as TView} activeItem={activeItem} article={viewingArticle} />
        <ReportContent view={view as TView} items={itemsData} activeItem={activeItem} />
        <Footer view={view as TView} />
      </Wrapper>
    </Modal>
  )
}

export default observer(AbuseReport)
