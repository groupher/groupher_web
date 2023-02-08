import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'

type TWrapper = TTestable & { isSidebarLayout: boolean }
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 10px 25px;
  margin-bottom: 30px;
  margin-left: ${({ isSidebarLayout }) => (isSidebarLayout ? '-35px' : 0)};
`
export const ColumnsWrapper = styled.div`
  ${css.flex('align-start', 'justify-between')};
  min-height: 500px;
  margin-top: 60px;
`
export const Column = styled.div`
  ${css.flexColumn('align-start')};
  width: 32%;
  min-width: 32%;
  min-height: 70vh;
  /* border: 1px solid; */
  /* border-color: ${theme('article.info')}; */
`
export const Header = styled.div`
  ${css.flex('align-center')};
  padding-bottom: 15px;
  width: 100%;
  padding-left: 3px;
`
export const Body = styled.div`
  background: ${theme('hoverBg')};
  /* background: ${theme('baseColor.blueBg')}; */
  background: ${theme('baseColor.purpleBg')};
  padding: 8px;
  padding-bottom: 0;
  border-radius: 12px;
  width: 100%;
`
export const SubTitle = styled.div`
  color: ${theme('article.digest')};
  opacity: 0.8;
  font-size: 13px;
  margin-left: 6px;
`
export const Label = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 600;
  margin-left: 10px;
`
export const TODOIcon = styled(GtdTodoSVG)`
  ${css.size(12)};
  fill: ${theme('article.info')};
`
export const WipIcon = styled(GtdWipSVG)`
  ${css.size(15)};
  fill: ${theme('article.info')};
`
export const DoneIcon = styled(GtdDoneSVG)`
  ${css.size(12)};
  fill: ${theme('article.info')};
`
