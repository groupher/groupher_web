import styled from 'styled-components'

import css, { theme } from '@/css'
import { WithMargin } from '@/widgets/Common'

export const Wrapper = styled(WithMargin)`
  ${css.rowWrap('align-center')};
  gap: 0 8px;
`
export const Label = styled.div`
  border: 1px solid;
  color: ${theme('article.title')};
  border-color: ${theme('divider')};
  padding: 1px 8px;
  font-size: 13px;
  border-radius: 8px;
`
