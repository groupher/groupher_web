import { FC, useState } from 'react'

import IntroDigest from './IntroDigest'
import IntroImage from './IntroImage'

import { Wrapper } from '../../styles/feature_wall/kanban_feat'

const KanbanFeat: FC = () => {
  const [inView, setInView] = useState(false)

  return (
    <Wrapper $active={inView}>
      <IntroImage $active={inView} />
      <IntroDigest inViewChange={(cur) => setInView(cur)} />
    </Wrapper>
  )
}

export default KanbanFeat
