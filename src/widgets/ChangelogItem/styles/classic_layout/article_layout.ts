import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'
import ShareSVG from '@/icons/Share'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-start')};
  padding-top: 12px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  margin-bottom: 30px;

  :last-child {
    border-bottom: none;
  }
`
export const Main = styled.div`
  width: 100%;
  min-height: 220px;
  padding-bottom: 30px;

  &:hover {
    cursor: pointer;
  }
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 20px;
  font-weight: 580;
  margin-bottom: 10px;
  margin-top: 30px;

  ${css.media.mobile`
    font-size: 18px;
    margin-top: 20px;
  `};
`
export const TagsWrapper = styled.div`
  ${css.flex('align-both', 'justify-between')};
  margin-bottom: 15px;
`
export const Body = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  line-height: 1.85;
`
export const Footer = styled.div`
  ${css.flex('align-center')};
  margin-top: 20px;
  margin-left: -5px;
  margin-right: 12px;
`

export const DateTime = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  opacity: 0.6;
  margin-top: -2px;
  margin-right: 5px;
`
export const Version = styled.span`
  color: ${theme('article.digest')};
  font-size: 18px;
  font-weight: 480;
  opacity: 0.6;
  margin-left: 8px;

  ${css.media.mobile`
    font-size: 15px;
    margin-left: 5px;
  `};
`

export const ShareIcon = styled(ShareSVG)`
  ${css.size(13)};
  fill: ${theme('article.digest')};
`
