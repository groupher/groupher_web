import styled from 'styled-components'

import type { TActive } from '@/spec'
import Img from '@/Img'
// import HashTagSVG from '@/icons/HashTag'
import css, { theme } from '@/utils/css'

import { TagsWrapper } from './index'

type TTag = TActive & { color?: string }

export const Wrapper = styled.div<TTag>`
  ${css.flex('align-center')};
  padding: 4px;
  max-width: 180px;
  padding-left: 12px;
  border-left: ${({ $active }) => ($active ? '1px solid' : 'none')};
  border-left-color: ${({ $active }) => ($active ? theme('article.digest') : 'none')};
  margin-left: ${({ $active }) => ($active ? '-1px' : 0)};

  &:hover {
    cursor: pointer;
    border-left-color: ${theme('article.digest')};
  }
`
export const AllTagIcon = styled(Img)`
  fill: ${theme('banner.desc')};
  margin-right: 10px;
  ${css.size(14)};
  transform: rotate(17deg);
`
export const Tag = styled.div<TTag>`
  ${css.flex('align-end', 'justify-between')};
  width: 100%;
  font-size: 14px;
  padding-left: 5px;
  margin-top: 1px;
  padding-top: ${({ $active }) => ($active ? '2px' : 0)};
  padding-bottom: ${({ $active }) => ($active ? '2px' : 0)};

  ${Wrapper}:hover & {
    cursor: pointer;
  }

  transition: all 0.1s;
`
export const Title = styled.div<TActive>`
  color: ${theme('tags.text')};
  filter: saturate(0);
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  ${css.lineClamp(2)};

  ${Wrapper}:hover & {
    font-weight: 500;
    filter: saturate(1);
  }
`
export const RawWrapper = styled.div<TActive>`
  ${css.flex('align-center')};
  opacity: ${({ $active }) => ($active ? 1 : 0)};

  ${Wrapper}:hover & {
    cursor: pointer;
    opacity: 1;
  }
  transition: all 0.1s;
`
export const Raw = styled.div`
  color: ${theme('tags.text')};
  font-size: 12px;
  margin-top: 1px;
  opacity: 0.8;
`
export const CountInfoWrapper = styled.div`
  opacity: 0;

  ${TagsWrapper}:hover & {
    opacity: 1;
  }

  transition: opacity 0.3s;
  transition-delay: 0.5s;
`
