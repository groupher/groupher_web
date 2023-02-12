import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

type TWrapper = TTestable & { isSidebarLayout: boolean }
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('align-center')};
  width: 100%;
  margin-left: ${({ isSidebarLayout }) => (isSidebarLayout ? '-60px' : '0')};
`
export const Banner = styled.div<{ isChangelogSimpleLayout: boolean }>`
  ${css.flexColumn('align-both')};
  align-items: ${({ isChangelogSimpleLayout }) =>
    isChangelogSimpleLayout ? 'flex-start' : 'center'};
  padding-left: ${({ isChangelogSimpleLayout }) => (isChangelogSimpleLayout ? '186px' : '')};

  height: 200px;
  width: 700px;
  margin-bottom: 20px;
  position: relative;

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

export const TabsWrapper = styled.div<{ isChangelogSimpleLayout: boolean }>`
  position: absolute;
  bottom: 0;

  left: ${({ isChangelogSimpleLayout }) => (isChangelogSimpleLayout ? '172px' : '')};
`

export const Title = styled.h2`
  font-size: 25px;
  color: ${theme('article.title')};
  margin-bottom: 5px;
  margin-top: -35px;
`
export const Desc = styled.div`
  font-size: 15px;
  color: ${theme('article.digest')};
`
export const MainWrapper = styled.div`
  width: 600px;
  margin-top: 12px;

  border-radius: 6px;
`
