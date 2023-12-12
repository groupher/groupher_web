import Link from 'next/link'

import type { TActive, TColor } from '@/spec'
import styled, { css, theme, rainbow } from '@/css'
import { WithMargin } from '@/widgets/Common'

export const NormalWrapper = styled(WithMargin)`
  ${css.row('align-center')};
  gap: 0 16px;

  ${css.media.mobile`
    display: none;
  `};
`
export const FloatWrapper = styled(NormalWrapper)`
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 18px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding: 5px 30px;
  padding-right: 0;
  background: ${theme('alphaBg')};
  margin-top: -4px;
  margin-left: -100px;
`
type TTitle = TActive & TColor
export const Title = styled(Link)<TTitle>`
  color: ${({ $active, $color }) =>
    $active ? rainbow($color, 'article.title') : theme('article.digest')};
  font-size: 14px;
  opacity: ${({ $active }) => ($active ? 1 : 0.9)};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  filter: ${({ $active }) => ($active ? 'brightness(1.2)' : '')};

  text-decoration: none;
  padding: 3px 10px;
  border-radius: 5px;

  &:hover {
    color: ${({ $color }) => rainbow($color, 'article.title')};
    filter: brightness(1.2);
    opacity: 1;
    cursor: pointer;
    background: ${theme('hoverBg')};
  }

  transition: all 0.2s;
`
