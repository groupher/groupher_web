import styled from 'styled-components'

import type { TTestable, TColorName } from '@/spec'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-both')};
  flex-wrap: wrap;
  gap: 35px 18px;
  height: auto;
  margin-top: 80px;
  width: 1080px;
  width: 80%;
  border-radius: 50%;
`
export const Card = styled.div<{ angle: number }>`
  ${css.flex('align-center')};
  /* border: 1px solid; */
  border-color: ${theme('divider')};
  border-radius: 15px;
  width: auto;
  padding: 5px 10px;

  /* box-shadow: ${css.cardShadow}; */
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);

  transform: ${({ angle }) => `rotate(${angle}deg)`};
  /* transition: all 0.5s; */
  transition: transform 0.2s ease-in;
  transition-delay: 0.6s;
`
export const Avatar = styled.div<{ color: TColorName }>`
  ${css.circle(30)};
  ${css.flex('align-both')};
  padding: 2px;
  color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}`)};
  font-size: 12px;

  /* border: 2px solid; */
  /* border-color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}`)}; */
  background-color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}Bg`)};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-left: 8px;
`
