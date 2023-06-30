import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import Button from '@/widgets/Buttons/Button'

import {
  Wrapper,
  MainWrapper,
  Focus,
  Note,
  ConfirmButton,
  ActionNotes,
  DeleteNote,
} from '../../styles/cms/filter_bar/action_bar'

type TProps = {
  onCancel: () => void
}

const ActionBar: FC<TProps> = ({ onCancel }) => {
  return (
    <Wrapper>
      <MainWrapper>
        <Note>
          共选中 <Focus>3</Focus> 条，
        </Note>
        <ActionNotes>
          <Note>操作:</Note>
          <DeleteNote>删除</DeleteNote>
        </ActionNotes>
        <SpaceGrow />
        <Button size="small" ghost noBorder right={5} onClick={onCancel}>
          取消
        </Button>
        <ConfirmButton size="small" space={10}>
          确定
        </ConfirmButton>
      </MainWrapper>
    </Wrapper>
  )
}

export default ActionBar
