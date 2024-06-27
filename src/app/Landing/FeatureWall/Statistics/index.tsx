import type { FC } from 'react'

import { COLOR_NAME } from '~/const/colors'
import useHover from '~/hooks/useHover'

import Panel from './Panel'
import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/statistics'

const statistics: FC = () => {
  const [cardRef, isCardHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper ref={cardRef} $color={COLOR_NAME.YELLOW}>
      <Panel hovering={isCardHovered} />
      <Footer>
        <Title>统计分析</Title>
        <Desc>社区访问趋势，地域分布，站点来源等，进一步了解你的产品用户。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default statistics
