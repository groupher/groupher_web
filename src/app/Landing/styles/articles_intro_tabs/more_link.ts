import Link from 'next/link'

import type { TColor } from '@/spec'

import styled, { css, rainbow } from '@/css'
import ArrowSVG from '@/icons/Arrow'

export const Wrapper = styled(Link)`
  ${css.row('align-center')};
  text-decoration: none;
  opacity: 0.8;
  margin-top: 55px;

  &:hover {
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
  }

  ${css.media.mobile`
    ${css.row('justify-center')};
    margin-top: 20px;
    transform: scale(0.9);
    width: 90%;
  `};

  transition: all 0.2s;
`
export const Text = styled.div<TColor>`
  color: ${({ $color }) => rainbow($color)};
  font-weight: 600;
  font-size: 14px;
`
export const ArrowIcon = styled(ArrowSVG)<TColor>`
  ${css.size(14)};
  fill: ${({ $color }) => rainbow($color)};
  margin-left: 10px;
  transform: rotate(180deg);
`
