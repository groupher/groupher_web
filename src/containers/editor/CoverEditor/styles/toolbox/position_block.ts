import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

// import UploadSVG from '@/icons/Upload'

export const Wrapper = styled.div`
  ${css.size(60)};
  ${css.flexColumn('align-both')};
`
export const Block = styled.div`
  ${css.size(47)};
  ${css.flex()};
  flex-wrap: wrap;
  border-radius: 2px;
  border: 1px solid;
  border-color: ${theme('divider')};
  transform: scale(0.6);
  margin-top: -5px;
  background: white;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

  ${Wrapper}:hover & {
    transform: scale(1.25);
    margin-top: -3px;
  }

  transition: all 0.3s;
`
export const Pice = styled.div<TActive>`
  ${css.size(15)};
  border-radius: 2px;
  border: 1px solid;
  border-color: ${theme('divider')};
  background: ${({ $active }) =>
    $active ? 'linear-gradient(to right bottom, rgb(115, 115, 115), rgb(38, 38, 38))' : 'white'};

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
