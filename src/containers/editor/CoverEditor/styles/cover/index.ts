import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

import type { TImagePos, TSettingLevel } from '../../spec'
import { IMAGE_SHADOW } from '../../constant'

import { getImageCor } from '../metric'

export const Wrapper = styled.div<{ hasImage: boolean }>`
  ${css.flexColumn('align-both')};
  margin-left: 20px;
  width: 700px;
  height: 400px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  background-image: ${({ hasImage }) =>
    hasImage ? 'linear-gradient(to bottom, #9fbdd3, #ebe6e2)' : 'none'};
`

type TCoverImage = { pos: TImagePos; shadowLevel: TSettingLevel }
export const Image = styled(Img)<TCoverImage>`
  position: absolute;

  top: ${({ pos }) => getImageCor(pos).top};
  left: ${({ pos }) => getImageCor(pos).left};

  width: 700px;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;

  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; // one */
  box-shadow: ${({ shadowLevel }) => IMAGE_SHADOW[shadowLevel]};
`
