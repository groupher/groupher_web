import { FC } from 'react'
// import { Parallax } from 'react-scroll-parallax'

import type { TActive } from '@/spec'

// import { FEAT_TYPE } from '../../constant'
import KanbanDemo from './KanbanDemo'

import {
  Wrapper,
  ImageWrapper,
  IconsWrapper,
  Icon1,
  Icon2,
  Icon3,
} from '../../styles/articles_intro_tabs/kanban_feat/intro_image'

type TProps = TActive

const IntroImage: FC<TProps> = ({ $active }) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <KanbanDemo />
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
