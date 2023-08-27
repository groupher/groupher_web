import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

// import UploadSVG from '@/icons/Upload'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.flexColumn('align-both')};
`
export const Block = styled.div`
  ${css.size(48)};
  ${css.flex()};
  flex-wrap: wrap;
  gap: 3px;
  padding: 4px;
  border-radius: 2px;
  border: 1px solid;
  border-color: ${theme('divider')};
  transform: scale(0.6);
  margin-top: -6px;
  background: white;

  box-shadow: ${css.cardShadow};

  ${Wrapper}:hover & {
    transform: scale(1.2);
    margin-top: -2px;
  }

  transition: all 0.3s;
`
export const Pice = styled.div<TActive>`
  ${css.circle(10)};
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(to right bottom, rgb(115, 115, 115), rgb(38, 38, 38))'
      : theme('divider')};

  &:hover {
    background: ${({ $active }) =>
      $active
        ? 'linear-gradient(to right bottom, rgb(115, 115, 115), rgb(38, 38, 38))'
        : theme('divider')};
    cursor: pointer;
  }
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 9px;
  opacity: 0.8;
  margin-top: -3px;

  ${Wrapper}:hover & {
    display: none;
  }
`
