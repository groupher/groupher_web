import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import Button from '@/widgets/Buttons/Button'
import ConditionSelector from '@/widgets/ConditionSelector'

import { POST_STATE_MENU_ITEMS, POST_CAT_MENU_ITEMS } from '@/constant/menu'

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
          {checkboxActive && <>取消</>}
          选择
        </Button>

        <InputerWrapper>
          <SearchIcon />
          <Inputer placeholder="按标题搜索" />
        </InputerWrapper>
        <ConditionSelector
          mode="category"
          title="分类"
          selected={false}
          menuItems={POST_CAT_MENU_ITEMS}
          right={20}
        />
        <ConditionSelector
          mode="state"
          title="状态"
          selected={false}
          menuItems={POST_STATE_MENU_ITEMS}
          right={20}
        />

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
