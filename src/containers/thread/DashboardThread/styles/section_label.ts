import styled, { css, theme } from '@/css'

export const Wrapper = styled.div<{ width: string }>`
  ${css.column()};
  width: ${({ width }) => width};
`
export const Header = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div<{ noDesc: boolean }>`
  color: ${theme('dashboard.menuCat')};
  font-size: 16px;
  margin-bottom: ${({ noDesc }) => (noDesc ? '25px' : '0')};
`
export const Desc = styled.div`
  color: ${theme('hint')};
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 25px;
  line-height: 22px;
`
