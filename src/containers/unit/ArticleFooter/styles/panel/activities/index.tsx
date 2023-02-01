import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import type { TAvatarLayout, TSpace } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  position: relative;
  width: 100%;
`
export const Item = styled.div`
  ${css.flex('align-center')};
  color: ${theme('lightText')};
  font-size: 12px;
  margin-bottom: 12px;
  margin-left: 3px;
  position: relative;
  line-height: 20px;

  &:after {
    content: '';
    height: 12px;
    width: 1px;
    background: ${theme('divider')};
    position: absolute;
    bottom: -12px;
    left: 5px;
  }
`
export const Avatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(18)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '4px' : '100%')};
  margin-left: -3px;
  margin-right: 10px;
`
export const Label = styled.div`
  margin-right: 15px;
`
export const Content = styled.div`
  margin-left: 10px;
`
export const Highlight = styled.span<TSpace>`
  color: ${theme('article.title')};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || '5px'};
`
export const LastUpdate = styled.div`
  position: absolute;
  right: 8px;
  top: -1px;
  font-size: 11px;
  color: ${theme('lightText')};
  opacity: 0.8;

  &:hover {
    color: ${theme('article.title')};
    opacity: 1;
    cursor: pointer;
  }

  transition: color 0.2s;
`
