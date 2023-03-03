import { FC, memo } from 'react'

import type { TArticleState } from '@/spec'
import { ARTICLE_STATE } from '@/constant/gtd'

import {
  Wrapper,
  SelectItem,
  TodoIcon,
  WipIcon,
  DoneIcon,
  RejectIcon,
  Title,
} from './styles/filter_panel'

type TProps = {
  activeState: TArticleState
  onSelect: (state: TArticleState) => void
}

const FilterPanel: FC<TProps> = ({ activeState, onSelect }) => {
  return (
    <Wrapper>
      <SelectItem
        active={activeState === ARTICLE_STATE.TODO}
        onClick={() => onSelect(ARTICLE_STATE.TODO)}
      >
        <TodoIcon />
        <Title>代办项</Title>
      </SelectItem>
      <SelectItem
        active={activeState === ARTICLE_STATE.WIP}
        onClick={() => onSelect(ARTICLE_STATE.WIP)}
      >
        <WipIcon />
        <Title>进行中</Title>
      </SelectItem>
      <SelectItem
        active={activeState === ARTICLE_STATE.DONE}
        onClick={() => onSelect(ARTICLE_STATE.DONE)}
      >
        <DoneIcon />
        <Title>已完成</Title>
      </SelectItem>

      <SelectItem
        active={activeState === ARTICLE_STATE.DONE}
        onClick={() => onSelect(ARTICLE_STATE.DONE)}
      >
        <RejectIcon />
        <Title>回绝</Title>
      </SelectItem>
    </Wrapper>
  )
}

export default memo(FilterPanel)
