import type { TTestable } from '~/spec'
import Img from '~/Img'
import styled, { css, theme } from '~/css'

type TWrapper = TTestable
export const Wrapper = styled.div.attrs<TWrapper>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  /* ${css.row('align-start', 'justify-between')}; */
  width: 100%;
  position: relative;
  background: ${theme('alphaBg2')};
  margin-bottom: 10px;
  padding: 10px;
  padding-top: 8px;
  padding-bottom: 5px;
  border-radius: 6px;
  border: 1px solid transparent;

  &:hover {
    /* border-color: ${theme('article.digest')}; */
    cursor: pointer;
    opacity: 0.9;
  }

  /* transition: all 0.1s; */
`
export const Header = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-bottom: 4px;
`
export const TimeStamp = styled.div`
  font-size: 12px;
  color: ${theme('article.info')};
`
export const Title = styled.div`
  ${css.lineClamp(2)}
  font-size: 14px;
  color: ${theme('article.title')};
  width: 100%;
  font-weight: 500;
  opacity: 0.9;
  letter-spacing: 0.02em;
  line-height: 1.62;
`
export const Footer = styled.div`
  ${css.row('align-center', 'justify-between')};
  line-height: 20px;
  color: ${theme('article.info')};
  margin-top: 10px;
  margin-left: -16px;
  width: calc(100% + 30px);
  transform: scale(0.9);
`
export const Author = styled.div`
  ${css.row('align-center')};
`
export const Avatar = styled(Img)`
  ${css.circle(14)};
`
export const Name = styled.div`
  margin-left: 6px;
`
