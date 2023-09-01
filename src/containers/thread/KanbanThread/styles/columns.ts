import styled from 'styled-components'

import type { TColorName } from '@/spec'
import css, { theme } from '@/css'
import { camelize } from '@/utils/fmt'

import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/GtdDone'
import GtdTodoSVG from '@/icons/GtdTodo'

export const Column = styled.div`
  ${css.column('align-start')};
  width: 32%;
  min-width: 32%;
  min-height: 70vh;
  /* border: 1px solid; */
  /* border-color: ${theme('article.info')}; */
`
export const Header = styled.div`
  ${css.row('align-center')};
  padding-bottom: 15px;
  width: 100%;
  padding-left: 3px;
`
export const Body = styled.div<{ color: TColorName }>`
  background-color: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)};
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
