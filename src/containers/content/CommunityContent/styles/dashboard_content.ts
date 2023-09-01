import styled from 'styled-components'

import css from '@/css'

import { InnerWrapper as BaseInnerWrapper } from '.'

export { Wrapper, ContentWrapper, MobileCardsWrapper } from '.'

export const InnerWrapper = styled(BaseInnerWrapper)`
  ${css.column('align-center')};
`
