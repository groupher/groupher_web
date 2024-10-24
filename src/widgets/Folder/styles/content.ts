import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div<{ inactive: boolean }>`
  ${css.row('align-end', 'justify-end')};
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #025061;
  border-radius: 5px;
  border-top-left-radius: 0;
  padding-right: 8px;
  padding-bottom: 6px;

  border: 1px solid;
  border-color: transparent;
  box-shadow: -3px -7px 5px -5px rgb(0 0 0 / 8%);

  flex-grow: 1;
  color: ${theme('article.digest')};

  &:hover {
    border-color: ${({ inactive }) => (inactive ? 'transparent' : '#117eaf')};
    cursor: ${({ inactive }) => (inactive ? 'normal' : 'pointer')};
  }
`
export const Info = styled.div``
export const Text = styled.div`
  color: ${theme('article.digest')};
  font-size: 10px;
  text-align: right;
`
export const Unit = styled(Text)`
  display: inline-block;
`
export const Total = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
  text-align: right;
`
export const LockIcon = styled(Img)`
  position: absolute;
  fill: ${theme('article.digest')};
  ${css.size(11)};

  left: 8px;
  bottom: 9px;
`
