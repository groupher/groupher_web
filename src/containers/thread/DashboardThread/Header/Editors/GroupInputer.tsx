import { FC } from 'react'

import SavingBar from '../../SavingBar'

import { Wrapper, Inputer } from '../../styles/footer/editors/group_inputer'

type TProps = {
  value: string
  onChange: (value: string) => void
  onConfirm: () => void
  onCancel: () => void
}

const GroupInputer: FC<TProps> = ({ value, onChange, onConfirm, onCancel }) => {
  return (
    <SavingBar
      onConfirm={onConfirm}
      onCancel={onCancel}
      disabled={value.trim() === ''}
      isTouched
      minimal
    >
      <Wrapper>
        <Inputer
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="// 新分组名称"
          autoFocus
        />
      </Wrapper>
    </SavingBar>
  )
}

export default GroupInputer
