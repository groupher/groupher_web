import styled from 'styled-components'

import css from '@/utils/css'

import { Wrapper as WrapperBase } from '.'

export { InnerWrapper, MainWrapper, ArticleWrapper, CommentsWrapper } from '.'

export const Wrapper = styled(WrapperBase)`
  ${css.flex('justify-center')};
  padding: 0;
`
