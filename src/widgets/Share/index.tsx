/*
 *
 * Share
 *
 */

import { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { observer } from 'mobx-react'
import copy from 'copy-to-clipboard'
import QRCode from 'qrcode.react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'
// import useViewingCommunity from '@/hooks/useViewingCommunity'
import useViewingArticle from '@/hooks/useViewingArticle'

// import ShareOld from '@/containers/tool/Share'

import Tooltip from '@/widgets/Tooltip'
import { toast } from '@/signal'

import { SITE_SHARE_TYPE } from './constant'
import { parseLinksData, toPlatform } from './helper'
import { Wrapper, Panel, LinkTip, QRTip, Icon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:Share:index')

let ModalPanel = null

type TProps = {
  testid?: string
  modalOffset?: string
} & TSpace

const Share: FC<TProps> = ({ testid = 'share', modalOffset = '', ...restProps }) => {
  const { article, articleLink } = useViewingArticle()
  const linksData = parseLinksData(article, articleLink)

  const [showMore, setShowMore] = useState(false)
  const [shareType, setShareType] = useState(SITE_SHARE_TYPE.LINKS)

  useEffect(() => {
    ModalPanel = dynamic(() => import('./ModalPanel'), {
      ssr: false,
    })
  }, [showMore])

  return (
    <Wrapper {...restProps}>
      <Tooltip content={<LinkTip>复制链接</LinkTip>} placement="bottom" delay={500}>
        <Icon.Link
          onClick={() => {
            copy(articleLink)
            toast('已复制到剪切板')
          }}
        />
      </Tooltip>

      <Tooltip
        content={
          <Panel>
            <QRCode value={articleLink} size={120} />

            <QRTip>打开自带扫一扫，即可将本内容分享到应用</QRTip>
          </Panel>
        }
        placement="bottom"
        delay={200}
      >
        <Icon.QRCode />
      </Tooltip>

      <Tooltip content={<LinkTip>更多分享</LinkTip>} placement="bottom" delay={500}>
        <Icon.More onClick={() => setShowMore(true)} />
      </Tooltip>

      {ModalPanel && (
        <ModalPanel
          show={showMore}
          offsetLeft={modalOffset}
          siteShareType={shareType}
          changeType={(type) => {
            setShareType(type)
            toPlatform(article, type, articleLink)
          }}
          linksData={linksData}
          article={article}
          onClose={() => {
            setShowMore(false)
            setShareType(SITE_SHARE_TYPE.LINKS)
          }}
        />
      )}
    </Wrapper>
  )
}

export default observer(Share)
