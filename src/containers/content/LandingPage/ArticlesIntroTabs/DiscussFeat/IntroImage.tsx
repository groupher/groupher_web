import { FC } from 'react'

import type { TActive } from '@/spec'

import { FEAT_TYPE } from '../../constant'

import DiscussDemo from './DiscussDemo'

import {
  Wrapper,
  ImageWrapper,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/articles_intro_tabs/discuss_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <DiscussDemo />
      </ImageWrapper>

      <IconsWrapper>
        <Icon1 />
        <Icon2 />
        <Icon3 />
      </IconsWrapper>
    </Wrapper>
  )
}

export default IntroImage
