import styled from 'styled-components'

import { theme } from '@/css'

import { Wrapper as WrapperBase } from './emotion_bar'

export { EmojiImg, Item, Count } from './emotion_bar'

export const Wrapper = styled(WrapperBase)`
  width: 200px;
  position: absolute;
  bottom: 60px;
  right: 50px;
  transform: rotate(3deg);
  background: ${theme('alphaBg2')};
  opacity: 0.8;
`
