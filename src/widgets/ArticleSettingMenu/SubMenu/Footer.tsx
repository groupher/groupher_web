import type { FC } from 'react'

import type { TSpace } from '~/spec'

import { Wrapper, ArrowIcon, Confirm } from '../styles/sub_menu/footer'

type TProps = {
  onBack: () => void
  onConfirm: () => void
  loading?: boolean
  disabled?: boolean
} & TSpace

const Footer: FC<TProps> = ({
  onBack,
  onConfirm,
  loading = false,
  disabled = false,
  ...restProps
}) => {
  return (
    <Wrapper {...restProps}>
      <ArrowIcon onClick={() => onBack()} />
      <Confirm size="small" onClick={() => onConfirm()} loading={loading} disabled={disabled}>
        确认
      </Confirm>
    </Wrapper>
  )
}

export default Footer
