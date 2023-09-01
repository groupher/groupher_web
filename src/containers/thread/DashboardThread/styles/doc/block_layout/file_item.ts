import styled from 'styled-components'

import css, { theme } from '@/css'

import MoreSVG from '@/icons/menu/More'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-bottom: 6px;
  position: relative;
`
export const Name = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const SettingIcon = styled(MoreSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  position: absolute;
  transform: rotate(90deg);
  top: -7px;
  right: -4px;
  opacity: 0;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
