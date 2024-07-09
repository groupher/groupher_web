import type { FC } from 'react'

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
