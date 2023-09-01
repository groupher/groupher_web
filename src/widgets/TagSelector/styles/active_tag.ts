import styled from 'styled-components'

import css, { theme } from '@/css'

import { Title } from './filter_panel'

export { DotSign } from './filter_panel'

export const Wrapper = styled.div`
  color: ${theme('article.title')};
  font-weight: 400;
  opacity: 0.8;
`
export const TagItem = styled.div`
  ${css.row('align-center')};
`
export const TagTitle = styled(Title)`
  color: ${theme('article.title')};
  font-weight: 600;
`
