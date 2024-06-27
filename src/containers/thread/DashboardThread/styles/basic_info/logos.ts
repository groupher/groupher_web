import styled, { css, theme } from '~/css'

// import Input from '~/widgets/Input'

export const Wrapper = styled.div`
  width: 310px;
  padding-bottom: 30px;
  margin-bottom: 20px;
`
export const FaviconWrapper = styled.div`
  ${css.size(30)};
`
export const Favicon = styled.div`
  ${css.size(30)};
  background: ${theme('hoverBg')};
  border-radius: 4px;
`
export const LogoWrapper = styled.div`
  ${css.size(70)};
`
export const Logo = styled.div`
  ${css.size(70)};
  background: ${theme('hoverBg')};
  border-radius: 4px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-bottom: 12px;
`
export const Desc = styled.div`
  color: ${theme('hint')};
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
`

export const Row = styled.div`
  ${css.row('align-center')};
`
