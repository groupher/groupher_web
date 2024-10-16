// import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const BannerWrapper = styled.div`
  ${css.row('align-both')};
  width: 60px;
  height: 60px;
  border-radius: 4px;
  border-style: double;
  border-color: ${theme('article.digest')};
  color: ${theme('article.digest')};
`
export const SidebarText = styled.div`
  color: grey;
  text-align: center;
  margin-left: 5px;
`
export const CommunitiesText = styled.div`
  ${css.row('align-both')};
  color: ${theme('article.digest')};
  width: 54px;
  height: 54px;
  border-radius: 4px;
  border-style: double;
  border-color: ${theme('article.digest')};
  text-align: center;
  margin-top: -35px;
  margin-bottom: 8px;
`
export const BannerText = styled.div`
  ${css.cutRest('45px')};
  text-align: center;
`
