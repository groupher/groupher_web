import { FC } from 'react'

import type { TActive } from '@/spec'

import { FEAT_TYPE } from '../../constant'
import HelpDemo from './HelpDemo'

import {
  Wrapper,
  ImageWrapper,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/articles_intro_tabs/help_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <HelpDemo />
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
