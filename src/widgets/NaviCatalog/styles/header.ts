import styled from 'styled-components'

import type { TTestable, TActive } from '@/spec'
import Img from '@/Img'
import css, { theme } from '@/css'

const activeColor = '#009C9E'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.row('align-center', 'justify-between')}
  width: 100%;
  margin-bottom: 8px;
`
export const Title = styled.div<TActive>`
  position: relative;
  color: ${({ active }) => (active ? activeColor : theme('article.title'))};
  font-size: 15px;
  padding-left: 5px;
`
export const OperatorsWrapper = styled.div`
  ${css.row('align-center')};
`
export const Operator = styled.div<TActive>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  margin-left: 6px;
`
export const OperateIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(13)};

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const LocateIcon = styled(OperateIcon)``
export const HomeIcon = styled(OperateIcon)``

export const ResetIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(14)};

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const HelpHint = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  padding: 2px 5px;
`
