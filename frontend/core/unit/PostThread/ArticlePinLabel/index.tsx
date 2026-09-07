/*
 *
 * ArticlePinLabel
 *
 */

import type { FC } from 'react'

import { cn } from '~/css'
import PinSVG from '~/icons/Pin'

import useSalon from './salon'

type TProps = {
  className?: string
  isPinned?: boolean
}
const ArticlePinLabel: FC<TProps> = ({ isPinned, className }) => {
  const s = useSalon()

  if (isPinned) return <PinSVG className={cn(s.pinIcon, className)} />

  return null
}

export default ArticlePinLabel
