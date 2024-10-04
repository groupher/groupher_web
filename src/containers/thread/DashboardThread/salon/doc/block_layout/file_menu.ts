import styled, { css, theme } from '~/css'
import TransforSVG from '~/icons/Transfor'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 6px;
  width: 100px;
`
export const Item = styled.div`
  ${css.row('justify-between', 'align-center')};
  padding: 3px 4px;

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`

const TransforIcon = styled(TransforSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: -1px;

  ${Item}:hover & {
    color: ${theme('article.title')};
  }
`

export const Icon = {
  Transfor: TransforIcon,
}

export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;

  ${Item}:hover & {
    color: ${theme('article.title')};
  }
`
