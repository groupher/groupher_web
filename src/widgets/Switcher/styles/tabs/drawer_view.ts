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
  border-radius: 10px;
  background: ${theme('hoverBg')};
  padding: 1px 3px;
`
export const TabItem = styled.div<TActive>`
  ${css.row('align-both')};
  height: 28px;

  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 600 : 'normal')};
  font-size: 12px;
  flex-grow: 1;
  border-radius: 10px;
  margin-left: 1px;
  margin-right: 1px;

  border: 1px solid transparent;
  border-color: ${({ $active }) => ($active ? theme('divider') : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? 'rgb(0 0 0 / 12%) 0px 2px 12px 0px;' : 'none')};

  &:hover {
    font-weight: 600;
    cursor: pointer;
  }

  transition: all 0.2s;
`
