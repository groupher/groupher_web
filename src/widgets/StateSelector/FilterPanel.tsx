import { FC, memo } from 'react'

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
  activeState: string
  onSelect: (state: string) => void
}

const FilterPanel: FC<TProps> = ({ activeState, onSelect }) => {
  return (
    <Wrapper>
      <SelectItem active={false} onClick={() => console.log('clickde')}>
        <TodoIcon />
        <Title>代办</Title>
      </SelectItem>
      <SelectItem active={false} onClick={() => console.log('clickde')}>
        <WipIcon />
        <Title>进行中</Title>
      </SelectItem>
      <SelectItem active={false} onClick={() => console.log('clickde')}>
        <DoneIcon />
        <Title>已完成</Title>
      </SelectItem>

      <RejectSection>
        <RejectSelectItem active={false}>
          <RejectIndexIcon />
          <RejectTitle>拒绝</RejectTitle>
          <By>原因:</By>
        </RejectSelectItem>
        <RejectGroup>
          <SelectItem active={false} onClick={() => console.log('clickde')}>
            <RejectIcon />
            <Title>不修复</Title>
          </SelectItem>
          <SelectItem active={false} onClick={() => console.log('clickde')}>
            <RejectIcon />
            <Title>无计划</Title>
          </SelectItem>
          <SelectItem active={false} onClick={() => console.log('clickde')}>
            <RejectIcon />
            <Title>重复问题</Title>
          </SelectItem>
          <SelectItem active={false} onClick={() => console.log('clickde')}>
            <RejectIcon />
            <Title>无法重现</Title>
          </SelectItem>
        </RejectGroup>
      </RejectSection>
    </Wrapper>
  )
}

export default memo(FilterPanel)
