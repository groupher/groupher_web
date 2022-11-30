import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

import { Title } from './filter_panel'

export { DotSign } from './filter_panel'

export const Wrapper = styled.div`
  color: ${theme('article.title')};
  font-weight: 400;
  opacity: 0.8;
`
export const TagItem = styled.div`
  ${css.flex('align-center')};
`

export const TagTitle = styled(Title)`
  color: ${theme('article.title')};
  font-weight: 600;
`
