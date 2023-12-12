import type { TActive } from '@/spec'
import styled, { css, theme } from '@/css'

import Input from '@/widgets/Input'

export const Header = styled.div`
  ${css.row('justify-between', 'align-center')};
`
export const TabWrapper = styled.div`
  ${css.row('align-end')};
`
export const TabName = styled.div<TActive>`
  font-size: 14px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  margin-right: 12px;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};

  &:hover {
    color: ${theme('article.title')};
    font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
    cursor: pointer;
  }

  transition: color 0.2s;
`
export const BoxWrapper = styled.div`
  ${css.row('align-center')};
  margin-top: 8px;
  margin-left: -8px;
`
export const Inputer = styled(Input)`
  width: 380px;

  ${css.media.mobile`
    width: 310px;
  `};
`
