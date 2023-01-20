import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'
import ArchSVG from '@/icons/Arch'
import EmptySVG from '@/icons/Empty'

import type { TLinearBorderPos, TSettingLevel } from '../../spec'
import { LINEAR_BORDER, IMAGE_SHADOW } from '../../constant'

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
  width: 252px;
  height: 180px;
  padding-left: 15px;

  background: ${theme('alphaBg2')};
  backdrop-filter: blur(5px);
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
`
export const RadiusContentsRow = styled.div`
  ${css.flex('align-center')};
  width: 160px;
  gap: 10px 12px;
  margin-left: 13px;
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
  width: 45px;
`
export const BorderRow = styled.div`
  ${css.flex('align-start')};
  gap: 0 18px;
`
export const BorderContentsRow = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  width: 160px;
  gap: 10px 12px;
  margin-left: -5px;
`
type TRadiusBox = { borderRadius: string; shadowLevel: TSettingLevel } & TActive
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
  /* background: ${theme('hoverBg')}; */
  background: white;
  box-shadow: ${({ shadowLevel }) => IMAGE_SHADOW[shadowLevel]};

  &:hover {
    border-color: ${theme('article.digest')};
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`

type TBorderBox = { linearBorderPos: TLinearBorderPos; shadowLevel: TSettingLevel } & TActive
export const BorderBox = styled.div<TBorderBox>`
  position: relative;
  ${css.size(16)};
  border-radius: 3px;

  border: 1px solid transparent;
  background-image: ${({ linearBorderPos, $active }) => getLinearBorder(linearBorderPos, $active)};
  border-image-slice: 1;
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-color: ${({ linearBorderPos, $active }) => {
    if (linearBorderPos === LINEAR_BORDER.ALL) {
      return $active ? theme('article.digest') : '#dcd6ca'
    }

    return 'transparent'
  }};

  box-shadow: ${({ shadowLevel }) => IMAGE_SHADOW[shadowLevel]};

  &:before {
    position: absolute;
    content: '';
    ${css.size(14)};
    border-radius: 3px;
    background: white;
    left: 0;
    top: 0;
  }

  &:hover {
    background-image: ${({ linearBorderPos }) => getLinearBorder(linearBorderPos, true)};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const SelectBox = styled.div<TActive>`
  ${css.size(16)};
  ${css.flex('align-both')};
  border: 1px solid;
  border-radius: 3px;
  background: white;

  border-color: ${({ $active }) => ($active ? theme('article.digest') : 'transparent')};
`
export const ForbidIcon = styled(EmptySVG)<TActive>`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  opacity: ${({ $active }) => ($active ? 1 : 0.8)};

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
