import { FC } from 'react'

import {
  Wrapper,
  TopActions,
  UpvoteIcon,
  BottomActions,
  ActionItem,
  DeleteIcon,
  ShareIcon,
  ActionBlock,
  Title,
  CommentIcon,
  EmojiIcon,
} from '../../styles/feature_wall/mobile_first/action_mask'

type TProps = {
  hovering: boolean
}

const ActionsMask: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper $hovering={hovering}>
      <TopActions>
        <ActionBlock>
          <UpvoteIcon />
        </ActionBlock>
        <ActionBlock>
          <CommentIcon />
        </ActionBlock>
        <ActionBlock>
          <EmojiIcon />
        </ActionBlock>
      </TopActions>
      <BottomActions>
        <ActionItem>
          <ShareIcon />
          <Title>分享到</Title>
        </ActionItem>
        <ActionItem>
          <DeleteIcon />
          <Title>删除</Title>
        </ActionItem>
      </BottomActions>
    </Wrapper>
  )
}

export default ActionsMask
