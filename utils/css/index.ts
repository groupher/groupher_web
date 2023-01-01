/*
 *
 * common styles used in styled-component
 *
 */

import { mediaBreakPoints } from './metric'
import { media, fitContentWidth, fitStickerWidth, fitPageWidth } from './media'
import { flex, flexGrow, flexColumn, flexColumnGrow } from './flex'

import { circle, size } from './shape'

const smokey = (initOpacity = 0.6): string => `
  opacity: ${initOpacity};

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  transition: opacity 0.2s;
`

const cutRest = (width = '100px'): string => `
  max-width: ${width};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const lineClamp = (num = 1): string => `
  position: relative;
  display: -webkit-box;
  -webkit-line-clamp: ${num};
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
`

const cardShadow = 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;'

const css = {
  cutRest,
  lineClamp,
  circle,
  size,
  smokey,
  flex,
  flexGrow,
  flexColumn,
  flexColumnGrow,
  mediaBreakPoints,
  media,
  fitContentWidth,
  fitStickerWidth,
  fitPageWidth,
  cardShadow,
}

export { theme } from '../themes'
export { WIDTH } from './metric'
export { default as zIndex } from './zindex'

export { default as animate } from './animations'

export default css
