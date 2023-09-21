import styled from 'styled-components'

import css, { WIDTH, theme } from '@/css'
import ArrowSVG from '@/icons/Arrow'
import HomeSVG from '@/icons/Home'
import CommunityFaceLogo from '@/widgets/CommunityFaceLogo'

export const Wrapper = styled.div`
  ${css.column('align-center')};
  margin-top: 20%;
  padding-left: 8px;
  width: 180px;
`
export const MainWrapper = styled.div`
  width: 100%;
  max-width: ${WIDTH.COMMUNITY.CONTENT};
  position: relative;
`
export const LogoWrapper = styled.div`
  position: relative;
  ${css.size(30)};
  z-index: 2;
  ${css.row('align-both')};
  margin-top: 20px;
`
export const Logo = styled(CommunityFaceLogo)`
  ${css.size(30)};
`
export const CommunityInfo = styled.div`
  ${css.column('justify-center')};
  margin-top: 14px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 18px;
  font-weight: 600;
`
export const Digest = styled.div`
  ${css.row('align-center')};
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
  margin-right: 5px;
`
export const GlobalIcon = styled(HomeSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: 1px;
  margin-right: 10px;
  margin-top: 1px;
`

export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-top: 3px;
  ${css.lineClamp(2)};
`
