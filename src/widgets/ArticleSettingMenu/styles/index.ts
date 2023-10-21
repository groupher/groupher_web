import styled from 'styled-components'

import type { TTestable } from '@/spec'

import SettingSVG from '@/icons/Setting'
import { WithMargin } from '@/widgets/Common'
import css, { theme } from '@/css'

export const Wrapper = styled(WithMargin).attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>``

export const Title = styled.div``

export const SettingIcon = styled(SettingSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-left: 16px;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 1;
    fill: ${theme('article.title')};
  }

  transition: all 0.2s;
`
export const MainPanel = styled.div`
  padding: 8px;
  padding-right: 4px;
  width: 148px;
`
export const MenuItem = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  height: 30px;
  width: 100%;
  padding: 2px 8px;
  padding-right: 0;
  border-radius: 5px;

  &:hover {
    background: ${theme('hoverBg')};
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
export const DangerMenuItem = styled(MenuItem)`
  &:hover {
    background: ${theme('rainbow.redBg')};
    color: ${theme('rainbow.red')};
    cursor: pointer;
  }
`

export const ItemDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${theme('popover.borderColor')};
  margin-top: 10px;
  margin-bottom: 10px;
`
