import styled from 'styled-components'

import type { TTestable, TColorName } from '@/spec'
import css, { theme, rainbow, rainbowLight } from '@/css'
import TreesSVG from '@/icons/Trees'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.rowWrap('align-both')};
  gap: 40px 25px;
  height: auto;
  margin-top: 80px;
  width: 1080px;
  width: 80%;
  border-radius: 50%;
  position: relative;

  ${css.media.mobile`
    border-radius: 15px;
    gap: 30px 20px;
    width: 100%;
    margin-top: 40px;
  `};
`
export const TreeWrapper = styled.div`
  height: 240px;
  width: 700px;
  border-radius: 300px;
  opacity: 0.03;
  z-index: -1;
  overflow: hidden;
  position: absolute;
  top: -20px;
  left: 200px;

  ${css.media.mobile`
    top: 20px;
    left: 0;
    width: 100%;
    height: 350px;
  `};
`
export const TreesIcon = styled(TreesSVG)`
  height: 240px;
  width: 700px;
  fill: ${theme('article.digest')};

  ${css.media.mobile`
    width: 100%;
    height: 350px;
  `};
`
export const Card = styled.div`
  ${css.row('align-center')};
  background: white;
  /* border: 1px solid; */
  border-color: ${theme('divider')};
  border-radius: 15px;
  width: auto;
  padding: 5px 10px;
  z-index: 2;

  /* box-shadow: ${css.cardShadow}; */
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);

  ${css.media.mobile`
    padding: 5px 6px;
  `};
`
export const Avatar = styled.div<{ color: TColorName }>`
  ${css.circle(30)};
  ${css.row('align-both')};
  padding: 2px;
  color: ${({ color }) => rainbow(color)};
  font-size: 12px;
  background-color: ${({ color }) => rainbowLight(color)};

  ${css.media.mobile`
    ${css.circle(20)};
    ${css.row('align-both')};
    font-size: 8px;
  `};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-left: 8px;

  ${css.media.mobile`
    font-size: 12px;
    margin-left: 5px;
  `};
`
