import Link from 'next/link'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  /* border: 1px solid;
  border-color: ${theme('divider')}; */
  padding-left: 35px;
  padding-right: 30px;

  ${css.media.mobile`
    margin-bottom: 20px;
  `};
`
export const BrandInfo = styled.div`
  ${css.row('align-center')};
`

export const BrandText = styled(Link)`
  color: ${theme('article.title')};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const LinksInfo = styled.div`
  ${css.row('align-center')};
  gap: 0 18px;

  ${css.media.mobile`
    display: none;
  `};
`

export const LinkItem = styled(Link)`
  color: ${theme('article.digest')};
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    text-decoration: underline;
    cursor: pointer;
  }
`

export const SocialInfo = styled.div``
