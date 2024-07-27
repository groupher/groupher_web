import type { ReactNode } from 'react'

import useSalon from './styles/menu_bar'

type TProps = {
  children: ReactNode
  onClick: () => void
  active: boolean
}

export default ({ children, active, onClick }: TProps) => {
  const s = useSalon({ active })

  return (
    <div className={s.wrapper} onClick={() => onClick()}>
      {children}
    </div>
  )
}
