import type { TActive } from '~/spec'
import styled, { css, theme } from '~/css'
import RatioSVG from '~/icons/Ratio'

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
export const Item = styled.div<TActive>`
  font-size: 14px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  border: 1px solid transparent;
  border-radius: 3px;
  border-color: ${({ $active }) => ($active ? theme('article.digest') : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  padding: 1px 6px;
  cursor: pointer;
  background: white;
  box-shadow: ${css.cardShadow};

  &:hover {
    border-color: ${theme('article.digest')};
  }

  transition: all 0.2s;
`
export const Icon = styled(RatioSVG)`
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
