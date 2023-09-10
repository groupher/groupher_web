import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.row('align-start')};
  width: 100%;

  ${css.media.mobile`
    ${css.column('align-start')};
  `};
`
export const MainWrapper = styled.div<{ isSidebarLayout: boolean }>`
  width: auto;
  min-height: 550px;
  flex-grow: 1;

  background: transparent;
  border-radius: 6px;
  margin-top: 25px;
  padding-left: ${({ isSidebarLayout }) => (isSidebarLayout ? 0 : '')};

  ${css.media.mobile`
    width: 100%;
  `};
`
export const Block = styled.div`
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  width: 620px;

  ${css.media.mobile`
    width: 100%;
  `};
`
export const IntroBlock = styled(Block)`
  padding-right: 20px;
`
export const StateBlock = styled(Block)`
  padding-right: 0;
`
export const MemberBlock = styled(Block)`
  border-bottom: none;
`
export const Title = styled.div`
  font-size: 14.5px;
  color: ${theme('article.digest')};
  font-weight: 600;
  margin-bottom: 18px;
`
export const Desc = styled.div`
  font-size: 14.5px;
  color: ${theme('article.digest')};
  line-height: 1.8;
`
