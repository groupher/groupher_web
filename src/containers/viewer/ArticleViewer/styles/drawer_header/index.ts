import styled from 'styled-components'

import ArrowSVG from '@/icons/Arrow'
import WarningSVG from '@/icons/Warning'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  height: 36px;
  margin-bottom: 20px;
  padding-left: 2px;
`
export const BackButton = styled.div`
  ${css.row('align-center')};
  padding: 2px 5px;
  margin-left: -5px;
  border: 1px solid;
  border-color: transparent;
  border-radius: 6px;

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(18)};
  fill: ${theme('hint')};
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    fill: ${theme('article.title')};
  }

  ${BackButton}:hover & {
    ${css.size(11)};
    fill: ${theme('article.title')};
  }

  transition: all 0.2s;
`
export const BackText = styled.div`
  color: ${theme('hint')};
  font-size: 13px;
  margin-left: 6px;
  opacity: 0;

  ${BackButton}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const ReportIcon = styled(WarningSVG)`
  ${css.size(18)};
  fill: ${theme('hint')};
  margin-left: 16px;
`
