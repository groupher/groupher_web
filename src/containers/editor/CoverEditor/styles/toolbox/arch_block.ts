import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'
import ArchSVG from '@/icons/Arch'

import { SettingBlock, SettingTitle } from '.'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.flexColumn('align-both')};
`

export const Block = styled(SettingBlock)``

export const Icon = styled(ArchSVG)`
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
  gap: 0 22px;
  color: ${theme('article.digest')};
  width: 240px;
  height: 55px;

  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
`
type TArchBox = { borderRadius: string } & TActive
export const ArchBox = styled.div<TArchBox>`
  ${css.size(20)};
  border: 2px solid;
  border-color: ${theme('article.digiest')};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-right: none;
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;

  &:hover {
    border-color: ${theme('article.digest')};
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`
