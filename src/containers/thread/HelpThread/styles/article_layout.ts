import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { MainWrapper } from './index'

export const Wrapper = styled.div`
  ${css.flex()};
  width: 100%;
  margin-top: 10px;
`
export const Header = styled.div`
  margin-bottom: 26px;
`
export const Title = styled.div`
  font-size: 26px;
  color: ${theme('article.title')};
  font-weight: 600;
`

export const Navi = styled.div`
  ${css.flex('align-center')};
  font-size: 13px;
  margin-bottom: 3px;
`
export const All = styled.div`
  color: ${theme('article.info')};

  &:hover {
    cursor: pointer;
    color: ${theme('link')};
  }
`
export const Slash = styled.div`
  font-size: 10px;
  color: ${theme('article.info')};
  margin-left: 7px;
  margin-right: 7px;
`
export const Cur = styled.div`
  color: ${theme('article.digest')};
`
export const Content = styled(MainWrapper)`
  width: 100%;
  min-height: 600px;
  margin-top: 8px;
  font-size: 15px;

  background: transparent;
  padding-left: 22px;
  padding-right: 90px;
  border-right: none;
`
export const Sidebar = styled.div`
  width: 300px;
  padding-left: 32px;
  margin-top: 8px;
`
