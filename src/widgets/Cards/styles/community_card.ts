import styled from 'styled-components'
import Link from 'next/link'

// import type { TTestable } from '@/spec'

// import Img from '@/Img'
import css, { theme } from '@/css'

import UserSVG from '@/icons/User'
import CommunityFaceLogo from '@/widgets/CommunityFaceLogo'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 200px;
  min-height: 100px;
  padding-left: 8px;
`
export const CommunityLogo = styled(CommunityFaceLogo)`
  ${css.size(30)};
`
export const SubsInfo = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
`
export const Info = styled.div`
  ${css.flexColumn()};
  flex-grow: 1;
  margin-left: 16px;
`
export const Header = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 6px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: bold;
`
export const SubInfo = styled.div`
  width: 100%;
  ${css.flex('align-center')};
  margin-top: 2px;
`
export const Raw = styled(Link)`
  text-decoration: none;
  color: ${theme('article.digest')};
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 1px;
  position: relative;
  padding-left: 6px;

  &:before {
    content: '/';
    position: absolute;
    top: 2px;
    left: 0;
    font-size: 12px;
    margin-right: 2px;
  }

  &:hover {
    text-decoration: underline;
    color: ${theme('article.digest')};
    opacity: 1;
  }
`
export const UserIcon = styled(UserSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  margin-right: 3px;
  opacity: 0.8;
`
export const UserCount = styled.div`
  fill: ${theme('article.title')};
  font-size: 13px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
`
