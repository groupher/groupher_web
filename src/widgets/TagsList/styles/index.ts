import type { TSizeTSM, TSpace } from '@/spec'

import styled, { css, theme } from '@/css'
// import HashSVG from '@/icons/HashTagLight'

import { getTitleSize } from './metric'

export const Wrapper = styled.div<TSpace>`
  ${css.row('align-center')};
  flex-wrap: wrap;
  gap: 4px 10px;

  margin-left: ${({ left }) => `${left || 0}px`};
  margin-right: ${({ right }) => `${right || 0}px`};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};

  position: relative;
`
export const Tag = styled.div`
  ${css.row('align-center')};
  min-width: 40px;
`
export const Title = styled.div<{ size: TSizeTSM }>`
  color: ${theme('article.info')};
  font-size: ${({ size }) => getTitleSize(size)};
  word-break: keep-all;
  letter-spacing: 0.06em;
`
export const More = styled.div`
  color: ${theme('article.info')};
  font-weight: bold;
  cursor: pointer;
  margin-top: -3px;
`

export const PopoverInfo = styled.div``
