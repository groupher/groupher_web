import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row()};
`

export const Left = styled.div`
  width: 100px;
  margin-right: 100px;
`
export const Right = styled.div`
  ${css.rowWrap()};
  width: 300px;
  gap: 0 20px;
`
export const Section = styled.div`
  width: 120px;
  height: 80px;
`
export const Hint = styled.div`
  ${css.row('align-center')};
  color: ${theme('lightText')};
  font-size: 13px;
`

export const Num = styled.div`
  color: ${theme('article.title')};
  font-weight: 550;
  font-size: 24px;
`
