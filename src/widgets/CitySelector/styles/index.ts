import { FC } from 'react'
import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

import USSVG from '@/icons/nation/US'
import AUSVG from '@/icons/nation/AU'
import DESVG from '@/icons/nation/DE'
import JPSVG from '@/icons/nation/JP'
import ENSVG from '@/icons/nation/EN'
import CASVG from '@/icons/nation/CA'
import THSVG from '@/icons/nation/TH'
import SGSVG from '@/icons/nation/SG'

export const Wrapper = styled.div`
  ${css.rowWrap('align-center')};
  color: ${theme('article.digest')};
  width: 300px;
  margin-top: 14px;
  gap: 12px 14px;
`
type TBox = TActive & { radius: number; hasFlag: boolean }
export const Box = styled.div<TBox>`
  ${css.row('align-both')};
  gap: 0 7px;
  font-size: 13px;
  padding: ${({ hasFlag }) => (hasFlag ? '2px 10px' : '2px 15px')};

  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('article.title') : theme('editor.border'))};
  border-radius: ${({ radius }) => `${radius}px;`};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  &:hover {
    border-color: ${theme('article.title')};
    color: ${theme('article.title')};
    cursor: pointer;
  }

  &:active {
    transform: scale(1.1);
  }

  transition: all 0.2s;
`

const FlagIcon = (comp: FC): FC<TActive> => {
  return styled(comp)<TActive>`
    ${css.size(14)};

    opacity: ${({ $active }) => ($active ? 1 : 0.65)};

    &:hover {
      opacity: 0.8;
    }

    transition: all 0.2s;
  `
}

export const Flag = {
  US: FlagIcon(USSVG),
  EN: FlagIcon(ENSVG),
  DE: FlagIcon(DESVG),

  JP: styled(FlagIcon(JPSVG))`
    border: 1px solid;
    border-color: ${theme('hoverBg')};
  `,

  CA: FlagIcon(CASVG),
  AU: FlagIcon(AUSVG),
  TH: FlagIcon(THSVG),

  SG: styled(FlagIcon(SGSVG))`
    border: 1px solid;
    border-color: ${theme('hoverBg')};
  `,
}
