import styled from 'styled-components'

import type { TTestable, TSpace } from '@/spec'
import css, { theme } from '@/utils/css'

import InfoSVG from '@/icons/Save'

type TWrapper = { gradientDirection: 'left' | 'right' } & TTestable & TSpace
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('align-center')};
  width: ${({ gradientDirection }) =>
    gradientDirection === 'right' ? 'calc(100% + 10px)' : '100%'};
  height: 42px;
  background: ${({ gradientDirection }) =>
    `linear-gradient(to ${gradientDirection}, #f7f7f7 60%, transparent)`};
  padding: 0 10px;
  border-radius: 10px;

  ${(props) => css.spaceMargins(props)};
`
export const HintWrapper = styled.div`
  ${css.flex('align-center')};
`
export const InfoIcon = styled(InfoSVG)`
  fill: ${theme('article.digest')};
  ${css.size(13)};
  margin-right: 6px;
`
export const HintText = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
`
export const Hint = styled.span`
  color: ${theme('article.title')};
  margin-left: 2px;
`
export const ActionWrapper = styled.div`
  ${css.flex('align-center')};
`
