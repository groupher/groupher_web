import styled, { css, theme } from '~/css'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, global } = useTwBelt()

  return {
    hoverable: cn(
      'row w-full py-2 mb-1.5 pointer relative',
      'before:z-[-1] before:absolute before:top-0 before:left-[-16px] before:w-full before:h-full before:rounded-xl before:transition-all before:duration-200 before:opacity-0',
      'hover:before:opacity-100',
      global('article-hover-linear'),
    ),
  }
}

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
`

export const DesktopDigest = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
`
