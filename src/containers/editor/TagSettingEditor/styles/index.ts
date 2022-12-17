import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  padding: 10px;
  margin-top: 15px;
  padding-bottom: 100px;
`
export const TagItem = styled.div`
  ${css.flex('align-center')};
  padding-left: 18px;
  margin-bottom: 30px;
`
export const Dot = styled.div`
  ${css.circle(12)};
  background: yellowgreen;
  margin-right: 10px;
`
export const TagName = styled.div`
  font-size: 16px;
  color: ${theme('article.title')};
`
export const SelectorWrapper = styled.div`
  padding: 0 18px;
  margin-top: 10px;
`
export const Title = styled.div`
  font-size: 16px;
  color: ${theme('article.title')};
  font-weight: 600;
  padding-left: 18px;
  margin-bottom: 8px;
`
export const Desc = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  padding: 0 18px;
  margin-bottom: 10px;
`
export const Navi = styled(Link)`
  font-size: 13px;
  color: ${theme('link')};
  text-decoration: none;
  cursor: pointer;
  margin-left: 1px;
  margin-right: 2px;
`
