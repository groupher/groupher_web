import { FC } from 'react'
import { useParallax } from 'react-scroll-parallax'

import { Wrapper } from '../../styles/dashboard_intros/trend_tab/content_card'

const ContentCard: FC = () => {
  const { ref } = useParallax<HTMLDivElement>({ speed: 3 })

  return (
    <Wrapper ref={ref}>
      <div>trend tab </div>
    </Wrapper>
  )
}

export default ContentCard
