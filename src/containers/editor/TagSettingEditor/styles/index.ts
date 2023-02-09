import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import Input from '@/widgets/Input'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  margin-top: 15px;
  padding-bottom: 100px;
`
export const TagItem = styled.div`
  ${css.flex('align-center')};
  padding-left: 30px;
  margin-bottom: 30px;
  margin-top: 24px;
`
export const Dot = styled.div<{ color: string }>`
  ${css.circle(10)};
  margin-right: 10px;
  background: ${({ color }) => (color ? theme(`baseColor.${camelize(color)}Bg`) : 'none')};
`
export const TagName = styled.div`
  font-size: 15px;
  color: ${theme('article.title')};
`
export const SelectorWrapper = styled.div`
  padding: 0 28px;
  margin-top: 10px;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  font-weight: 600;
  padding-left: 28px;
  margin-bottom: 8px;
`
export const Desc = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  padding: 0 28px;
  margin-bottom: 10px;
`
export const Navi = styled(Link)`
  font-size: 12px;
  color: ${theme('link')};
  text-decoration: none;
  cursor: pointer;
  margin-left: 1px;
  margin-right: 2px;
`

export const Inputer = styled(Input)`
  width: 100%;
  margin-left: 28px;
  width: 360px;
`
