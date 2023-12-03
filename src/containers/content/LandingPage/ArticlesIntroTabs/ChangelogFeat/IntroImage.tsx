import { FC } from 'react'

import type { TActive } from '@/spec'

import ChangelogDemo from './ChangelogDemo'

import {
  Wrapper,
  ImageWrapper,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/articles_intro_tabs/changelog_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <ChangelogDemo />
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
