import { FC } from 'react'

import { mockUsers } from '@/mock'

import { Brick, Br } from '@/widgets/Common'
import Checker from '@/widgets/Checker'
import ArticleCatState from '@/widgets/ArticleCatState'
import Upvote from '@/widgets/Upvote'
import CommentsCount from '@/widgets/CommentsCount'

import {
  Wrapper,
  Item,
  Title,
  FalseChecker,
  ConnectLine,
  Tip,
  CheckIcon,
  WebhookIcon,
  AuthIcon,
} from '../../styles/dashboard_intros/cms_tab/content_card'

const ContentCard: FC = () => {
  const users = mockUsers(2)
  return (
    <Wrapper>
      <Tip left={80} top={90}>
        <AuthIcon />
        支持先审核后发布
      </Tip>
      <Tip left={58} top={138}>
        <WebhookIcon />
        Webhook 回调
      </Tip>
      <Tip left={52} top={188}>
        <CheckIcon />
        日志追溯
      </Tip>

      <ConnectLine left={180} top={124} />
      <Item>
        <FalseChecker />
        <Brick $width={390} left={28} $opacity={0.06} />
      </Item>

      <Item $strip>
        <FalseChecker />
        <Brick $width={390} left={28} $opacity={0.06} />
      </Item>

      <Item>
        <FalseChecker />
        <Brick $width={200} left={28} $opacity={0.05} />
      </Item>

      <Item $strip>
        <FalseChecker />
        <Brick $width={390} left={28} $opacity={0.05} />
      </Item>

      <Item>
        <FalseChecker />
        <Brick $width={390} left={28} $opacity={0.05} />
      </Item>
      <Item>
        <FalseChecker />
        <Brick $width={390} left={28} $opacity={0.05} />
      </Item>
      <Item $highlight>
        <Checker checked size="small" top={1} />
        <Title>支持离线同步</Title>
        <ArticleCatState left={10} right={12} />
        <Upvote type="general" avatarList={users} right={15} count={5} />
        <CommentsCount count={8} size="medium" />
      </Item>
      <Br top={5} />
      <Item>
        <FalseChecker />
        <Brick $width={390} left={28} $opacity={0.05} />
      </Item>
      <Item $strip>
        <FalseChecker />
        <Brick $width={390} left={28} $opacity={0.04} />
      </Item>
      <Item>
        <FalseChecker />
        <Brick $width={390} left={28} $opacity={0.03} />
      </Item>
    </Wrapper>
  )
}

export default ContentCard
