/*
 *
 * Share
 *
 */

import { type FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { observer } from 'mobx-react-lite'
import copy from 'copy-to-clipboard'
import QRCode from 'qrcode.react'

import type { TSpace } from '@/spec'
// import useViewingCommunity from '@/hooks/useViewingCommunity'
import useViewingArticle from '@/hooks/useViewingArticle'

// import ShareOld from '@/containers/tool/Share'

import Tooltip from '@/widgets/Tooltip'
import { toast } from '@/signal'

import { SITE_SHARE_TYPE, SHARE_TYPE } from './constant'
import { parseLinksData, toPlatform } from './helper'
import { Wrapper, Panel, LinkTip, QRTip, Icon } from './styles'

let ModalPanel = null

type TProps = {
  modalOffset?: string
} & TSpace

const Share: FC<TProps> = ({ modalOffset = '', ...restProps }) => {
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

            <QRTip>打开微信 &gt; 发现 &gt; 扫一扫，即可将本文分享到微信。</QRTip>
          </Panel>
        }
        placement="bottom"
        delay={200}
      >
        <Icon.WeChat />
      </Tooltip>

      <Tooltip content={<LinkTip>分享到微博</LinkTip>} placement="bottom" delay={500}>
        <Icon.Weibo
          onClick={() => {
            toPlatform(article, SHARE_TYPE.WEIBO, articleLink)
          }}
        />
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
