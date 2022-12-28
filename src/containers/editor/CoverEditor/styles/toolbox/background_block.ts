import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import ArchSVG from '@/icons/Arch'

import { SettingBlock, SettingTitle } from '.'
import { TActive } from '@/spec'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.flexColumn('align-both')};
`

export const Block = styled(SettingBlock)``

export const Panel = styled.div`
  ${css.flex('align-both')};
  gap: 0 15px;
  width: 300px;
  height: 55px;

  background-color: ${theme('hoverBg')};
`

export const BgImage = styled.div<{ background: string }>`
  ${css.size(23)};
  border-radius: 5px;
  /* background-image: linear-gradient(to bottom, #9fbdd3, #ebe6e2); */
  background: ${({ background }) => background || 'transparent'};
`

export const ImageWrapper = styled.div<TActive>`
  ${css.size(28)};
  ${css.flex('align-both')};
  border: 1px solid transparent;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  border-color: ${({ $active }) => ($active ? theme('article.digest') : 'transparent')};
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};

  &:hover {
    border-color: ${theme('article.digest')};
    opacity: 1;
    cursor: pointer;
  }
`
type TImageBlock = { background: string }
export const ImageBlock = styled.div<TImageBlock>`
  ${css.size(22)};
  border-radius: 5px;
  background: ${({ background }) => background || 'transparent'};
`

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
