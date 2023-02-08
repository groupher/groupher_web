import styled from 'styled-components'

import type { TSizeTSM, TSpace } from '@/spec'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import { getIconSize, getTitleSize, getInnerSpace } from './metric'

export const Wrapper = styled.div<TSpace>`
  ${css.flex('align-center')};

  margin-left: ${({ left }) => `${left || 0}px`};
  margin-right: ${({ right }) => `${right || 0}px`};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};

  position: relative;
`
export const Tag = styled.div`
  ${css.flex('align-center')};
  margin-right: 5px;
  min-width: 40px;
`
type THashSign = { color: string; size: TSizeTSM }
export const DotSign = styled.div<THashSign>`
  background: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};
  ${({ size }) => css.circle(getIconSize(size))};
  margin-right: 2px;
  margin-right: ${({ size }) => `${getInnerSpace(size)}px`};
`
export const LabelDotSign = styled.div<THashSign>`
  background: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};
  ${css.circle(8)};
  margin-right: 4px;
`
export const Title = styled.div<{ size: TSizeTSM }>`
  color: ${theme('article.info')};
  font-size: ${({ size }) => getTitleSize(size)};
  margin-left: 3px;
  word-break: keep-all;
  letter-spacing: 0.06em;
`
export const SolidTitle = styled.div<{ size: TSizeTSM; color: string }>`
  /* color: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)}; */
  color: ${theme('article.info')};
  font-size: 13px;
  margin-left: 3px;
  word-break: keep-all;
  letter-spacing: 0.06em;
  margin-right: 10px;
`
export const More = styled.div`
  color: ${theme('article.info')};
  font-weight: bold;
  cursor: pointer;
  margin-top: -3px;
`

export const PopoverInfo = styled.div``
