import styled from 'styled-components'

import { COLORS } from '@/constant'
import type { TColorName, TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

import PlusSVG from '@/icons/BoxAdd'

type TWrapper = TTestable
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('align-both')};
  position: relative;
  background: transparent;
  width: 225px;
  height: 300px;
  min-height: 80px;
  padding: 15px 20px;
  padding-left: 0;

  border: 2px dotted;
  border-color: ${theme('divider')};
  border-radius: 8px;
  padding: 15px;

  transition: all 0.2s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    border-color: ${theme('article.digest')};
    cursor: pointer;
  }
`
export const AddIcon = styled(PlusSVG)`
  ${css.size(45)};
  fill: ${theme('article.digest')};
  opacity: 0.2;

  ${Wrapper}:hover & {
    opacity: 0.5;
  }
`

export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 600;
  opacity: 0.5;
  margin-top: 15px;

  ${Wrapper}:hover & {
    opacity: 0.8;
  }
`
