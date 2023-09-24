import { FC, memo } from 'react'

import type { TArticleState } from '@/spec'
import { ARTICLE_STATE } from '@/constant/gtd'

import usePrimaryColor from '@/hooks/usePrimaryColor'

import {
  Wrapper,
  SelectItem,
  IconWrapper,
  AllIcon,
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
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      <SelectItem
        $active={activeState === ARTICLE_STATE.ALL}
        onClick={() => onSelect(ARTICLE_STATE.ALL)}
      >
        <IconWrapper>
          <AllIcon
            $active={!activeState || activeState === ARTICLE_STATE.ALL}
            primaryColor={primaryColor}
          />
        </IconWrapper>
        <Title
          $active={!activeState || activeState === ARTICLE_STATE.ALL}
          primaryColor={primaryColor}
        >
          全部
        </Title>
      </SelectItem>

      <SelectItem
        $active={activeState === ARTICLE_STATE.TODO}
        onClick={() => onSelect(ARTICLE_STATE.TODO)}
      >
        <IconWrapper>
          <TodoIcon $active={activeState === ARTICLE_STATE.TODO} primaryColor={primaryColor} />
        </IconWrapper>
        <Title $active={activeState === ARTICLE_STATE.TODO} primaryColor={primaryColor}>
          代办项
        </Title>
      </SelectItem>
      <SelectItem
        $active={activeState === ARTICLE_STATE.WIP}
        onClick={() => onSelect(ARTICLE_STATE.WIP)}
      >
        <IconWrapper>
          <WipIcon $active={activeState === ARTICLE_STATE.WIP} primaryColor={primaryColor} />
        </IconWrapper>
        <Title $active={activeState === ARTICLE_STATE.WIP} primaryColor={primaryColor}>
          进行中
        </Title>
      </SelectItem>
      <SelectItem
        $active={activeState === ARTICLE_STATE.DONE}
        onClick={() => onSelect(ARTICLE_STATE.DONE)}
      >
        <IconWrapper>
          <DoneIcon $active={activeState === ARTICLE_STATE.DONE} primaryColor={primaryColor} />
        </IconWrapper>
        <Title $active={activeState === ARTICLE_STATE.DONE} primaryColor={primaryColor}>
          已完成
        </Title>
      </SelectItem>

      <SelectItem
        $active={activeState === ARTICLE_STATE.REJECT_DUP}
        onClick={() => onSelect(ARTICLE_STATE.REJECT_DUP)}
      >
        <IconWrapper>
          <RejectIcon
            $active={activeState === ARTICLE_STATE.REJECT_DUP}
            primaryColor={primaryColor}
          />
        </IconWrapper>
        <Title $active={activeState === ARTICLE_STATE.REJECT_DUP} primaryColor={primaryColor}>
          回绝
        </Title>
      </SelectItem>
    </Wrapper>
  )
}

export default memo(FilterPanel)
