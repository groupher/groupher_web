import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import ImageSVG from '@/icons/Image'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  background: ${theme('alphaBg')};
  margin-bottom: 30px;
  border-radius: 16px;
  width: 566px;
  margin-left: -100px;
  position: relative;
  border: 1px solid;
  border-color: #cfd9de;
  overflow: hidden;
`
export const CoverWrapper = styled.div`
  ${css.flex('align-both')};
  width: 566px;
  height: 296px;
  /* border-radius: 15px; */
  background: ${theme('hoverBg')};
`

export const ImageIcon = styled(ImageSVG)`
  ${css.size(80)};
  fill: ${theme('article.digest')};
  opacity: 0.2;
`

export const Content = styled.div`
  padding: 12px 10px;
`
export const Hint = styled.div`
  font-size: 10px;
  position: absolute;
  right: 8px;
  top: 8px;
  color: ${theme('lightText')};
`
export const URL = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: #536471;
`
export const Title = styled.div`
  display: inline-block;
  line-height: 19px;
  font-size: 14px;
  font-weight: 400;
  font-family: arial, sans-serif;

  color: #0f1419;
  ${css.lineClamp(1)};
`
export const Desc = styled.div`
  font-size: 14px;
  color: #536471;
  ${css.lineClamp(2)};
  line-height: 19px;
`
