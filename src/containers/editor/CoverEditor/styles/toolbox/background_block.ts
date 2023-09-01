import styled from 'styled-components'

import type { TActive, TWallpaperGradientDir } from '@/spec'
import css, { theme } from '@/css'

import ArchSVG from '@/icons/Arch'
import ArrowSVG from '@/icons/Arrow'

import { SettingBlock, SettingTitle } from '.'
import { getBgGradientDirAngle } from '../metric'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.column('align-both')};
`
export const Block = styled(SettingBlock)``

export const Panel = styled.div`
  ${css.column('align-start')};
  width: 320px;
  height: 200px;
  padding: 10px;

  background: ${theme('alphaBg2')};
  backdrop-filter: blur(5px);
`

export const Title = styled.div`
  color: ${theme('article.digest')};
  font-weight: 600;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 8px;
  margin-left: 2px;
`

export const BgRow = styled.div`
  ${css.row('align-center')};
  flex-wrap: wrap;
  gap: 10px;
`

export const Divider = styled.div`
  width: 90%;
  height: 1px;
  background: ${theme('divider')};
  opacity: 0.4;
  margin-top: 15px;
  margin-bottom: 6px;
`

export const DirRow = styled.div`
  ${css.row('align-center')};
  flex-wrap: wrap;
  gap: 0 12px;
`

export const BgImage = styled.div<{ background: string }>`
  ${css.size(23)};
  border-radius: 5px;
  background: ${({ background }) => background || theme('hoverBg')};
  transition: all 0.2s;
  cursor: pointer;
`

export const ImageWrapper = styled.div<TActive>`
  ${css.size(28)};
  ${css.row('align-both')};
  border: 1px solid transparent;
  background-color: white;
  border-radius: 3px;
  box-shadow: ${css.cardShadow};
  border-color: ${({ $active }) => ($active ? theme('article.digest') : 'transparent')};
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};

  &:hover {
    border-color: ${theme('article.digest')};
    opacity: 1;
    cursor: pointer;
  }
`

export const DirWrapper = styled(ImageWrapper)`
  ${css.size(24)};
  ${css.row('align-both')};
`

type TImageBlock = { background: string }
export const ImageBlock = styled.div<TImageBlock>`
  ${css.size(22)};
  border-radius: 5px;
  background: ${({ background }) => background || theme('hoverBg')};
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
export const DirArrowIcon = styled(ArrowSVG)<{ dir: TWallpaperGradientDir }>`
  ${css.size(10)};
  fill: ${theme('article.title')};

  transform: ${({ dir }) => `rotate(${getBgGradientDirAngle(dir)})`};
`
