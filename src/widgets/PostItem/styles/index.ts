import styled, { css, theme } from '@/css'

export const DesktopHoverable = styled.div`
  ${css.row()};
  width: 100%;
  position: relative;
  padding: 8px 0;
  margin-bottom: 6px;
  /** NOTE: important!, do not add z-index here, conflict with author uaercard's tooltop  */
  /* z-index: 1; */

  &:hover {
    cursor: pointer;
  }

  &:hover::before {
    opacity: 1;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0px;
    left: -16px;
    width: calc(100% + 32px);
    height: 100%;
    background: ${theme('hoverLinear')};
    border-radius: 10px;
    z-index: -1;
    opacity: 0;
    transition: all 0.2s;
  }

  ${css.media.mobile`
    display: none;
  `};
`

export const DesktopDigest = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
`
