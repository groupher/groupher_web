import { FC, memo } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'

import { Wrapper, BackIcon } from './styles/cancel_button'

const _log = buildLog('w:Buttons:CancelButton')

type TProps = {
  text?: string
  onClick?: () => void
} & TSpace

const CancelButton: FC<TProps> = ({ text = '取消', onClick = log, ...restProps }) => {
  return (
    <Wrapper onClick={onClick} {...restProps}>
      <BackIcon />
      {text}
    </Wrapper>
  )
}

export default memo(CancelButton)
