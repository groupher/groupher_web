import Img from '@/Img'
import styled, { css, theme } from '@/css'

type TSize = { size: string }
export const Wrapper = styled.div<TSize>`
  ${css.row()};
  font-size: ${({ size }) => size};
  background: ${theme('button.fg')};
  padding: 0 3px;
  border-radius: 5px;
  cursor: pointer;
`
// export const Title = styled.div``

export const IconWrapper = styled.span<TSize>`
  ${css.row('align-center')};
  max-width: 0;
  ${Wrapper}:hover & {
    margin-left: 3px;
    max-width: calc(${({ size }) => size} + 3px);
  }
  transition: all 0.3s;
`

export const Icon = styled(Img)<TSize>`
  fill: ${theme('article.title')};
  display: block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  max-width: 0;

  ${Wrapper}:hover & {
    max-width: ${({ size }) => size};
    transition: all 0.5s;
  }
`
