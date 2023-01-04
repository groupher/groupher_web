import { FC, memo } from 'react'

import { Wrapper, ToggleArrowIcon, ToggleListIcon } from '../styles/article_layout/toggle_btn'

type TProps = {
  open: boolean
  onToggle: (toggle: boolean) => void
}

const ToggleBtn: FC<TProps> = ({ open, onToggle }) => {
  return (
    <Wrapper open={open} onClick={() => onToggle(!open)}>
      {open ? <ToggleArrowIcon /> : <ToggleListIcon />}
    </Wrapper>
  )
}

export default memo(ToggleBtn)
