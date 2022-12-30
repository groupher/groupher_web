import styled from 'styled-components'

import type { TSpace, TTestable, TActive } from '@/spec'

// import Img from '@/Img'
import css, { theme } from '@/utils/css'

import GoodSVG from './GoodSVG'
import SoSoSVG from './SoSoSVG'
import BadSVG from './BadSVG'

type TWrapper = { offsetRight: number } & TTestable & TSpace

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('align-both')};
  width: 100%;
  padding-top: 50px;
  padding-right: ${({ offsetRight }) => `${offsetRight}px` || 0};

  border-top: 1px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`

export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  margin-bottom: 18px;
`

export const FaceWraper = styled.div`
  ${css.flex('align-center')};
  gap: 0 25px;
`

export const IconWrapper = styled.div<TActive>`
  ${css.size(30)};
  ${css.flex('align-both')};

  filter: ${({ $active }) => ($active ? 'grayscale(0)' : 'grayscale(0.8)')};
  transform: ${({ $active }) => ($active ? 'scale(1.2)' : 'scale(1)')};

  &:hover {
    filter: grayscale(0);
    transform: scale(1.2);
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const GoodIcon = styled(GoodSVG)<TActive>`
  ${css.size(24)};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  box-shadow: ${({ $active }) =>
    $active ? 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' : 'none'};
`
export const SoSoIcon = styled(SoSoSVG)<TActive>`
  ${css.circle(24)};
  box-shadow: ${({ $active }) =>
    $active ? 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' : 'none'};
`
export const BadIcon = styled(BadSVG)<TActive>`
  ${css.circle(24)};
  opacity: ${({ $active }) => ($active ? 1 : 0.75)};
  box-shadow: ${({ $active }) =>
    $active ? 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px' : 'none'};

  ${IconWrapper}:hover & {
    opacity: 1;
  }
`
