import styled from 'styled-components'

import type { TColorName } from '@/spec'

import css, { primaryLightTheme, primaryTheme, theme } from '@/css'

import GtdTodoSVG from '@/icons/GtdTodo'
import GtdWipSVG from '@/icons/GtdWip'
// import GtdDoneSVG from '@/icons/GtdDone'
import GtdDoneSVG from '@/icons/CheckBold'
import ResolveSVG from '@/icons/Hook'
import RejectSVG from '@/icons/Reject'

type TType = { smaller: boolean; color: TColorName }

export const Wrapper = styled.div<TType>`
  margin-right: 2px;
  ${({ smaller }) =>
    smaller
      ? css.size(16)
      : 'width: auto; height: 22px; padding-left: 5px; margin-left: 6px; margin-right: 6px;'};
  ${css.row('align-both')};
  background: ${({ color }) => primaryLightTheme(color)};
  border-radius: ${({ smaller }) => (smaller ? '3px' : '5px')};
`
export const Text = styled.div`
  font-size: 12px;
  padding: 0 5px;
`
export const WipIcon = styled(GtdWipSVG)<TType>`
  ${({ smaller }) => (smaller ? css.size(13) : css.size(15))};
  fill: ${({ color }) => primaryTheme(color, 'article.digest')};
  z-index: 2;
`
export const DoneIcon = styled(GtdDoneSVG)<TType>`
  ${({ smaller }) => (smaller ? css.size(10) : css.size(12))};
  fill: ${({ color }) => primaryTheme(color, 'article.digest')};
`
export const TODOIcon = styled(GtdTodoSVG)<TType>`
  ${({ smaller }) => (smaller ? css.size(10) : css.size(12))};
  fill: ${({ color }) => primaryTheme(color, 'article.digest')};
`
export const ResolveIcon = styled(ResolveSVG)<{ smaller: boolean }>`
  ${({ smaller }) => (smaller ? css.size(11) : css.size(17))};
  fill: ${theme('baseColor.green')};
`
export const RejectIcon = styled(RejectSVG)<{ smaller: boolean }>`
  ${({ smaller }) => (smaller ? css.size(12) : css.size(14))};
  fill: ${theme('baseColor.red')};
`
