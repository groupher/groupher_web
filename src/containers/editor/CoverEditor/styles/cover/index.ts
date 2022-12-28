import styled from 'styled-components'

import Img from '@/Img'

import css, { theme } from '@/utils/css'
import { pixelAdd } from '@/utils/dom'

import type { TCoverImage } from '../../spec'
import { IMAGE_SHADOW, IMAGE_BORDER_RADIUS } from '../../constant'

import { getImageCor, getLinearBorder } from '../metric'

const IMAGE_WIDTH = '700px'
const IMAGE_HEIGHT = '400px'

export const Wrapper = styled.div<{ hasImage: boolean }>`
  ${css.flexColumn('align-both')};
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_HEIGHT};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  background-image: ${({ hasImage }) =>
    // hasImage ? 'linear-gradient(to bottom, #9fbdd3, #ebe6e2)' : 'none'};
    hasImage ? 'linear-gradient(to bottom, #683FD1, #DD8DC6)' : 'none'};
`

export const GlassBorder = styled.div<TCoverImage>`
  position: absolute;
  top: ${({ pos }) => getImageCor(pos).top};
  left: ${({ pos }) => getImageCor(pos).left};
  border-radius: ${({ borderRadiusLevel }) => pixelAdd(IMAGE_BORDER_RADIUS[borderRadiusLevel], 5)};

  ${css.flexColumn('align-both')};
  width: ${pixelAdd(IMAGE_WIDTH, 7)};
  height: ${pixelAdd(IMAGE_HEIGHT, 7)};
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);

  /* background: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px; */
  box-shadow: ${({ shadowLevel }) => IMAGE_SHADOW[shadowLevel]};
`

export const Image = styled(Img)<TCoverImage>`
  position: absolute;
  top: 0;
  left: 0;

  border: 1px solid transparent;
  background-image: ${({ linearBorderPos }) => getLinearBorder(linearBorderPos)};
  border-image-slice: 1;
  background-origin: border-box;
  background-clip: content-box, border-box;

  top: ${({ pos }) => getImageCor(pos).top};
  left: ${({ pos }) => getImageCor(pos).left};

  width: 700px;
  height: 400px;
  object-fit: cover;

  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; // one */
  box-shadow: ${({ shadowLevel }) => IMAGE_SHADOW[shadowLevel]};
  border-radius: ${({ borderRadiusLevel }) => IMAGE_BORDER_RADIUS[borderRadiusLevel]};

  transition: all 0.2s;
`
