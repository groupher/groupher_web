import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row()};
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  padding-top: 10px;
  padding-bottom: 0;
  margin-top: 20px;

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
  width: 50%;
`

export const Title = styled.div`
  font-size: 14px;
  color: ${theme('article.digest')};
  font-weight: 500;
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
