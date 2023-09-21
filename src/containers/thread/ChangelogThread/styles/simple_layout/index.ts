import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

type TWrapper = TTestable & { isSidebarLayout: boolean }
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.column('align-center')};
  width: ${({ isSidebarLayout }) => (isSidebarLayout ? 'auto' : '100%')};
`
export const Banner = styled.div<{ alignLeft: boolean }>`
  ${css.column('align-both')};
  align-items: ${({ alignLeft }) => (alignLeft ? 'flex-start' : 'center')};
  padding-left: ${({ alignLeft }) => (alignLeft ? '186px' : '')};

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

  ${css.media.mobile`
    width: 100%;
    height: 160px;
  `};
`

export const TabsWrapper = styled.div<{ alignLeft: boolean }>`
  position: absolute;
  bottom: 0;

  left: ${({ alignLeft }) => (alignLeft ? '172px' : '')};
`

export const Title = styled.h2`
  font-size: 25px;
  color: ${theme('article.title')};
  margin-bottom: 5px;
  margin-top: -35px;

  ${css.media.mobile`
    font-size: 20px;
  `};
`
export const Desc = styled.div`
  font-size: 15px;
  color: ${theme('article.digest')};

  ${css.media.mobile`
    text-align: center;
    font-size: 13px;
    width: 80%;
  `};
`
export const MainWrapper = styled.div`
  width: 600px;
  margin-top: 12px;

  border-radius: 6px;

  ${css.media.mobile`
    width: 100%; 
    padding: 0 20px;
  `};
`
