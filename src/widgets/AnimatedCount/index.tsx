import { FC, memo } from 'react'

import type { TSize } from '@/spec'
import { SIZE } from '@/constant'
import { Wrapper } from './styles'

import AnimatedCount from './AnimatedCount'
// @ts-ignore
// const LoadingValueContext = createContext()

// props is not accessable in loading
// see https://github.com/vercel/next.js/issues/7906#issuecomment-787686440
// const AnimatedCount = dynamic(() => import('./AnimatedCount'), {
//   /* eslint-disable react/display-name */
//   loading: () => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const { count, active } = useContext(LoadingValueContext) as {
//       count: number
//       size: TSize
//       active: boolean
//     }
//     return (
//       <Wrapper $active={active} count={count}>
//         {count}
//       </Wrapper>
//     )
//   },
//   ssr: false,
// })

export type TProps = {
  count?: number
  size?: TSize
  active?: boolean
}

const Count: FC<TProps> = ({
  count = 0,
  size = SIZE.SMALL,
  active = false,
}) => {
  return (
    <Wrapper $active={active} count={count}>
      <AnimatedCount count={count} size={size} active={active} />
    </Wrapper>
    // <LoadingValueContext.Provider value={{ count, size, active }}>
    //   <AnimatedCount count={count} size={size} active={active} />
    // </LoadingValueContext.Provider>
  )
}

export default memo(Count)
