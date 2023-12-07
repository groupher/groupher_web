import { FC } from 'react'

import {
  Wrapper,
  Header,
  Dot,
  BlocksWrapper,
  BlocksSolidIcon,
} from '../../../styles/articles_intro_tabs/changelog_tab/changelog_demo/cover_preview'

const CoverPreview: FC = () => {
  return (
    <Wrapper>
      <Header>
        <Dot />
        <Dot />
        <Dot />
      </Header>
      <BlocksWrapper>
        <BlocksSolidIcon />
        <BlocksSolidIcon />
        <BlocksSolidIcon />
        <BlocksSolidIcon />
      </BlocksWrapper>
    </Wrapper>
  )
}

export default CoverPreview
