import styled, { css, theme } from '@/css'

// import { CountAreaMask } from '.'
import { Wrapper as TagItem } from './tag_item'

export const Wrapper = styled.div`
  position: relative;
  ${css.row()};
  color: ${theme('banner.desc')};
  margin-top: -2px;
`
export const Count = styled.div`
  font-size: 0.7rem;
  opacity: 0.8;

  ${TagItem}:hover & {
    color: ${theme('banner.title')};
    opacity: 1;
  }
  &:hover {
    color: ${theme('banner.title')};
    cursor: pointer;
    opacity: 1;
  }
`
const MAX_WIDTH = 50

type TChartBar = { percent: number }
export const ChartBar = styled.div.attrs<TChartBar>(({ percent }: { percent: number }) => ({
  style: {
    width: `${MAX_WIDTH * percent}px`,
  },
}))<TChartBar>`
  position: absolute;
  bottom: -1px;
  right: 0;
  height: 2px;
  border-radius: 3px;
  background: linear-gradient(90deg, #69848a 80%, transparent 100%);
  opacity: 0.5;

  ${TagItem}:hover & {
    opacity: 0.8;
  }
`
