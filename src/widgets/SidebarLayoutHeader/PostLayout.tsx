/*
 *
 */

import { FC, memo } from 'react'

import PublishButton from '@/widgets/Buttons/PublishButton'

import {
  Wrapper,
  EmptySpace,
  Menu,
  MenuItem,
  MainArea,
  PublishWrapper,
  AccountWrapper,
  AccountIcon,
  Icon,
} from './styles/post_layout'

type TProps = {
  testid?: string
}

const PostLayout: FC<TProps> = ({ testid = 'sidebar-layout-header' }) => {
  return (
    <Wrapper testid={testid}>
      <EmptySpace />
      <MainArea>
        <Menu>
          <Icon.Discuss />
          <MenuItem>讨论区</MenuItem>
        </Menu>
        <PublishWrapper>
          <PublishButton
            thread="post"
            community="home"
            mode="sidebar_layout_header"
            text="参与讨论"
            onClick={() => console.log('## publish')}
            onMenuSelect={() => console.log('## on publish')}
            menuLeft

            // onClick={() => onPublish(ARTICLE_CAT.FEATURE)}
            // onMenuSelect={onPublish}
          />
        </PublishWrapper>
      </MainArea>
      <AccountWrapper>
        <AccountIcon />
      </AccountWrapper>
    </Wrapper>
  )
}

export default memo(PostLayout)
