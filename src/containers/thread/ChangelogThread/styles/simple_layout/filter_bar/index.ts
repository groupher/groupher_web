import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { animate, theme } from '@/utils/css'

type TWrapper = TActive & { isChangelogSimpleLayout: boolean }
export const Wrapper = styled.div<TWrapper>`
  ${css.flex('align-both')};
  justify-content: ${({ isChangelogSimpleLayout }) =>
    isChangelogSimpleLayout ? 'flex-start' : 'center'};
  padding-left: ${({ isChangelogSimpleLayout }) => (isChangelogSimpleLayout ? '186px' : '')};

  gap: 0 15px;
  width: 700px;
  height: 52px;
  margin-bottom: 20px;
  margin-top: -16px;
  animation: ${animate.fadeInDown} 0.1s linear;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.55turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`

export const Item = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
`
