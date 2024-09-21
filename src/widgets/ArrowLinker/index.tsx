/*
 *
 * ArrowLinker
 *
 */

import type { FC, ReactNode } from 'react'

import type { TColorName, TSpace } from '~/spec'

import ArrowSVG from '~/icons/ArrowUpRight'
import { Link } from '~/widgets/Common'

import useSalon from './styles'

type TProps = {
  testid?: string
  href?: string
  fontSize?: number
  children: ReactNode
  target?: string
  bold?: boolean
  color?: TColorName | null
} & TSpace

const ArrowLinker: FC<TProps> = ({
  testid = 'arrow-linker',
  fontSize = 13,
  href = '/',
  target = '_blank',
  bold = false,
  color = null,
  children,
  ...spacing
}) => {
  const s = useSalon({ ...spacing })

  return (
    <Link href={href} target={target}>
      <div className={s.wrapper} data-testid={testid}>
        <div className={s.title}>{children}</div>
        <ArrowSVG className={s.arrowIcon} />
      </div>
    </Link>
  )
}

export default ArrowLinker
