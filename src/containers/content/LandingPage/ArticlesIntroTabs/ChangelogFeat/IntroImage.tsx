import { FC } from 'react'

import ChangelogDemo from './ChangelogDemo'

import { Wrapper, ImageWrapper } from '../../styles/articles_intro_tabs/changelog_feat/intro_image'

const IntroImage: FC = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <ChangelogDemo />
      </ImageWrapper>
    </Wrapper>
  )
}

export default IntroImage
