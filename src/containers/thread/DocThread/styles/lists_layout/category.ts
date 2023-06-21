import styled from 'styled-components'

import type { TColorName, TTestable } from '@/spec'
import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import ArrowButton from '@/widgets/Buttons/ArrowButton'

type TWrapper = TTestable & { color?: string }
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('align-center')};
  width: 580px;
  min-height: 80px;
  padding: 30px 0;
  margin-left: -40px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};

  :last-child {
    border-bottom: none;
  }

  transition: all 0.2s;
  background: transparent;
`
export const Cover = styled.div`
  ${css.flexColumn()};
  margin-right: 50px;
`
export const Content = styled.div`
  ${css.flexColumn()};
  flex-grow: 1;
`
export const IconWrapper = styled.div<{ color: TColorName }>`
  ${css.size(50)};
  ${css.flex('align-both')};
  margin-top: -35px;
  border-radius: 12px;
  background: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};
  opacity: 0.8;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 17px;
  font-weight: 500;
`
export const Desc = styled.div`
  ${css.lineClamp(2)};
  color: ${theme('article.digest')}
  font-size: 13px;
  opacity: 0.8;
  margin-top: 5px;
`
export const Footer = styled.div`
  width: 100%;
  margin-top: 16px;
  ${css.flex('align-center', 'justify-between')}
`

export const AuthorHint = styled.div`
  color: ${theme('lightText')};
  font-size: 12px;
`

export const MoreLink = styled(ArrowButton)`
  margin-top: 5px;
  transform: scale(0.9);
`
