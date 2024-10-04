import type { FC } from 'react'

import useSalon from '../styles/third_part'

const ThirdPart: FC = () => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <div>ThirdPart</div>
    </div>
  )
}

export default ThirdPart
