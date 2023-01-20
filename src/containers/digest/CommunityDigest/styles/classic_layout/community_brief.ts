import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

import CommunityFaceLogo from '@/widgets/CommunityFaceLogo'

export const Wrapper = styled.div`
  ${css.flexColumnGrow('align-start')};
`
export const LogoWrapper = styled.div`
  position: relative;
  ${css.size(45)};
  margin-left: -4px;
  ${css.flex('align-both')};
  /* border-radius: 5px; */
  /* background: #e3e3e399; */
`
export const Logo = styled(CommunityFaceLogo)`
  ${css.size(30)};
`
export const CommunityInfo = styled.div`
  ${css.flexColumn('justify-center')};
`
export const Title = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  /* color: #e9eaea; */
  margin-top: 10px;
  margin-right: 10px;
  font-size: 18px;
  letter-spacing: 0.03em;
  font-weight: 600;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  /* color: #e9eaea; */
  opacity: 0.8;
  font-size: 13px;
  margin-top: 5px;
`
export const LogoHolder = styled(Img)`
  fill: ${theme('banner.desc')};
  width: 50px;
  height: 50px;
  opacity: 0.6;
  margin-top: 3px;
`
