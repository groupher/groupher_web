import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'
import css, { theme } from '@/css'

import MailSVG from '@/icons/Mail'
import RSSSVG from '@/icons/RSS'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  padding: 0 20px;
`
export const Title = styled.div``

export const ByWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 18px;
`
export const IconWrapper = styled.div<TActive>`
  width: 80px;
  height: 90px;
  ${css.flexColumn('align-both')};
  border: 1px solid;
  border-radius: 8px;
  border-color: ${({ $active }) => ($active ? theme('article.digest') : '#dcdcdc')};

  &:hover {
    cursor: pointer;
    border-color: ${theme('article.digest')};
    transition: all 0.2s;
  }
`
export const IconBox = styled.div`
  ${css.size(40)};
  ${css.flex('align-both')};
`
export const IconTitle = styled.div`
  margin-top: 5px;
  font-size: 12px;
`
export const MailIcon = styled(MailSVG)`
  ${css.size(28)};
  fill: ${theme('article.digest')};
`
export const RSSIcon = styled(RSSSVG)`
  ${css.size(22)};
  fill: ${theme('article.digest')};
`
