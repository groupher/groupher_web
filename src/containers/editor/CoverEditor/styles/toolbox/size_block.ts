import type { TActive } from '~/spec'
import styled, { css, theme } from '~/css'
import ImageSizeSVG from '~/icons/ImageSize'

import { SettingBlock, SettingTitle } from '.'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.column('align-both')};
`
export const Block = styled(SettingBlock)``

export const Panel = styled.div`
  ${css.row('align-both')};
  gap: 0 15px;
  color: ${theme('article.digest')};
  width: 200px;
  height: 50px;

  background: ${theme('alphaBg2')};
  backdrop-filter: blur(5px);
`

type TItem = { fontSize: number } & TActive
export const Item = styled.div<TItem>`
  ${css.size(26)};
  ${css.row('align-both')};
  font-size: ${({ fontSize }) => `${fontSize}px`};
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  border: 1px solid transparent;
  border-radius: 3px;
  border-color: ${({ $active }) => ($active ? theme('article.digest') : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  background: white;
  box-shadow: ${css.cardShadow};

  &:hover {
    border-color: ${theme('article.digest')};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const Icon = styled(ImageSizeSVG)`
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
