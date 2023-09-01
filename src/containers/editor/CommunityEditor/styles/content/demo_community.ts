import Link from 'next/link'
import styled from 'styled-components'

import css, { theme } from '@/css'
import CommunityFaceLogo from '@/widgets/CommunityFaceLogo'

export const Wrapper = styled.div`
  ${css.rowWrap('align-center')};
`
/* header bg */
export const Community = styled.div`
  ${css.row('align-center', 'justify-between')};
  height: 30px;
  margin-right: 16px;
  margin-bottom: 5px;
`
export const Logo = styled(CommunityFaceLogo)`
  fill: #317faf;
  ${css.circle(18)};
  filter: saturate(0.6);
`
export const Title = styled(Link)`
  color: ${theme('article.digest')};
  text-decoration: none;
  margin-left: 7px;

  &:hover {
    text-decoration: underline;
    color: ${theme('article.title')};
  }
`
