import styled, { css, theme } from '~/css'

// import InfoSVG from '~/icons/Info'
import Input from '~/widgets/Input'

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
  ${css.column()};
  margin-bottom: 18px;
  width: 100%;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-left: 4px;
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

export const TextareaInput = styled(Input)`
  padding: 10px;
  padding-left: 12px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 1.5;
`
