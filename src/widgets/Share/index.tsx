/*
 *
 * Share
 *
 */

import { FC, memo } from 'react'
import copy from 'copy-to-clipboard'
import QRCode from 'qrcode.react'

import { buildLog } from '@/logger'
// import useViewingCommunity from '@/hooks/useViewingCommunity'
import useViewingArticle from '@/hooks/useViewingArticle'

import ShareOld from '@/containers/tool/Share'
import Tooltip from '@/widgets/Tooltip'
import { toast } from '@/signal'

import { parseArticleLink } from './helper'
import { Wrapper, Panel, LinkTip, QRTip, LinkIcon, QRCodeIcon, MoreIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:Share:index')

type TProps = {
  testid?: string
}

const Share: FC<TProps> = ({ testid = 'share' }) => {
  const article = useViewingArticle()

  const articleLink = parseArticleLink(article)

  return (
    <Wrapper>
      <Tooltip content={<LinkTip>复制链接</LinkTip>} placement="bottom">
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
      >
        <QRCodeIcon />
      </Tooltip>

      <MoreIcon />

      <ShareOld size={14} offsetLeft="54%" left={15} />
    </Wrapper>
  )
}

export default memo(Share)
