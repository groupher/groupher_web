import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

import type { TImagePos } from '../../spec'
import { getImageCor } from '../metric'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')};
  width: 680px;
  height: 400px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  background-image: linear-gradient(to bottom, #9fbdd3, #ebe6e2);
`

export const Image = styled(Img)<{ pos: TImagePos }>`
  position: absolute;

  top: ${({ pos }) => getImageCor(pos).top};
  left: ${({ pos }) => getImageCor(pos).left};

  width: 680px;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; // one
`
