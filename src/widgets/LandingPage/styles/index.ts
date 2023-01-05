import styled from 'styled-components'

import type { TTestable } from '@/spec'

// import Img from '@/Img'
import css, { theme } from '@/utils/css'
import InfoSVG from '@/icons/Info'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  min-height: 100vh;
  width: 100%;
`
export const Banner = styled.div`
  ${css.flexColumn('align-both')};
  height: 700px;
  width: 100%;
  position: relative;

  background: radial-gradient(circle at 35% 35%, #f39e8d70 0, transparent 25%),
    radial-gradient(circle at 80% 30%, #ffeba824 0, transparent 40%),
    radial-gradient(circle at 58% 50%, #5d1f8a2e 0, transparent 30%),
    radial-gradient(circle at 40% 45%, #961fb333 0, transparent 40%);
`
export const Title = styled.div`
  font-size: 40px;
  ${theme('article.title')};
  font-weight: 600;
`
export const Desc = styled.p`
  font-size: 16px;
  ${theme('article.digest')};
  margin-top: 15px;
  opacity: 0.8;
`
export const InfoIcon = styled(InfoSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 5px;
`
export const Note = styled.div`
  color: ${theme('article.digest')};
  ${css.flex('align-center')};
  font-size: 13px;
  margin-top: 20px;
`
