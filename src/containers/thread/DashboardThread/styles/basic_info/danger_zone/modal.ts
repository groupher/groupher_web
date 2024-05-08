import styled, { css, theme } from '@/css'

// import InfoSVG from '@/icons/Info'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 20px;
  padding-bottom: 0;
  width: 100%;
  height: 100%;
  min-height: 280px;
`
export const Body = styled.div`
  margin-top: 15px;
  flex-grow: 1;
`
export const Footer = styled.div`
  ${css.row('align-end')};
  margin-bottom: 18px;
  width: 100%;
`
export const Desc = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const DangerTitle = styled.div`
  color: ${theme('rainbow.red')};
  font-size: 16px;
  font-weight: 500;
`
export const WarningTitle = styled.div`
  color: ${theme('rainbow.brown')};
  font-size: 16px;
  font-weight: 500;
`
