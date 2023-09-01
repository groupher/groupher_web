import styled from 'styled-components'
import Link from 'next/link'

import css, { WIDTH, theme } from '@/css'
import Img from '@/Img'

import ArrowSVG from '@/icons/Arrow'

export const Wrapper = styled.div`
  ${css.columnGrow('align-center')};
`
export const CoverImage = styled(Img)`
  width: 100%;
  height: 220px;
  object-fit: cover;
`
export const MainWrapper = styled.div`
  width: 100%;
  max-width: ${WIDTH.COMMUNITY.CONTENT};
  margin-left: 108px;
  position: relative;
`
export const SocialWrapper = styled.div`
  position: absolute;
  right: 50px;
  bottom: 90px;
`
export const LogoWrapper = styled.div`
  position: relative;
  ${css.size(100)};
  margin-top: -50px;
  z-index: 2;
  ${css.row('align-both')};
  border-radius: 5px;
  background: white;
  box-shadow: ${css.cardShadow};
`
export const Logo = styled(Img)`
  ${css.size(60)};
`
export const CommunityInfo = styled.div`
  ${css.column('justify-center')};
  margin-top: 18px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 22px;
  font-weight: 600;
`
export const Digest = styled.div`
  ${css.row('align-center')};
  margin-top: 6px;
`
export const BackHome = styled(Link)`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
`
export const Divider = styled.div`
  width: 1px;
  height: 14px;
  margin-left: 10px;
  margin-right: 10px;
  border-right: 1px solid;
  border-right-color: ${theme('article.digest')};
  opacity: 0.8;
`

export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
  margin-right: 5px;
`
export const Desc = styled.div`
  color: ${theme('hint')};
  font-size: 15px;
`
export const LogoHolder = styled(Img)`
  fill: ${theme('banner.desc')};
  width: 50px;
  height: 50px;
  opacity: 0.6;
  margin-top: 3px;
`
