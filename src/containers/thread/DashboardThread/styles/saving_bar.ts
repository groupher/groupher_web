import styled from 'styled-components'

import type { TTestable, TSpace } from '@/spec'
import css, { theme } from '@/utils/css'

import InfoSVG from '@/icons/Save'

type TWrapper = { gradientDirection: 'left' | 'right'; minimal: boolean } & TTestable & TSpace
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('align-center')};
  width: ${({ gradientDirection }) =>
    gradientDirection === 'right' ? 'calc(100% + 10px)' : '100%'};
  height: ${({ minimal }) => (minimal ? '34px' : '42px')}};
  background: ${({ gradientDirection }) =>
    `linear-gradient(to ${gradientDirection}, #f7f7f7 60%, transparent)`};
  padding: ${({ minimal }) => (minimal ? '0 8px' : '0 10px')}};
  border-radius: 10px;

  ${(props) => css.spaceMargins(props)};
`
export const HintWrapper = styled.div`
  ${css.flex('align-center')};
`
export const InfoIcon = styled(InfoSVG)<{ minimal: boolean }>`
  fill: ${theme('article.digest')};
  ${css.size(13)};
  margin-right: 6px;
  margin-top: ${({ minimal }) => (minimal ? '-1px' : 0)}};
`
export const HintText = styled.div<{ minimal: boolean }>`
  font-size: ${({ minimal }) => (minimal ? '11px' : '13px')}};
  color: ${theme('article.digest')};
`
export const Hint = styled.span`
  color: ${theme('article.title')};
  margin-left: 2px;
`
export const ActionWrapper = styled.div<{ minimal: boolean }>`
  ${css.flex('align-center')};

  ${({ minimal }) => (minimal ? ' transform: scale(0.85);  margin-right: -8px;' : '')};
`
