import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

export const Wrapper = styled.div``
export const Title = styled.div``

export const MoreText = styled.div``

export const PopoverInfo = styled.div`
  color: ${theme('article.digest')};
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`
export const Linker = styled(Link)`
  color: ${theme('article.title')};
  &:hover {
    text-decoration: underline;
    color: ${theme('article.title')};
  }
`
export const CommunityWrapper = styled.div`
  margin-right: 3px;
`
export const CommunityLogo = styled(Img)`
  ${css.size(16)};
`
