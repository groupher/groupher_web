import styled from 'styled-components'

import type { TTestable, TActive } from '@/spec'
import css, { theme } from '@/css'

import Img from '@/Img'
import { FadeToggle } from '@/widgets/Common'

// see https://stackoverflow.com/questions/6794000/fixed-position-but-relative-to-container
export const Wrapper = styled(FadeToggle).attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable & TActive>`
  width: calc(100% - 45px);
  margin-left: 120px;
`
export const HeaderWrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  cursor: pointer;
`
export const TitleWrapper = styled.div`
  ${css.row('align-center')};
`
export const TocIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(12)};
  margin-right: 4px;
  margin-top: -1px;

  ${HeaderWrapper}:hover & {
    fill: ${theme('article.title')};
    cursor: pointer;
  }
  transition: all 0.2s;
`
export const TocTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-left: 5px;
  font-weight: 600;

  ${HeaderWrapper}:hover & {
    color: ${theme('article.title')};
    cursor: pointer;
  }
  transition: all 0.2s;
`
const MenuIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(13)};
  transform: rotate(90deg);

  ${HeaderWrapper}:hover & {
    fill: ${theme('article.title')};
    cursor: pointer;
  }
  transition: all 0.2s;
`
export const MenuClosedIcon = styled(MenuIcon)`
  margin-top: -3px;
  opacity: 0.6;
`
export const MenuOpenedIcon = styled(MenuIcon)`
  ${css.size(12)};
  opacity: 0.8;
`
export const TocContentWrapper = styled.div`
  color: ${theme('article.digest')};
  border-top: 1px solid;
  border-top-color: ${theme('divider')};
  padding: 10px 0;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
`
