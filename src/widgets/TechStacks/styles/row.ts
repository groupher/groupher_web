import styled, { css, theme } from '~/css'

import Img from '~/Img'

export const Wrapper = styled.div`
  ${css.rowWrap('align-center')};
  margin-top: 14px;
  margin-left: -10px;
  margin-bottom: 10px;
  width: 100%;
`
export const Block = styled.div`
  ${css.column('align-both')};
  position: relative;
  height: 74px;
  width: 76px;
`
export const ReadOnlyBlock = styled(Block)`
  width: 60px;
`
export const DeleteHint = styled.div`
  color: ${theme('rainbow.red')};
  position: absolute;
  bottom: -8px;
  left: 27px;
  opacity: 0;
  font-size: 12px;
  cursor: pointer;

  ${Block}:hover & {
    opacity: 0.7;
  }

  &:hover {
    opacity: 1;
  }

  transition: opacity 0.2s;
`
export const Logo = styled(Img)`
  ${css.size(22)};
  filter: saturate(0.8);
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  ${css.cutRest('64px')};
  font-size: 13px;
  margin-top: 7px;
`
export const AddBlock = styled(Block)`
  margin-top: -2px;
`
export const AddButton = styled.div`
  ${css.size(23)};
  ${css.row('align-both')};
  background: #00343e;
  font-size: 18px;
  color: ${theme('article.digest')};
  padding-bottom: 2px;

  ${Block}:hover & {
    color: ${theme('article.title')};
    cursor: pointer;
  }
  transition: color 0.1s;
`
export const NoSetHint = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-top: 25px;
  margin-left: 16px;
  letter-spacing: 2px;
`
