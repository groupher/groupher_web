import { FC, useState } from 'react'

import IntroDigest from './IntroDigest'
import IntroImage from './IntroImage'
import IntroItems from './IntroItems'

import { Wrapper, MobileOnly, DesktopOnly } from '../../styles/feature_wall/kanban_feat'

const KanbanFeat: FC = () => {
  const [inView, setInView] = useState(false)

  return (
    <Wrapper $active={inView}>
      <DesktopOnly>
        <IntroImage $active={inView} />
        <IntroDigest inViewChange={(cur) => setInView(cur)} />
      </DesktopOnly>

      <MobileOnly>
        <IntroDigest inViewChange={(cur) => setInView(cur)} />
        <IntroImage $active={inView} />
        <IntroItems />
      </MobileOnly>
    </Wrapper>
  )
}

export default KanbanFeat
