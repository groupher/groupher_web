import styled, { css, theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
`
export const Logo = styled(Img)`
  ${css.size(58)};
  margin-bottom: 18px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 28px;
  font-weight: 500;

  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;
  opacity: 0.9;
`
export const Desc = styled.div`
  ${css.row('align-center')};
  font-size: 18px;
  color: ${theme('hint')};
  margin-top: 12px;
  margin-bottom: 38px;
`
export const Highlight = styled.span`
  color: ${theme('article.title')};
  margin-left: 1px;
  margin-right: 1px;
  font-weight: 500;
`
export const Buttons = styled.div`
  ${css.row('align-center')};
  gap: 0 18px;
  margin-bottom: 25px;
`
