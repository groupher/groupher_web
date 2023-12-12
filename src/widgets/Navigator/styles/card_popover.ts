import styled, { css, theme } from '@/css'
import CommunityFaceLogo from '@/widgets/CommunityFaceLogo'

export const Wrapper = styled.div`
  ${css.column()};

  padding: 10px;
  width: 320px;
`
export const Body = styled.div`
  ${css.row()};
`
export const CommunityLogo = styled(CommunityFaceLogo)`
  width: 80px;
  height: 80px;
  margin-right: 15px;
`
export const CommunityInfo = styled.div`
  ${css.column()};
`
export const Title = styled.div`
  font-size: 1.2rem;
  color: ${theme('article.title')};
  margin-bottom: 3px;
`
export const Desc = styled.div`
  font-size: 0.9rem;
  color: ${theme('article.digest')};
`

export const Divider = styled.div`
  border-bottom: 1px solid;
  border-bottom-color: ${theme('article.digest')};
  opacity: 0.4;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 10px;
`

export const Footer = styled.div`
  ${css.row('justify-start')};
`
