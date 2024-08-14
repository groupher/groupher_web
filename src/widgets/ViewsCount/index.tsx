import { type FC, memo } from 'react'

import ViewedSVG from '~/icons/article/Viewed'

import useSalon, { cn } from './salon'

type TProps = {
  count: number
}

// <ViewsIcon $highlight />
const ViewsCount: FC<TProps> = ({ count }) => {
  const isHighLight = count >= 400

  const s = useSalon({ isHighLight })

  return (
    <>
      {isHighLight ? (
        <div className={cn(s.wrapper, s.highLight)}>
          <ViewedSVG className={s.viewIcon} />
          <div className={s.count}>{count}</div>
        </div>
      ) : (
        <div className={s.wrapper}>
          <ViewedSVG className={s.viewIcon} />
          <div className={s.count}>{count}</div>
        </div>
      )}
    </>
  )
}

export default memo(ViewsCount)
