import type { TTestable, TActive } from '~/spec'

// import Img from '~/Img'
import styled, { css, theme } from '~/css'

import GoodSVG from './GoodSVG'
import SoSoSVG from './SoSoSVG'
import BadSVG from './BadSVG'

type TWrapper = { offsetRight: number; withLastUpdated } & TTestable

export const Wrapper = styled.div<TWrapper>`
  ${({ withLastUpdated }) =>
    withLastUpdated ? css.row('align-center', 'justify-between') : css.column('align-both')}

  width: 100%;
  padding-top: 50px;
  padding-right: ${({ offsetRight, withLastUpdated }) => (withLastUpdated ? 0 : `${offsetRight}px`)};

  border-top: 1px solid;
  border-top-color: ${theme('divider')};
`

export const LastUpdateWrapper = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.7;
  margin-left: 3px;
`

export const FeedbackWrapper = styled.div<{ withLastUpdated: boolean }>`
  ${({ withLastUpdated }) => (withLastUpdated ? css.row('align-center') : css.column('align-both'))}
`

export const Title = styled.div<{ small: boolean }>`
  font-size: ${({ small }) => (small ? '12px;' : '13px')};
  color: ${({ small }) => (small ? theme('article.digest') : theme('article.title'))};
  margin-bottom: ${({ small }) => (small ? '0' : '18px;')};
  margin-right: ${({ small }) => (small ? '12px' : '0')};
  margin-top: ${({ small }) => (small ? '1px' : 0)};
  opacity: ${({ small }) => (small ? 0.7 : 1)};
`
export const FaceWraper = styled.div<{ small: boolean }>`
  ${css.row('align-center')};
  gap: ${({ small }) => (small ? '0 6px' : '0 25px')};
  margin-right: ${({ small }) => (small ? '2px' : '0')};
`
export const IconWrapper = styled.div<TActive>`
  ${css.size(30)};
  ${css.row('align-both')};

  filter: ${({ $active }) => ($active ? 'grayscale(0)' : 'grayscale(0.8)')};
  transform: ${({ $active }) => ($active ? 'scale(1.2)' : 'scale(1)')};

  &:hover {
    filter: grayscale(0);
    transform: scale(1.2);
    cursor: pointer;
  }

  transition: all 0.2s;
`
type TIcon = TActive & { small: boolean }
export const GoodIcon = styled(GoodSVG)<TIcon>`
  ${({ small }) => (small ? css.size(20) : css.size(24))};
  filter: ${({ $active }) => ($active ? 'drop-shadow(0 1px 2px lightgrey);' : 'none')};
`
export const SoSoIcon = styled(SoSoSVG)<TIcon>`
  ${({ small }) => (small ? css.circle(20) : css.circle(24))};
  box-shadow: ${({ $active }) =>
    $active ? 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' : 'none'};
`
export const BadIcon = styled(BadSVG)<TIcon>`
  ${({ small }) => (small ? css.circle(20) : css.circle(24))};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  box-shadow: ${({ $active }) =>
    $active ? 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' : 'none'};

  ${IconWrapper}:hover & {
    opacity: 1;
  }
`
