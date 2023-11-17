import styled from 'styled-components'

import type { TTestable } from '@/spec'

import Img from '@/Img'
import css from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;

  ${css.media.mobile`
    height: auto;
    margin-bottom: 0;
  `};
`
export const ImageWrapper = styled.div`
  max-height: 300px;
  overflow: hidden;
`
export const Image = styled(Img)`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;

  ${css.media.mobile`
    border-radius: 4px;

  `};
`
