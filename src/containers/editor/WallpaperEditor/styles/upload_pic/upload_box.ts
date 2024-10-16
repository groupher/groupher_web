import styled, { css, theme } from '~/css'
import UploadSVG from '~/icons/Upload'
import MoreSVG from '~/icons/menu/More'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  position: relative;
  border: 1px dashed;
  border-radius: 5px;
  border-color: ${theme('divider')};
  width: 100%;
  height: 160px;
  cursor: pointer;
  background: #fcfcfc;

  &:hover {
    border: 1px dashed;
    border-color: ${theme('article.info')};
  }
  transition: all 0.2s;
`
export const UploadIcon = styled(UploadSVG)`
  fill: ${theme('article.info')};
  ${css.size(30)};
`
export const Title = styled.div`
  font-size: 14px;
  color: ${theme('article.info')};
  opacity: 0.6;
  margin-top: 15px;
  font-weight: bold;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const Menu = styled.div`
  ${css.size(30)};
  ${css.row('align-both')};
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 4px;
  background: white;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 5px;
  z-index: 2;
`
export const MoreIcon = styled(MoreSVG)`
  ${css.size(16)};
  fill: ${theme('article.info')};
`
