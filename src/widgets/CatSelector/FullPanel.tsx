import { FC, memo } from 'react'

import { FILTER } from '@/constant'

import type { TArticleFilter } from '@/spec'

import {
  Wrapper,
  SelectItem,
  LightIcon,
  BugIcon,
  QuestionIcon,
  OtherIcon,
  RightPart,
  Title,
  Desc,
} from './styles/full_panel'

type TProps = {
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
}

const FullPanel: FC<TProps> = ({ activeFilter, onSelect }) => {
  return (
    <Wrapper>
      <SelectItem
        active={activeFilter.length === FILTER.LEAST_WORDS}
        onClick={() => onSelect({ length: FILTER.LEAST_WORDS })}
      >
        <LightIcon />
        <RightPart>
          <Title>功能需求</Title>
          <Desc>提交需求，功能建议等</Desc>
        </RightPart>
      </SelectItem>

      <SelectItem
        active={activeFilter.length === FILTER.LEAST_WORDS}
        onClick={() => onSelect({ length: FILTER.LEAST_WORDS })}
      >
        <BugIcon />
        <RightPart>
          <Title>Bug</Title>
          <Desc>吐槽使用中遇到的不足，缺陷等</Desc>
        </RightPart>
      </SelectItem>

      <SelectItem
        active={activeFilter.length === FILTER.LEAST_WORDS}
        onClick={() => onSelect({ length: FILTER.LEAST_WORDS })}
      >
        <QuestionIcon />
        <RightPart>
          <Title>求助/提问</Title>
          <Desc>问题求助，使用疑惑等</Desc>
        </RightPart>
      </SelectItem>

      <SelectItem
        active={activeFilter.length === FILTER.LEAST_WORDS}
        onClick={() => onSelect({ length: FILTER.LEAST_WORDS })}
      >
        <OtherIcon />
        <RightPart>
          <Title>其它</Title>
          <Desc>一般讨论，其他话题</Desc>
        </RightPart>
      </SelectItem>
    </Wrapper>
  )
}

export default memo(FullPanel)
