import styled from 'styled-components'

import type { TSizeSML } from '@/spec'

import SIZE from '@/constant/size'
import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')};
  color: ${theme('article.digest')};
  margin-left: -3%;
  height: 300px;
`
export const Title = styled.div<{ size: TSizeSML }>`
  margin-top: 10px;
  font-size: ${({ size }) => (size === SIZE.LARGE ? '18px' : '16px')};
`
export const Icon = styled(Img)<{ size: TSizeSML }>`
  fill: ${theme('article.digest')};
  ${({ size }) => (size === SIZE.LARGE ? css.size(100) : css.size(70))}
`
