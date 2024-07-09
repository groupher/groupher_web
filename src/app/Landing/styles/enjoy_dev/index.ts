import type { TTestable } from '~/spec'
import styled, { css, theme } from '~/css'

import UPvoteSVG from '~/icons/Upvote'

export { GradientText } from '..'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 100%;
  height: auto;
  margin-top: 100px;
  margin-bottom: 100px;
`
export const Slogan = styled.div`
  ${css.column('align-both')};
  margin-bottom: 20px;
`
export const Tips = styled.div`
  color: ${theme('article.title')};
  font-style: italic;
  font-size: 12px;
  padding: 2px 14px;
  margin-bottom: 10px;
  border: 1px solid;
  border-radius: 10px;
  border-color: ${theme('divider')};
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 32px;
  font-weight: 500;

  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;
  opacity: 0.9;

  ${css.media.mobile`
    font-size: 22px;
    font-weight: 600;
  `};
`
export const Desc = styled.div`
  ${css.row('align-center')};
  font-size: 17px;
  color: ${theme('article.digest')};
  margin-top: 12px;
  opacity: 0.8;

  ${css.media.mobile`
    font-size: 15px;
    text-align: center;
    padding: 0 20px;
  `};
`

export const Wall = styled.div`
  ${css.column('align-both')};
  width: 100%;
  height: auto;
  margin-top: 25px;
  position: relative;

  ${css.media.mobile`
    width: 2000%;
    overflow: scroll;
    transform: scale(0.7);
    padding-left: 600px;
    height: 980px;
    overflow-y: hidden;
    margin-top: -100px;
  `};
`
export const GridBgWrapper = styled.div`
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: calc(100% + 30px);

  background-image: linear-gradient(#d9d9d9 1.5px, transparent 1.5px),
    linear-gradient(to right, #d9d9d9 1.5px, transparent 1.5px);
  background-size: 15px 15px;
  background-color: rgba(255, 255, 255, 0);

  border-radius: 30px;
`

const BottonNote = styled.div`
  ${css.row('align-center')};
  margin-top: 8px;
  color: ${theme('article.digest')};
  font-size: 20px;
  position: relative;
  z-index: 1;

  &:before {
    content: ' ';
    display: block;
    height: 90%;
    width: 100%;
    margin-left: -3px;
    margin-right: -3px;
    position: absolute;
    background: rgba(234, 221, 6, 0.3);
    transform: rotate(2deg);
    top: -1px;
    left: -1px;
    border-radius: 20% 25% 20% 24%;
    padding: 10px 3px 3px 10px;
    z-index: -1;
  }
`
export const VS = styled.div`
  font-size: 50px;
  font-weight: 600;
  font-style: italic;
  color: ${theme('divider')};
  padding: 0 20px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 30px;
  position: relative;
  background: white;
`

export const CompareWraper = styled.div`
  ${css.row('align-both')};
  margin-top: 10px;
`
export const NoNote = styled(BottonNote)`
  color: ${theme('rainbow.red')};

  &:before {
    top: 4px;
    left: 13px;
    background: #ffe7e79e;
  }
`
export const YesNote = styled(BottonNote)`
  color: ${theme('rainbow.green')};

  &:before {
    background: #d8ffca40;
  }
`
export const YesIcon = styled(UPvoteSVG)`
  fill: ${theme('rainbow.green')};
  ${css.size(18)};
  margin-right: 5px;
  opacity: 0.8;
`
export const NoIcon = styled(UPvoteSVG)`
  fill: ${theme('rainbow.red')};
  ${css.size(18)};
  margin-right: 5px;
  transform: rotate(180deg);
  opacity: 0.8;
`
