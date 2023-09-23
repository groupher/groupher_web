import styled from 'styled-components'

import type { TMetric } from '@/spec'
import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.columnGrow('align-center')};
`
export const CoverImage = styled(Img)`
  width: 100%;
  height: 220px;
  object-fit: cover;
`
export const MainWrapper = styled.div<{ metric: TMetric }>`
  width: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};
  position: relative;
`
export const InnerWrapper = styled.div`
  margin-left: 4px;
`
export const SocialWrapper = styled.div`
  position: absolute;
  right: 2px;
  bottom: 95px;
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
  font-size: 14px;
  color: ${theme('hint')};
  margin-top: 5px;
`
export const LogoHolder = styled(Img)`
  fill: ${theme('banner.desc')};
  width: 50px;
  height: 50px;
  opacity: 0.6;
  margin-top: 3px;
`
