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
  color: ${theme('article.digest')};

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
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
export const Content = styled(MainWrapper)<{ isRightLayout?: boolean }>`
  width: 100%;
  min-height: 600px;
  margin-top: 24px;
  font-size: 16px;
  line-height: 1.8;

  background: transparent;
  padding-left: 8px;
  padding-right: ${({ isRightLayout }) => (isRightLayout ? '10px' : '90px')};
  border-right: none;
`
export const Sidebar = styled.div<{ isLeftLayout?: boolean }>`
  width: ${({ isLeftLayout }) => (isLeftLayout ? '320px' : '300px')};
  padding-left: ${({ isLeftLayout }) => (isLeftLayout ? '26px' : '32px')};
  margin-top: 30px;

  border-right: 1px solid;
  border-right: 1px solid transparent;
  border-image: linear-gradient(
    0.46turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
export const FAQItem = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${theme('article.title')};

  &:hover {
    color: ${theme('article.digest')};
    cursor: pointer;
  }
`
