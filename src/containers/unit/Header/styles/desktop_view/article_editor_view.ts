import styled from 'styled-components'

import css, { WIDTH } from '@/css'

import { Wrapper as CommunityWrapper } from './community_view'

export { RouterWrapper, MoreIcon } from './article_view'

export const Wrapper = styled(CommunityWrapper)`
  ${css.row('align-both')};
`
export const InnerWrapper = styled.div`
  ${css.row('justify-start', 'align-center')};
  width: ${WIDTH.ARTICLE_EDITOR.CONTENT};
`

export const Operations = styled.div``
