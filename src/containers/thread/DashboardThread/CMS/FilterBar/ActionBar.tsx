import type { FC } from 'react'

import Button from '~/widgets/Buttons/Button'

import {
  Wrapper,
  MainWrapper,
  Focus,
  Note,
  ConfirmButton,
  ActionNotes,
  DeleteNote,
} from '../../salon/cms/filter_bar/action_bar'

type TProps = {
  onCancel: () => void
  selectedCount: number
}

const ActionBar: FC<TProps> = ({ onCancel, selectedCount }) => {
  return (
    <Wrapper>
      <MainWrapper>
        <Note>
          共选中 <Focus>{selectedCount}</Focus> 条，
        </Note>
        <ActionNotes>
          <Note>操作:</Note>
          <DeleteNote>删除</DeleteNote>
        </ActionNotes>
        <div className="grow" />
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
