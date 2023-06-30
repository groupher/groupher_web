import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import AdderSVG from '@/icons/Plus'
import ImageSVG from '@/icons/Image'

export const Wrapper = styled.div`
  /* width: 100%; */
  margin-bottom: 20px;
`
export const Adder = styled.div`
  ${css.flex('align-center')};
  margin-left: 25px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const AddIcon = styled(AdderSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
  margin-right: 7px;
  opacity: 0.6;
`
export const AddTitle = styled.div`
  font-size: 14px;
  margin-top: 1px;
  color: ${theme('article.digest')};
  margin-right: 12px;
`

export const ImageIcon = styled(ImageSVG)`
  ${css.size(18)};
  fill: ${theme('article.digest')};
`
