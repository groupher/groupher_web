import { FC } from 'react'

import type { TArticleCat } from '@/spec'

import ArticleCatState from '@/widgets/ArticleCatState'

import {
  Wrapper,
  Title,
  Footer,
  UpvoteIcon,
  Count,
} from '../../../styles/articles_intro_tabs/kanban_feat/kanban_demo/kanban_item'

type TProps = {
  opacity?: number
  count?: number
  title?: string
  cat?: TArticleCat
}

const KanbanItem: FC<TProps> = ({
  opacity = 1,
  count = 9,
  title = '支持暗黑模式',
  cat = 'FEATURE',
}) => {
  return (
    <Wrapper opacity={opacity}>
      <Title>{title}</Title>

      <Footer>
        <UpvoteIcon />
        <Count>{count}</Count>
        <ArticleCatState cat={cat} noBorder />
      </Footer>
    </Wrapper>
  )
}

export default KanbanItem
