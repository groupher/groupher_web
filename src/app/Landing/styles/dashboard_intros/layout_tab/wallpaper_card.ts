import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  width: 540px;
  height: 360px;
  border-radius: 14px;
  box-shadow: rgb(147 136 132 / 20%) 1px 3px 24px;
  z-index: 1;
  position: absolute;
  bottom: 100px;
  left: 80px;
`
export const Background = styled.div<{ effect: string }>`
  ${css.row('align-both')}
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  background transparent;
  position: absolute;
  border-radius: 10px;
  top: 5px;
  left:5px;

  ${({ effect }) => effect || ''};
  will-change: transform;
  transition: all 0.3s;
`
export const EditToolbox = styled.div`
  position: relative;
  bottom: -145px;
`
