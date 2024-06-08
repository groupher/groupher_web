import type { FC } from 'react'

import type { TArticleCat } from '@/spec'

import ArticleCatState from '@/widgets/ArticleCatState'

import {
  Wrapper,
  TargetWrapper,
  Title,
  Footer,
  UpvoteIcon,
  Count,
} from '../../../styles/articles_intro_tabs/kanban_tab/kanban_demo/kanban_item'

type TProps = {
  opacity?: number
  count?: number
  title?: string
  cat?: TArticleCat
  draging?: boolean
  dragTarget?: boolean
}

const KanbanItem: FC<TProps> = ({
  opacity = 1,
  count = 9,
  title = '支持暗黑模式',
  cat = 'FEATURE',
  draging = false,
  dragTarget = false,
}) => {
  if (dragTarget) {
    return (
      <TargetWrapper>
        <div>已解决</div>
      </TargetWrapper>
    )
  }

  return (
    <Wrapper opacity={opacity} $draging={draging}>
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
