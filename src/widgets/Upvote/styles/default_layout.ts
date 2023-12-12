import type { TActive, TColorName, TTestable } from '@/spec'
import styled, { css, rainbow, rainbowLight, theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
`

type TButton = TActive & { color: TColorName }
export const Button = styled.div<TButton>`
  ${css.row('align-center')};
  margin-right: 25px;

  border: 1px solid transparent;
  border-color: ${({ $active, color }) =>
    $active ? rainbowLight(color) : theme('button.upvoteBorder')};

  background: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};

  border-radius: 16px;
  padding: 12px 15px;

  &:hover {
    border-color: ${theme('button.upvoteBorder')};
    background: ${theme('alphaBg2')};
    cursor: pointer;
  }

  &:hover svg {
    fill: ${({ color }) => rainbow(color)};
    transform: scale(1.1);
  }

  &:active svg {
    fill: ${({ color }) => rainbow(color)};
    transform: scale(1.8);
    margin-top: -2px;
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
  ${css.row('align-both')};

  ${css.media.mobile`
    margin-top: 4px;
  `}
`
export const DescWrapper = styled.div`
  ${css.row('align-center')};
  margin-left: 2px;
`
export const Count = styled.div`
  margin-left: 7px;
`
export const Digest = styled.div`
  ${css.column('align-start')};
`
export const Note = styled.div`
  ${css.row('align-center')};
  color: ${theme('lightText')};
  font-size: 12px;
  font-weight: 400;
  margin-left: -2px;
`
export const Name = styled.div`
  ${css.cutRest('50px')};
  color: ${theme('article.digest')};
`
