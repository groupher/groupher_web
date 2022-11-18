import styled from 'styled-components'

import Input from '@/widgets/Input'
import css, { theme } from '@/utils/css'

import LinkSVG from '@/icons/Link'

export const LinkIcon = styled(LinkSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
  margin-top: 1px;

  transition: fill 0.2s;
`
export const LinkInput = styled(Input)<{ invalid?: boolean }>`
  border: none;
  background: none;
  height: 26px;
  width: 100px;
  color: ${({ invalid }) =>
    invalid ? theme('baseColor.red') : theme('article.digest')};
  width: 200px;
`
