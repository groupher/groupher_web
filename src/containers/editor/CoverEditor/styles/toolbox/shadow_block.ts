import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'
import ShadowSVG from '@/icons/Shadow'

import { SettingBlock, SettingTitle } from '.'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.flexColumn('align-both')};
`

export const Block = styled(SettingBlock)``

export const Icon = styled(ShadowSVG)`
  ${css.size(20)};
  fill: ${theme('article.digest')};

  ${Block}:hover & {
    fill: ${theme('article.title')};
    cursor: pointer;
  }
`
export const Desc = styled(SettingTitle)`
  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
export const Panel = styled.div`
  ${css.flex('align-both')};
  gap: 0 15px;
  color: ${theme('article.digest')};
  width: 200px;
  height: 55px;

  background-color: ${theme('hoverBg')};
`
type TShadowBox = { boxShadow: string } & TActive
export const ShadowBox = styled.div<TShadowBox>`
  ${css.size(20)};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 4px;
  box-shadow: ${({ boxShadow }) => boxShadow};
  border-color: ${({ $active }) => ($active ? theme('article.digest') : 'none')};

  &:hover {
    border-color: ${theme('article.digest')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
