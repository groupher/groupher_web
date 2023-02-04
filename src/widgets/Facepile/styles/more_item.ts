import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css, { theme } from '@/utils/css'
import { pixelAdd } from '@/utils/dom'

import type { TAvatarSize } from '../spec'
import { Wrapper as BaseWrapper } from '.'
import { getAvatarSize } from './metric'

const BaseAvatarItem = styled.li<{ size: string }>`
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
  position: relative;
  width: ${({ size }) => getAvatarSize(size)};
  z-index: 0;
  ${BaseWrapper}:hover & {
    margin-left: 0;
    z-index: 0;
  }
`
export const Wrapper = styled(BaseAvatarItem)`
  ${css.media.mobile`display: none`};
`
type TTextMore = { size: TAvatarSize; total: number; avatarLayout: TAvatarLayout }
export const TextMore = styled.div<TTextMore>`
  font-size: 17px;
  ${({ size }) => css.size(pixelAdd(getAvatarSize(size) as string, -3))};
  ${css.flex('align-both')};

  background-color: ${theme('hoverBg')};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '5px' : '100%')};
  padding-left: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '7px' : '5px')};
`
export const DotText = styled.div`
  color: ${theme('article.digest')};
  letter-spacing: -1px;
  padding-right: 4px;
  padding-bottom: calc(50% + 5px);
  opacity: 0.6;
`
export const StateInfoWrapper = styled.div`
  width: 95px;
  padding: 8px 10px;
`
export const TotalCommentStateHint = styled.div`
  ${css.flex('justify-end')};
  color: ${theme('article.digest')};
  width: 100%;
  font-size: 12px;
`
export const Focus = styled.span`
  color: ${theme('article.title')};
  font-weight: bold;
  margin-left: 4px;
`
