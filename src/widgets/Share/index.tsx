/*
 *
 * Share
 *
 */

import { FC, useEffect, useState } from 'react'
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

import ModalPanel from './ModalPanel'

import { SITE_SHARE_TYPE } from './constant'
import { parseArticleLink, parseLinksData, toPlatform } from './helper'
import { Wrapper, Panel, LinkTip, QRTip, LinkIcon, QRCodeIcon, MoreIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:Share:index')

type TProps = {
  testid?: string
} & TSpace

const Share: FC<TProps> = ({ testid = 'share', ...restProps }) => {
  const article = useViewingArticle()
  const articleLink = parseArticleLink(article)
  const linksData = parseLinksData(article)

  const [showMore, setShowMore] = useState(false)
  const [shareType, setShareType] = useState(SITE_SHARE_TYPE.LINKS)

  return (
    <Wrapper {...restProps}>
      <Tooltip content={<LinkTip>复制链接</LinkTip>} placement="bottom" delay={500}>
        <LinkIcon
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
        <QRCodeIcon />
      </Tooltip>

      <MoreIcon onClick={() => setShowMore(true)} />

      <ModalPanel
        show={showMore}
        offsetLeft="50%"
        siteShareType={shareType}
        changeType={(type) => {
          setShareType(type)
          toPlatform(article, type)
        }}
        linksData={linksData}
        article={article}
        onClose={() => {
          setShowMore(false)
          setShareType(SITE_SHARE_TYPE.LINKS)
        }}
      />
    </Wrapper>
  )
}

export default observer(Share)
