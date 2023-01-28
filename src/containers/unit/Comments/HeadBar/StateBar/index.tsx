import { FC, memo } from 'react'

import { buildLog } from '@/utils/logger'
import Button from '@/widgets/Buttons/Button'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import Actions from './Actions'
import type { TProps as TBase } from '../index'

import {
  Wrapper,
  TotalTitle,
  TotalCountWrapper,
  TotalNum,
  ActionsWrapper,
  Divider,
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
          共<TotalNum highlight={basicState.isViewerJoined}>{basicState.totalCount}</TotalNum>
          条评论
        </TotalTitle>
      </TotalCountWrapper>
      <ActionsWrapper>
        {loading && <LavaLampLoading right={15} />}

        <Button size="small" space={10} onClick={() => callEditor()}>
          <EditIcon />
          写评论
        </Button>
        <Divider left={15} />

        <Actions mode={mode} isAllFolded={isAllFolded} apiMode={apiMode} />
      </ActionsWrapper>
    </Wrapper>
  )
}

export default memo(StateBar)
