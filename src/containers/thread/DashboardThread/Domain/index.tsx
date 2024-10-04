import type { FC } from 'react'

import useSalon from '../styles/domain'

const Domain: FC = () => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <div>Domain</div>
    </div>
  )
}

export default Domain
