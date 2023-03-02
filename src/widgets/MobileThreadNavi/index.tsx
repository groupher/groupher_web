import { FC, memo } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import type { TCommunity, TCommunityThread } from '@/spec'
import { ROUTE } from '@/constant/route'

import { toast } from '@/utils/helper'

import Tooltip from '@/widgets/Tooltip'
import { Divider } from '@/widgets/Common'

import { Wrapper, Title, ArrowIcon, Panel, Item, ShareItem } from './styles'

type TProps = {
  testid?: string

  community: TCommunity
  threads: TCommunityThread[]
  active: string
}

const MobileThreadNav: FC<TProps> = ({
  testid = 'mobile-thread-nav',
  community,
  threads,
  active,
}) => {
  const curThread = threads.filter((t) => t.raw === active)[0] as TCommunityThread

  return (
    <Wrapper>
      <Tooltip
        content={
          <Panel>
            {threads.map((thread) => (
              <Item key={thread.raw} href={`/${community.raw}/${thread.raw}`}>
                {thread.title}
              </Item>
            ))}
            <Divider top={0} bottom={0} />
            <Item href={`/${community.raw}/${ROUTE.DASHBOARD.DASHBOARD}`}>管理后台</Item>
            <CopyToClipboard text={community.title}>
              <ShareItem onClick={() => toast('success', '已复制到剪切板')}>分享链接</ShareItem>
            </CopyToClipboard>
          </Panel>
        }
        placement="bottom"
        trigger="click"
        noPadding
      >
        <Wrapper>
          <Title>{curThread?.title || '管理后台'}</Title>
          <ArrowIcon />
        </Wrapper>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(MobileThreadNav)
