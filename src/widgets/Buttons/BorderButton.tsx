import type { ReactNode } from 'react'

import ArrowSVG from '~/icons/ArrowSimple'

import Button from './Button'

import useSalon, { cn } from './salon/border_button'
import useWallpaper from '~/hooks/useWallpaper'

type TProps = {
  children: ReactNode
  space?: number
  className?: string
}

export default ({ children, space = 2, className }: TProps) => {
  const s = useSalon()

  const { background } = useWallpaper()

  return (
    <div className={s.wrapper}>
      <ArrowSVG className={s.arrow} />
      <div className={s.background}>
        <div className={s.realBg} style={{ background }} />
        <Button space={space} className={cn(s.button, className)} noBorder>
          {children}
        </Button>
      </div>
    </div>
  )
}
