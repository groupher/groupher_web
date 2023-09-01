import styled from 'styled-components'

import css, { theme } from '@/css'
import { FadeToggle } from '@/widgets/Common'

export const Wrapper = styled.div<{ visible: boolean }>`
  ${css.row('align-center', 'justify-between')};
  position: fixed;
  top: ${({ visible }) => (visible ? 0 : '-60px;')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  width: calc(100% - 240px);
  margin-left: -86px;
  padding-left: 80px;
  padding-right: 30px;
  height: 60px;
  background: ${theme('alphaBg2')};
  backdrop-filter: blur(10px);
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

  z-index: 5;
  transition: all 0.2s;
`
export const LeftPart = styled.div`
  ${css.row('align-center')};
  position: relative;
`
export const UpvoteWrapper = styled(FadeToggle)`
  ${css.row('align-center')};
  position: absolute;
  left: -75px;
  top: 2px;
`
export const ArticleTitle = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 18px;
  ${css.cutRest('400px')};
`
export const ArticleStateBadgeWrapper = styled.div`
  margin-right: 10px;
`
