import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import { MarkdownStyles } from '@/widgets/Common'

export const Wrapper = styled(MarkdownStyles)`
  ${css.flex('justify-center')};
  width: 85%;
  padding: 10px;
  color: ${theme('article.digest')};
`
export const InnerWrapper = styled.div`
  width: 360px;
  margin-top: 20px;
`

export const ItemsWrapper = styled.div`
  ${css.flexColumn()};
`
