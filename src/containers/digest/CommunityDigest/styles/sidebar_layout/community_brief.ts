import styled from 'styled-components'

import css, { WIDTH, theme } from '@/utils/css'

import ArrowSVG from '@/icons/Arrow'
import CommunityFaceLogo from '@/widgets/CommunityFaceLogo'

export const Wrapper = styled.div`
  ${css.flexColumn('align-center')};
`
export const MainWrapper = styled.div`
  width: 100%;
  max-width: ${WIDTH.COMMUNITY.CONTENT};
  position: relative;
  padding: 0 35px;
`
export const LogoWrapper = styled.div`
  position: relative;
  ${css.size(30)};
  z-index: 2;
  ${css.flex('align-both')};
  margin-top: 20px;
`
export const Logo = styled(CommunityFaceLogo)`
  ${css.size(30)};
`
export const CommunityInfo = styled.div`
  ${css.flexColumn('justify-center')};
  margin-top: 14px;
`
export const Title = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  font-size: 18px;
  font-weight: 600;
`
export const Digest = styled.div`
  ${css.flex('align-center')};
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
  margin-right: 5px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  opacity: 0.8;
  font-size: 13px;
`
