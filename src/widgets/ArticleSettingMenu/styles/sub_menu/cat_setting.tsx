import type { TActive, TColor } from '@/spec'
import styled, { css, theme, rainbow } from '@/css'
import CheckSVG from '@/icons/CheckBold'

export const Wrapper = styled.div`
  margin-right: 5px;
`
export const Item = styled.div<TActive>`
  ${css.row('align-center')};
  width: calc(100% + 5px);
  padding: 6px 5px;
  padding-right: 4px;
  border-radius: 5px;
  margin-left: -5px;
  cursor: pointer;

  background: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};

  &:hover {
    background: ${theme('hoverBg')};
  }

  transition: background 0.15s;
`
export const Title = styled.div<TActive>`
  font-size: 14px;
  margin-left: 2px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  flex-grow: 1;

  ${Item}:hover & {
    color: ${theme('article.title')};
  }

  transition: color 0.15s;
`
export const CheckIcon = styled(CheckSVG)<TColor>`
  ${css.size(15)};
  fill: ${({ $color }) => rainbow($color)};
  filter: brightness(1.2);
`
