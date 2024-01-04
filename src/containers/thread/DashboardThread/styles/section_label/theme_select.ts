import styled, { css, theme } from '@/css'
import type { TActive } from '@/spec'

import SunSVG from '@/icons/Sun'
import MoonSVG from '@/icons/Moon'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
export const Section = styled.div<TActive>`
  ${css.row('align-center')};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  margin-left: 2px;
`
export const SunIcon = styled(SunSVG)`
  ${css.size(13)};
  margin-top: -1px;
  fill: ${theme('article.digest')};

  transition: all 0.2s;
`
export const MoonIcon = styled(MoonSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 1px;

  transition: all 0.2s;
`
