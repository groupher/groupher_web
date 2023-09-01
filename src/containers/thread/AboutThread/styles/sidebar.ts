import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div<{ isSidebarLayout: boolean }>`
  width: ${({ isSidebarLayout }) => (isSidebarLayout ? '280px' : '300px')};
  min-width: ${({ isSidebarLayout }) => (isSidebarLayout ? '280px' : '300px')};
  height: auto;
  border-left: 1px solid;
  border-left-color: ${theme('divider')};
  padding-left: 60px;
  padding-top: 10px;
  padding-bottom: 0;
  margin-top: 20px;
  margin-left: ${({ isSidebarLayout }) => (isSidebarLayout ? '32px' : '70px')};

  ${css.media.mobile`
    display: none;
  `};
`

export const MobileWrapper = styled.div`
  display: none;

  ${css.media.mobile`
    display: block;
    padding: 0 20px;
  `};
`

export const Block = styled.div`
  margin-bottom: 20px;
`

export const Title = styled.div`
  font-size: 14px;
  color: ${theme('article.digest')};
  font-weight: 600;
  margin-bottom: 10px;
`
export const Desc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${theme('article.digest')};
  line-height: 1.6;
`
export const Reports = styled.div`
  ${css.row('align-center')};
`
export const ReportsArticle = styled(Desc)`
  ${css.lineClamp(1)};
`
export const Press = styled.div`
  /* color: #ec633f; */
  border: 1px solid;
  border-color: ${theme('article.info')};
  color: ${theme('article.info')};
  font-weight: 600;
  padding: 0 4px;
  border-radius: 4px;
  font-size: 11px;
  margin-left: -1px;
  margin-right: 8px;
  cursor: pointer;
`
