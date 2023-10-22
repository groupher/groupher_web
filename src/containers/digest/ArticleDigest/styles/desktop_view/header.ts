import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/css'

import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  position: relative;
  background: transparent;
  width: 100%;
`
export const InnerWrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  height: 54px;
`
export const Community = styled.div`
  ${css.row('align-both')};
  width: 100px;
`
export const CommunityLogo = styled(Img)`
  ${css.size(20)};
`
export const CommunityTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
`

export const Main = styled.div`
  ${css.row('align-both')};
  gap: 0 32px;
  width: 100%;
  height: 100%;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;

  ${css.media.mobile`
    display: none;
  `};
`
export const LinkItem = styled(Link)`
  font-size: 13px;
  color: ${theme('article.digest')};
  font-weight: 400;
  text-decoration: none;

  &:hover {
    font-weight: 500;
    text-decoration: none;
    color: ${theme('article.title')};
  }
`
export const MobileNaviWrapper = styled.div`
  display: none;

  ${css.media.mobile`
    ${css.rowGrow('align-center')};
    margin-left: 10px;
  `}
`
