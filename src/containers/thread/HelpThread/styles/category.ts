import styled from 'styled-components'

import type { TColorName, TTestable } from '@/spec'
import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import ArrowButton from '@/widgets/Buttons/ArrowButton'

type TWrapper = TTestable & { color?: string }
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('align-start')};
  width: 28%;
  min-height: 80px;
  padding: 15px 20px;
  padding-left: 0;
  margin-bottom: 20px;

  transition: all 0.2s;
  background: transparent;
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
  background: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};
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
export const MoreLink = styled(ArrowButton)`
  margin-top: 5px;
  transform: scale(0.8);
  margin-left: -8px;
`
