import { type FC, memo } from 'react'

import type { TSpace } from '@/spec'

import { Wrapper, BackIcon } from './styles/cancel_button'

type TProps = {
  text?: string
  onClick?: () => void
} & TSpace

const CancelButton: FC<TProps> = ({ text = '取消', onClick = console.log, ...restProps }) => {
  return (
    <Wrapper onClick={onClick} {...restProps}>
      <BackIcon />
      {text}
    </Wrapper>
  )
}

export default memo(CancelButton)
