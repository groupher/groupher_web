import styled from 'styled-components'

import type { TTestable, TColorName } from '@/spec'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import TreesSVG from '@/icons/Trees'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-both')};
  flex-wrap: wrap;
  gap: 40px 25px;
  height: auto;
  margin-top: 80px;
  width: 1080px;
  width: 80%;
  border-radius: 50%;
  position: relative;
`
export const TreeWrapper = styled.div`
  height: 240px;
  width: 700px;
  /* border-radius: 100%; */
  border-radius: 300px;
  opacity: 0.03;
  z-index: -1;
  overflow: hidden;
  position: absolute;
  top: -20px;
  left: 200px;
`
export const TreesIcon = styled(TreesSVG)`
  height: 240px;
  width: 700px;
  fill: ${theme('artivle.digest')};
`
export const Card = styled.div`
  ${css.flex('align-center')};
  background: white;
  /* border: 1px solid; */
  border-color: ${theme('divider')};
  border-radius: 15px;
  width: auto;
  padding: 5px 10px;
  z-index: 2;

  /* box-shadow: ${css.cardShadow}; */
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
`
export const Avatar = styled.div<{ color: TColorName }>`
  ${css.circle(30)};
  ${css.flex('align-both')};
  padding: 2px;
  color: ${({ color }) => theme(`baseColor.${camelize(color)}`)};
  font-size: 12px;

  /* border: 2px solid; */
  /* border-color: ${({ color }) => theme(`baseColor.${camelize(color)}Bg`)}; */
  background-color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}Bg`)};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-left: 8px;
`
