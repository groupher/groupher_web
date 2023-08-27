import styled from 'styled-components'

import css, { theme } from '@/css'

import MoreSVG from '@/icons/menu/MoreL'
import EditSVG from '@/icons/EditPen'
import ArrowSVG from '@/icons/Arrow'
import SettingSVG from '@/icons/Setting'

import Input from '@/widgets/Input'

import { Wrapper as BarWrapper } from './tag_bar'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  opacity: 0.5;

  ${BarWrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const EditIcon = styled(EditSVG)<{ onClick: () => void }>`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  margin-right: -4px;

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const MoreIcon = styled(MoreSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const SettingIcon = styled(SettingSVG)<{ onClick: () => void }>`
  ${css.size(11)};
  fill: ${theme('article.digest')};
  margin-left: 5px;
  cursor: pointer;
`

export const ArrowUpIcon = styled(ArrowSVG)`
  ${css.size(11)};
  fill: ${theme('article.digest')};
  transform: rotate(90deg);
  margin-right: 6px;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
export const ArrowDownIcon = styled(ArrowUpIcon)`
  transform: rotate(-90deg);
`

export const InputWrapper = styled.div`
  width: auto;
`
export const Inputer = styled(Input)`
  width: 180px;
  height: 30px;
  margin-left: 10px;
`
