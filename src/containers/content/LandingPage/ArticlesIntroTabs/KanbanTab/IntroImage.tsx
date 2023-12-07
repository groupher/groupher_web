import { FC } from 'react'
// import { Parallax } from 'react-scroll-parallax'

import KanbanDemo from './KanbanDemo'

import { Wrapper } from '../../styles/articles_intro_tabs/kanban_tab/intro_image'

const IntroImage: FC = () => {
  return (
    <Wrapper>
      <KanbanDemo />
    </Wrapper>
  )
}

export default IntroImage
