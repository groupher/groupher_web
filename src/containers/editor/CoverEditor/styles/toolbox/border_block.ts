import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'
import ArchSVG from '@/icons/Arch'

import type { TLinearBorderPos } from '../../spec'
import { SettingBlock, SettingTitle } from '.'
import { getLinearBorder } from '../metric'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.flexColumn('align-both')};
`

export const Block = styled(SettingBlock)``

export const Panel = styled.div`
  ${css.flexColumn('justify-center', 'align-start')};
  color: ${theme('article.digest')};
  width: 245px;
  height: 135px;
  padding-left: 15px;

  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
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
export const Row = styled.div`
  ${css.flex('align-center')};
  gap: 0 18px;
`
export const Divider = styled.div`
  width: 90%;
  height: 1px;
  background: ${theme('divider')};
  opacity: 0.4;
  margin-top: 18px;
  margin-bottom: 18px;
`
export const RowTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 11px;
  width: 40px;
`
export const BorderRow = styled.div`
  ${css.flex('align-start')};
  gap: 0 18px;
`
export const BorderContentsRow = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-left: 10px;
`
type TRadiusBox = { borderRadius: string } & TActive
export const RadiusBox = styled.div<TRadiusBox>`
  ${css.size(16)};
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('article.title') : theme('divider'))};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-right: none;
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  background: ${theme('hoverBg')};

  &:hover {
    border-color: ${theme('article.digest')};
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`

type TBorderBox = { linearBorderPos: TLinearBorderPos } & TActive
export const BorderBox = styled.div<TBorderBox>`
  position: relative;
  ${css.size(16)};
  border-radius: 3px;

  border: 1px solid transparent;
  background-image: ${({ linearBorderPos, $active }) => getLinearBorder(linearBorderPos, $active)};
  border-image-slice: 1;
  background-origin: border-box;
  background-clip: content-box, border-box;

  &:before {
    position: absolute;
    content: '';
    ${css.size(14)};
    border-radius: 3px;
    background: ${theme('hoverBg')};
    left: 0;
    top: 0;
  }

  &:hover {
    background-image: ${({ linearBorderPos }) => getLinearBorder(linearBorderPos, true)};
    cursor: pointer;
  }

  transition: all 0.2s;
`
