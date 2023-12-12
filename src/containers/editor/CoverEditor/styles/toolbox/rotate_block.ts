import styled, { css, theme } from '@/css'
import RotateSVG from '@/icons/Rotate'

import { SettingBlock, SettingTitle } from '.'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.column('align-both')};
`

export const Block = styled(SettingBlock)``

export const Panel = styled.div`
  ${css.row('align-both')};
  color: ${theme('article.digest')};
  width: 220px;
  height: 100px;

  background: ${theme('alphaBg2')};
  backdrop-filter: blur(5px);
  position: relative;
`

export const Reset = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 10px;
  color: ${theme('article.digest')};

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`

export const Icon = styled(RotateSVG)`
  ${css.size(20)};
  fill: ${theme('article.digest')};
  opacity: 0.7;

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
