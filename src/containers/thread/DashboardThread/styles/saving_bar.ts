import type { TSpace } from '@/spec'
import styled, { css, theme } from '@/css'

import InfoSVG from '@/icons/Save'
import { WithMargin } from '@/widgets/Common'

type TWrapper = { direction: 'left' | 'right'; width: string } & TSpace
export const NormalWrapper = styled(WithMargin)<TWrapper>`
  ${css.row('align-center')};
  width: ${({ direction, width }) => (direction === 'right' ? `calc(${width} + 10px)` : width)};
  background: ${(props) => {
    const { direction } = props
    const themeVal = theme('hoverBg')(props)

    return `linear-gradient(to ${direction}, ${themeVal} 60%, transparent)`
  }};

  height: 42px;
  padding: 0 10px;
  border-radius: 10px;
`
export const MinimalWrapper = styled(NormalWrapper)`
  height: 34px;
  padding: 0 8px;
`
export const HintWrapper = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
`
export const InfoIcon = styled(InfoSVG)<{ $minimal: boolean }>`
  ${css.size(13)};
  fill: ${theme('article.digest')};
  margin-right: 6px;
  margin-top: ${({ $minimal }) => ($minimal ? '-1px' : 0)}};
`
export const HintText = styled.div<{ $minimal: boolean }>`
  font-size: ${({ $minimal }) => ($minimal ? '11px' : '13px')}};
`
export const Hint = styled.span`
  color: ${theme('article.title')};
  margin-left: 2px;
`
export const ActionWrapper = styled.div<{ $minimal: boolean }>`
  ${css.row('align-center')};

  ${({ $minimal }) => ($minimal ? ' transform: scale(0.85);  margin-right: -8px;' : '')};
`
