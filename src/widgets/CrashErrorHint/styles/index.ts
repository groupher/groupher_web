import styled from 'styled-components'

import type { TTestable } from '@/spec'
import { themeSkins } from '@/utils/themes'
import css from '@/css'

type TThemeName = {
  t: string
}

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-center', 'justify-between')};
  height: 100vh;
  width: 100%;
  color: #6b7f83;
  background: #072d3a;
`
export const Header = styled.div`
  ${css.row()};
`
// do not use common @/Img, because the theme in Img may not work
export const HintIcon = styled.img`
  ${css.size(40)};
  margin-right: 15px;
`
export const Title = styled.div<TThemeName>`
  font-size: 30px;
  color: ${({ t }) => themeSkins[t].article.title};
  padding-bottom: 12px;
`
export const Desc = styled.p<TThemeName>`
  color: ${({ t }) => themeSkins[t].rainbow.red};
`
export const UL = styled.ul<TThemeName>`
  margin-left: -22px;
  color: ${({ t }) => themeSkins[t].article.digest};
`
export const Li = styled.li`
  margin-top: 4px;
`
export const Action = styled.span<{ t: string; noUnderline: boolean }>`
  color: ${({ t }) => themeSkins[t].link};
  margin-left: 3px;
  margin-right: 3px;

  &:hover {
    cursor: pointer;
    text-decoration: ${({ noUnderline }) => (noUnderline ? 'none' : 'underline')};
  }
`
export const Footer = styled.div`
  margin-bottom: 26px;
`
