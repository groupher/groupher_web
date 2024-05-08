import styled, { css, theme } from '@/css'

// import InfoSVG from '@/icons/Info'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 20px;
  width: 100%;
`
export const Body = styled.div`
  margin-top: 15px;
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
