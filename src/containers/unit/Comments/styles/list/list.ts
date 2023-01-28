import styled from 'styled-components'

import { theme } from '@/utils/css'
// import css from '@/utils/css'

export const Wrapper = styled.div`
  position: relative;
`
type TIndentLine = {
  isFold: boolean
  hasReplies: boolean
}

export const IndentLine = styled.div<TIndentLine>`
  position: absolute;
  top: ${({ isFold }) => (isFold ? '62px' : '78px')};
  left: 2px;
  height: ${({ isFold }) => (isFold ? 'calc(100% - 62px)' : 'calc(100% - 85px)')};
  width: 20px;
  margin-left: 5px;

  border-left: 2px solid transparent;
  border-image: linear-gradient(
    0.34turn,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;

  &:hover {
    cursor: pointer;

    border-left: 1px solid transparent;
    border-image: linear-gradient(
      0.34turn,
      ${theme('article.digest')},
      ${theme('article.digest')},
      ${theme('article.digest')},
      ${theme('article.digest')},
      transparent
    );
    border-image-slice: 1;
  }

  transition: all 0.2s;
`
