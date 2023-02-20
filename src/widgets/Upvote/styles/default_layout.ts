import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'

import { LineDivider as LineDividerBase } from '@/widgets/Common'

type TInnerWrapper = {
  testid: string
}

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TInnerWrapper>`
  ${css.flex('align-center')};
`
export const Button = styled.div`
  ${css.flex('align-center')};
  border: 1px solid;
  border-color: ${theme('button.upvoteBorder')};

  border-radius: 10px;
  padding: 0 10px;

  &:hover {
    border-color: ${theme('lightText')};
    cursor: pointer;
  }

  ${css.media.mobile`
    padding: 0 8px;
    height: 26px;
  `};
  transition: 0.2s all;
`
export const Alias = styled.div`
  color: ${theme('article.info')};
  font-weight: 600;
  margin-right: 7px;
  margin-left: 2px;
  word-break: keep-all;

  ${css.media.mobile`
    font-weight: 500;
    margin-left: 0;
    margin-right: 5px;
    font-size: 13px;
  `}
`
export const UpvoteBtnWrapper = styled.div`
  transform: scale(0.8);
  margin-top: 5px;

  ${css.media.mobile`
    margin-top: 4px;
  `}
`
export const DescWrapper = styled.div`
  ${css.flex('align-center')};
  margin-left: 2px;
`
export const Text = styled.div`
  color: ${theme('article.info')};
  font-size: 12px;
  margin-top: 1px;
`
export const Count = styled.div`
  ${css.media.mobile`
    transform: scale(0.9);
  `}
`
export const LineDivider = styled(LineDividerBase)`
  height: 10px;
  background: ${theme('article.digest')};
  opacity: 0.8;
  margin-left: 12px;
  margin-right: 10px;

  ${css.media.mobile`
    margin-left: 10px;
    margin-right: 8px;
  `}
`
