import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  height: auto;
  box-shadow: 0 2px 40px 0 rgb(224 226 228 / 27%);
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out, opacity 0.2s ease-out;
  transition-delay: 0.1s;
  border-radius: 8px;
  transform: translateZ(0);
  background-color: ${theme('alphaBg')};
  padding: 8px 18px;
  border: 1px solid;
  border-color: ${theme('hoverBg')};
  margin-bottom: 15px;

  &:hover {
    border-color: ${theme('hint')};
    cursor: pointer;
  }

  ${css.media.mobile`
    padding: 4px 12px;
    margin-bottom: 10px;
  `};

  transition: all 0.2s;
`
export const Title = styled(Link)`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: 550;
  ${css.lineClamp(2)};
  opacity: 0.9;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  ${css.media.mobile`
    font-size: 15px;
  `};
`
export const MobileDigest = styled.div`
  ${css.lineClamp(2)}
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-top: 3px;
  margin-bottom: 3px;
`
