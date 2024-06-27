import Link from 'next/link'

import styled, { css, theme } from '~/css'

import ListSVG from '~/icons/List'

// import Img from '~/Img'
// import { LineDivider } from '~/widgets/Common'
// import DemoSVG from '~/icons/DemoTV'
// import ArrowSVG from '~/icons/ArrowSimple'
// import GithubSVT from '~/icons/social/Github'

export const ListIcon = styled(ListSVG)`
  fill: ${theme('article.digest')};
  ${css.size(15)};
`

export const Wrapper = styled.div`
  ${css.column()};
  padding: 20px 30px;
  gap: 15px;
  height: auto;
  width: 180px;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  opacity: 0.8;
  margin-top: 10px;
`
export const Item = styled(Link)`
  color: ${theme('article.title')};
  font-size: 15px;
  font-weight: 500;

  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &:active {
    text-decoration: none;
  }
`
