import { FC, memo } from 'react'

import { buildLog } from '@/utils/logger'
import Button from '@/widgets/Buttons/Button'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import SortMenu from './SortMenu'
import type { TProps as TBase } from '../index'

import {
  Wrapper,
  TotalTitle,
  TotalCountWrapper,
  TotalNum,
  ActionsWrapper,
  EditIcon,
} from '../../styles/head_bar/state_bar'

const log = buildLog('C:HeaderBar')

type TProps = Pick<TBase, 'mode' | 'apiMode' | 'isAllFolded' | 'loading' | 'basicState'> & {
  callEditor?: () => void
}

const StateBar: FC<TProps> = ({
  basicState,
  mode,
  isAllFolded,
  loading,
  apiMode,
  callEditor = log,
}) => {
  return (
    <Wrapper>
      <TotalCountWrapper>
        <TotalTitle>
          评论
          <TotalNum>{basicState.totalCount}</TotalNum>
        </TotalTitle>
      </TotalCountWrapper>
      <ActionsWrapper>
        {loading && <LavaLampLoading right={15} />}

        <SortMenu mode={mode} isAllFolded={isAllFolded} apiMode={apiMode} />
        <Button size="small" space={10} onClick={() => callEditor()}>
          <EditIcon />
          写评论
        </Button>
      </ActionsWrapper>
    </Wrapper>
  )
}

export default memo(StateBar)
