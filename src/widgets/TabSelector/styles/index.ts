import type { TActive } from '~/spec'
import styled, { css, theme } from '~/css'
import Img from '~/Img'

export const Wrapper = styled.div`
  ${css.column()};
`
export const OptionsWrapper = styled.div`
  ${css.row('justify-evenly')};
  padding-top: 3px;
`
export const HeaderDivider = styled.div`
  border-bottom: 1px solid;
  border-bottom-color: ${theme('article.digest')};
  width: 90%;
  align-self: center;
  opacity: 0.5;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const Option = styled.div<TActive>`
  ${css.row('align-center')};

  color: ${({ active }) => (active ? theme('article.title') : theme('article.digest'))};
  background: ${({ active }) => (active ? theme('hoverBg') : '')};
  padding: 2px 8px;
  border-radius: 5px;
  line-height: 1;

  &:hover {
    cursor: pointer;
    font-size: bold;
  }
`
export const Icon = styled(Img)<TActive>`
  fill: ${({ active }) => (active ? theme('article.title') : theme('article.digest'))};
  ${css.size(18)};
  margin-right: 3px;
`
export const Title = styled.div``
