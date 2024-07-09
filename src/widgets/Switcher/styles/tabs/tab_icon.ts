import type { TActive } from '~/spec'
import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  /* NOTE: the width and height here is a MUST, to hold the icon place, otherwise the width-calc will fail  */
  width: 20px;
  height: 15px;

  ${css.media.mobile`
    display: none;
  `}
`
export const Icon = styled(Img)<TActive>`
  fill: ${({ active }) => (active ? theme('article.title') : theme('article.digest'))};

  ${css.size(15)};

  ${css.media.mobile`
    ${css.size(13)};
  `}
`
