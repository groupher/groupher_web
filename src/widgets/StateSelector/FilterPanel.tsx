import { FC, memo } from 'react'

import type { TArticleState } from '@/spec'
import { ARTICLE_STATE } from '@/constant'
import { Trans } from '@/utils/i18n'

import {
  Wrapper,
  SelectItem,
  TodoIcon,
  WipIcon,
  DoneIcon,
  RejectIndexIcon,
  RejectIcon,
  RejectGroup,
  RejectSection,
  RejectSelectItem,
  RejectTitle,
  By,
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

      <RejectSection>
        <RejectSelectItem>
          <RejectIndexIcon />
          <RejectTitle>拒绝</RejectTitle>
          <By>原因:</By>
        </RejectSelectItem>
        <RejectGroup>
          <SelectItem
            active={activeState === ARTICLE_STATE.REJECT_NO_FIX}
            onClick={() => onSelect(ARTICLE_STATE.REJECT_NO_FIX)}
          >
            <RejectIcon />
            <Title>{Trans(ARTICLE_STATE.REJECT_NO_FIX)}</Title>
          </SelectItem>
          <SelectItem
            active={activeState === ARTICLE_STATE.REJECT_NO_PLAN}
            onClick={() => onSelect(ARTICLE_STATE.REJECT_NO_PLAN)}
          >
            <RejectIcon />
            <Title>{Trans(ARTICLE_STATE.REJECT_NO_PLAN)}</Title>
          </SelectItem>
          <SelectItem
            active={activeState === ARTICLE_STATE.REJECT_DUP}
            onClick={() => onSelect(ARTICLE_STATE.REJECT_DUP)}
          >
            <RejectIcon />
            <Title>{Trans(ARTICLE_STATE.REJECT_DUP)}</Title>
          </SelectItem>
          <SelectItem
            active={activeState === ARTICLE_STATE.REJECT_REPRO}
            onClick={() => onSelect(ARTICLE_STATE.REJECT_REPRO)}
          >
            <RejectIcon />
            <Title>{Trans(ARTICLE_STATE.REJECT_REPRO)}</Title>
          </SelectItem>
          <SelectItem
            active={activeState === ARTICLE_STATE.REJECT_STALE}
            onClick={() => onSelect(ARTICLE_STATE.REJECT_STALE)}
          >
            <RejectIcon />
            <Title>{Trans(ARTICLE_STATE.REJECT_STALE)}</Title>
          </SelectItem>
        </RejectGroup>
      </RejectSection>
    </Wrapper>
  )
}

export default memo(FilterPanel)
