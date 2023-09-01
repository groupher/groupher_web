import styled from 'styled-components'

import css from '@/css'

import { Wrapper as WrapperBase } from '.'

export { InnerWrapper, MainWrapper, ArticleWrapper, CommentsWrapper } from '.'

export const Wrapper = styled(WrapperBase)`
  ${css.row('justify-center')};
  padding: 0;
`
