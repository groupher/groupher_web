import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable } from '@/spec'

import Button from '@/widgets/Buttons/Button'
import LinkSVG from '@/icons/LinkOutside'

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
  ${css.flexColumn('align-center')};
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
  font-size: 18px;
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

export const ButtonGroup = styled.div`
  ${css.flex('align-center')};
  gap: 0 22px;
  margin-top: 30px;
`
export const DemoPanel = styled.div`
  ${css.flexColumn()};
  gap: 3px 0;
  padding: 6px 2px;
  width: 100px;
`

export const DemoMenuItem = styled(Link)`
  ${css.flex('justify-between', 'align-center')};
  color: ${theme('article.title')};
  font-size: 14px;
  padding: 2px 4px;
  text-decoration: none;

  &:hover {
    /* font-weight: 600; */
    cursor: pointer;
    background: ${theme('hoverBg')};
    text-decoration: none;
  }
`
export const LinkIcon = styled(LinkSVG)`
  ${css.size(8)};
  color: ${theme('article.digest')};
  opacity: 0.4;

  ${DemoMenuItem}:hover & {
    opacity: 1;
  }
`
export const DemoButton = styled(Button)`
  border-color: ${theme('article.digest')};

  &:hover {
    border-color: ${theme('article.title')};
  }

  transition: all 0.2s;
`
