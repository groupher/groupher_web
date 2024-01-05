/*
 * Share
 */

import { FC, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TArticle } from '@/spec'
import { buildLog } from '@/logger'

import Modal from '@/widgets/Modal'

import type { TLinksData } from '../spec'
import Platforms from './Platforms'
import InfoPanel from './InfoPanel'

import { Wrapper } from '../styles/modal_panel'

const _log = buildLog('C:Share')

type TProps = {
  show: boolean
  offsetLeft: string
  siteShareType: string
  linksData: TLinksData
  article: TArticle
  testid?: string
  onClose: () => void
  changeType: (type: string) => void
}

const SharePanel: FC<TProps> = ({
  show,
  offsetLeft,
  siteShareType,
  linksData,
  article,
  onClose,
  changeType,
  testid = 'share-panel',
}) => {
  const { isMobile } = useMobileDetect()

  if (isMobile) {
    return (
      <Fragment>
        <Wrapper $testid={testid} type={siteShareType}>
          <Platforms article={article} changeType={changeType} />
          <InfoPanel type={siteShareType} linksData={linksData} />
        </Wrapper>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Modal width="450px" show={show} offsetLeft={offsetLeft} onClose={onClose} showCloseBtn>
        <Wrapper $testid={testid} type={siteShareType}>
          <Platforms article={article} changeType={changeType} />
          <InfoPanel type={siteShareType} linksData={linksData} />
        </Wrapper>
      </Modal>
    </Fragment>
  )
}

export default observer(SharePanel)
