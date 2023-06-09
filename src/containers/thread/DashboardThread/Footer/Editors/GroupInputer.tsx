import { FC } from 'react'
import Button from '@/widgets/Buttons/Button'

import { Wrapper, Inputer, BackIcon } from '../../styles/footer/editors/group_inputer'

type TProps = {
  value: string
  onChange: (value: string) => void
  onConfirm: () => void
  onCancel: () => void
  width?: string
}

const GroupInputer: FC<TProps> = ({ width = '100%', value, onChange, onConfirm, onCancel }) => {
  return (
    <Wrapper width={width}>
      <Inputer
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="// 新分组名称"
        autoFocus
      />
      <Button
        size="small"
        space={10}
        left={15}
        right={8}
        onClick={() => onConfirm()}
        disabled={value.trim() === ''}
      >
        确定
      </Button>
      <BackIcon onClick={() => onCancel()} />
    </Wrapper>
  )
}

export default GroupInputer
