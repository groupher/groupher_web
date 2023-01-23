/*
 *
 * SidebarLayoutHeader
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/utils/logger'

import PublishButton from '@/widgets/Buttons/PublishButton'
import { Wrapper, EmptySpace, MainArea, PublishWrapper, AccountWrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:SidebarLayoutHeader:index')

type TProps = {
  testid?: string
}

const SidebarLayoutHeader: FC<TProps> = ({ testid = 'sidebar-layout-header' }) => {
  return (
    <Wrapper testid={testid}>
      <EmptySpace />
      <MainArea>
        <div>讨论区</div>
        <PublishWrapper>
          <PublishButton
            thread="post"
            community="home"
            mode="sidebar_layout_header"
            text="参与讨论"
            onClick={() => console.log('## publish')}
            onMenuSelect={() => console.log('## on publish')}

            // onClick={() => onPublish(ARTICLE_CAT.FEATURE)}
            // onMenuSelect={onPublish}
          />
        </PublishWrapper>
      </MainArea>
      <AccountWrapper>account</AccountWrapper>
    </Wrapper>
  )
}

export default memo(SidebarLayoutHeader)
