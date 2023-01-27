import styled from 'styled-components'

import Img from '@/Img'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'
import { pixelAdd } from '@/utils/dom'

import type { TCoverImage, TImagePos } from '../../spec'
import {
  IMAGE_CONTAINER_SIZE,
  IMAGE_SHADOW,
  IMAGE_BORDER_RADIUS,
  LINEAR_BORDER,
  IMAGE_SIZE,
} from '../../constant'

import { getImageTranslate, getLinearBorder, getImageSize, getLightPos } from '../metric'

type TWrapper = { hasImage: boolean; background: string }
export const Wrapper = styled.div<TWrapper>`
  ${css.flexColumn('align-both')};
  width: ${IMAGE_CONTAINER_SIZE.WIDTH};
  height: ${IMAGE_CONTAINER_SIZE.HEIGHT};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  background-image: ${({ hasImage, background }) => (hasImage ? background : 'none')};
`
// 'linear-gradient(to bottom, #683FD1, #DD8DC6)'

type TGlassBorder = TCoverImage & { hasGlassBorder: boolean }
export const GlassBorder = styled.div<TGlassBorder>`
  border-radius: ${({ borderRadiusLevel }) => pixelAdd(IMAGE_BORDER_RADIUS[borderRadiusLevel], 5)};

  ${css.flex('align-both')};

  min-width: ${({ size, ratio, hasGlassBorder }) =>
    pixelAdd(getImageSize(size, ratio).width, hasGlassBorder ? 15 : 0)};
  min-height: ${({ size, ratio, hasGlassBorder }) =>
    pixelAdd(getImageSize(size, ratio).height, hasGlassBorder ? 13 : 0)};

  ${({ hasGlassBorder }) =>
    hasGlassBorder ? 'background-color: rgba(255, 255, 255, 0.2);backdrop-filter: blur(5px);' : ''};

  /* border-color: transparent; */

  /* padding-top: 6px; */

  position: relative;
  box-shadow: ${({ shadowLevel }) => IMAGE_SHADOW[shadowLevel]};
  transform: ${({ pos, size, rotate }) => `${getImageTranslate(pos, size)} rotate(${rotate}deg);`};

  transition: all 0.2s;
`

type TImage = TCoverImage & TActive
export const Image = styled(Img)<TImage>`
  border: 1px solid transparent;
  background-image: ${({ linearBorderPos }) => getLinearBorder(linearBorderPos)};

  border-image-slice: 1;
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-color: ${({ linearBorderPos, $active }) => {
    if (linearBorderPos === LINEAR_BORDER.ALL) {
      return $active ? theme('article.digest') : '#dcd6ca'
    }

    return 'transparent'
  }};

  /* transform: ${({ pos, size }) => getImageTranslate(pos, size)}; */
  width: ${({ size, ratio }) => getImageSize(size, ratio).width};
  height: ${({ size, ratio }) => getImageSize(size, ratio).height};

  object-fit: cover;
  margin-top: ${({ size }) => (size === IMAGE_SIZE.LARGE ? '-5px' : 0)};

  box-shadow: ${({ shadowLevel }) => IMAGE_SHADOW[shadowLevel]};
  border-radius: ${({ borderRadiusLevel }) => IMAGE_BORDER_RADIUS[borderRadiusLevel]};

  /* transform: ${({ rotate }) => `rotate(${rotate}deg)`}; */

  transition: all 0.2s;
`

export const Light = styled.div<{ pos: TImagePos }>`
  position: absolute;
  top: ${({ pos }) => `calc(50% + ${getLightPos(pos).top})`};
  left: ${({ pos }) => `calc(50% + ${getLightPos(pos).left})`};

  ${css.size(400)};

  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 65%
  );
  background-blend-mode: lighten;
  pointer-events: none;
  z-index: 1;

  transition: all 0.2s;
`
