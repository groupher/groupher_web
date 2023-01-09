import styled from 'styled-components'

import type { TColorName, TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

type TWrapper = TTestable & { color?: string }
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn()};
  background: transparent;
  width: 28%;
  min-height: 80px;
  padding: 15px 20px;
  padding-left: 0;
  margin-bottom: 20px;

  transition: all 0.2s;
`

export const Header = styled.div`
  ${css.flexColumn()};
  margin-bottom: 12px;
`
export const IconWrapper = styled.div<{ color: TColorName }>`
  ${css.size(35)};
  border-radius: 12px;
  margin-left: -1px;
  ${css.flex('align-both')};
  background: ${({ color }) => theme(`baseColor.${color.toLowerCase()}Bg`)};
  margin-bottom: 8px;

  filter: saturate(0.7);
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 18px;
  font-weight: 600;
  margin-top: 8px;
`
export const Item = styled.div<{ color: string }>`
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-bottom: 6px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const MoreLink = styled.div`
  color: ${theme('link')};
  font-size: 12px;
  margin-top: 5px;

  &:hover {
    cursor: pointer;
  }

  transition: all 0.2s;
`
