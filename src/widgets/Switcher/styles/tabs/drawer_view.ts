import type { TTestable, TActive } from '@/spec'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.nav.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 38px;
  border-radius: 15px;
  padding: 1px 3px;
  background: ${theme('hoverBg')};
`
export const TabItem = styled.div<TActive>`
  ${css.row('align-both')};
  height: 30px;

  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 600 : 'normal')};
  font-size: 12px;
  flex-grow: 1;
  border-radius: 12px;
  margin-left: 1px;
  margin-right: 1px;

  border: 1px solid transparent;
  border-color: ${({ $active }) => ($active ? theme('divider') : 'transparent')};

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
