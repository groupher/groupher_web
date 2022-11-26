import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  height: 100%;

  box-shadow: 0 2px 40px 0 rgb(224 226 228 / 27%);
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out,
    opacity 0.2s ease-out;
  transition-delay: 0.1s;
  border-radius: 4px;
  transform: translateZ(0);
  background-color: #fff;
  padding: 20px;
  border: 1px solid;
  border-color: #f8f6f6;
  margin-bottom: 15px;

  &:hover {
    border-color: ${theme('divider')};
  }

  transition: all 0.25s;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: 500;
`
export const MobileDigest = styled.div`
  ${css.lineClamp(2)}
  color: ${theme('article.digest')};
  font-size: 13px;
`
