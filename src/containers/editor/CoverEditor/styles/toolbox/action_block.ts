import styled from 'styled-components'

import css, { theme } from '@/css'
import SettingSVG from '@/icons/Setting'
import DeleteSVG from '@/icons/Delete'

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
export const Item = styled.div`
  ${css.row('align-center')};
  font-size: 11px;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 1px 6px;
  cursor: pointer;
  background: white;
  box-shadow: ${css.cardShadow};

  &:hover {
    border-color: ${theme('article.digest')};
  }

  transition: all 0.2s;
`

export const DeleteItem = styled(Item)`
  color: ${theme('baseColor.red')};

  &:hover {
    border-color: ${theme('baseColor.red')};
    font-weight: 500;
  }
`

export const DeleteIcon = styled(DeleteSVG)`
  ${css.size(12)};
  fill: ${theme('baseColor.red')};
  margin-right: 4px;
  margin-top: -1px;
  opacity: 0.6;

  ${DeleteItem}:hover & {
    opacity: 1;
  }
  transition: all 0.2s;
`

export const Icon = styled(SettingSVG)`
  ${css.size(14)};
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
