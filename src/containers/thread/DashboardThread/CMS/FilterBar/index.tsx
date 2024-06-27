import type { FC } from 'react'

import { SpaceGrow } from '~/widgets/Common'
import Button from '~/widgets/Buttons/Button'
import { CONDITION_MODE } from '~/const/mode'
import ConditionSelector from '~/widgets/ConditionSelector'

import ActionBar from './ActionBar'

import {
  Wrapper,
  MainWrapper,
  InputerWrapper,
  SearchIcon,
  ResetIcon,
  Inputer,
  DateRangeWrapper,
  DubbleCheckIcon,
} from '../../styles/cms/filter_bar'
import { batchSelectAll } from '../../logic'

type TProps = {
  triggerCheckbox: (show: boolean) => void
  checkboxActive: boolean
  selectedCount: number
}

const FilterBar: FC<TProps> = ({ checkboxActive, triggerCheckbox, selectedCount }) => {
  return (
    <Wrapper>
      <MainWrapper>
        <Button
          size="small"
          left={-6}
          right={5}
          onClick={() => {
            if (checkboxActive) {
              batchSelectAll(false)
            }
            triggerCheckbox(!checkboxActive)
          }}
          ghost
          noBorder
        >
          <DubbleCheckIcon />
          {checkboxActive && '取消'}
          选择
        </Button>

        <InputerWrapper>
          <SearchIcon />
          <Inputer placeholder="按标题搜索" />
        </InputerWrapper>

        <ConditionSelector mode={CONDITION_MODE.CAT} selected={false} right={20} />
        <ConditionSelector mode={CONDITION_MODE.STATE} selected={false} right={20} />

        <DateRangeWrapper>日期范围(TODO)</DateRangeWrapper>
        <SpaceGrow />
        <Button size="small" ghost noBorder top={-2}>
          <ResetIcon />
          重置
        </Button>
      </MainWrapper>
      {checkboxActive && selectedCount > 0 && (
        <ActionBar
          selectedCount={selectedCount}
          onCancel={() => {
            batchSelectAll(false)
            triggerCheckbox(false)
          }}
        />
      )}
    </Wrapper>
  )
}

export default FilterBar
