import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'
import ShareSVG from '@/icons/Share'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-start')};
  padding-top: 12px;
`
export const DateTime = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-top: 4px;
  width: 180px;
`
export const Main = styled.div`
  flex-grow: 1;
  width: 100%;
  min-height: 220px;
  padding-bottom: 30px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
`
export const TagsWrapper = styled.div`
  ${css.flex('align-both', 'justify-between')};
  margin-bottom: 8px;
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

export const Version = styled.span`
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 480;
  opacity: 0.6;
  margin-left: 8px;
`
export const ShareIcon = styled(ShareSVG)`
  ${css.size(13)};
  fill: ${theme('article.digest')};
`
