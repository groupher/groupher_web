import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  transition: all 0.2s;
  width: 200px;

  ${css.media.mobile`
    width: auto;
    max-width: 150px;
  `};
`
export const LogoWrapper = styled.div`
  position: relative;
  width: 20px;
`
export const Logo = styled(Img)`
  ${css.size(20)};
`
export const CommunityInfo = styled.div`
  ${css.column('justify-center')};
  margin-left: 10px;
`
export const TitleWrapper = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-size: 16px;
  font-weight: 600;
`
export const TitleText = styled.span`
  margin-right: 10px;
`
export const LogoHolder = styled(Img)`
  fill: ${theme('banner.desc')};
  width: 50px;
  height: 50px;
  @media (max-height: 800px) {
    width: 40px;
    height: 40px;
  }
  opacity: 0.6;
  margin-top: 3px;
`
