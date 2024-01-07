import { FC } from 'react'
import { useParallax } from 'react-scroll-parallax'

import { Wrapper, WebCard } from '../../styles/dashboard_intros/seo_tab/content_card'

const ContentCard: FC = () => {
  const { ref } = useParallax<HTMLDivElement>({ speed: 3 })

  return (
    <Wrapper ref={ref}>
      <WebCard />
      <div>seo tab </div>
    </Wrapper>
  )
}

export default ContentCard
