import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable } from '@/spec'

// import Img from '@/Img'
import css, { theme } from '@/utils/css'
import DemoSVG from '@/icons/DemoTV'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-center', 'justify-between')};
  max-width: 1200px;
  padding: 0 30px;
  height: 68px;
  width: 100%;
  margin-bottom: 8%;
`
export const Brand = styled.div`
  ${css.flex('align-center')};
  width: 150px;
`

export const BrandTitle = styled.div`
  font-size: 18px;
  color: ${theme('article.title')};
  font-weight: 600;
`

export const LinksWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 28px;
  margin-top: 2px;
  flex-flow: 1;
`
export const LinkItem = styled(Link)`
  font-size: 15px;
  color: ${theme('article.title')};
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    font-weight: 500;
  }

  transition: all 0.2s;
`
export const RequestDemo = styled.div`
  ${css.flex('align-end', 'justify-end')};
  color: ${theme('article.digest')};
  font-size: 14px;
  width: 150px;

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
  }
  transition: all 0.2s;
`
export const DemoIcon = styled(DemoSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-right: 10px;
  margin-bottom: 2px;

  ${RequestDemo}:hover & {
    fill: ${theme('article.title')};
  }
  transition: all 0.2s;
`
