import styled, { css, theme } from '@/css'

export const Wrapper = styled.div<{ width: string }>`
  ${css.column()};
  width: ${({ width }) => width};
`
export const Header = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div<{ noDesc: boolean }>`
  ${css.row('align-center')};
  color: ${theme('dashboard.menuCat')};
  font-size: 16px;
  font-weight: 400;
  margin-bottom: ${({ noDesc }) => (noDesc ? '25px' : '0')};
  width: 100%;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  opacity: 0.9;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 25px;
  line-height: 22px;
`
