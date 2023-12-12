import Link from 'next/link'

import styled, { css, theme } from '@/css'

export const Wrapper = styled.div<{ viewing: boolean }>`
  ${css.column()};
  position: relative;
  height: auto;
  box-shadow: ${theme('articleCardShadow')};
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out, opacity 0.2s ease-out;
  transition-delay: 0.1s;
  border-radius: 8px;
  transform: translateZ(0);
  background-color: ${theme('alphaBg')};
  padding: 8px 18px;
  border: 1px solid;
  border-color: ${({ viewing }) => (viewing ? theme('articleCardHover') : theme('hoverBg'))};
  margin-bottom: 15px;

  &:hover {
    border-color: ${theme('articleCardHover')};
    cursor: pointer;
  }

  ${css.media.mobile`
    padding: 4px 12px;
    margin-bottom: 10px;
  `};

  transition: all 0.12s;
`
export const ViewedHintDot = styled.div`
  position: absolute;
  right: -2px;
  top: -2px;
  z-index: 2;
`
export const PinHintDot = styled.div`
  position: absolute;
  left: 20px;
  top: -8px;
  transform: rotate(-20deg);
  z-index: 2;
`
export const Title = styled(Link)`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: 550;
  ${css.lineClamp(2)};
  opacity: 0.9;
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    text-decoration: underline;
    text-decoration-color: ${theme('hint')};
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
