import { type FC, memo } from 'react'

import { prettyNum } from '~/fmt'
import { nilOrEmpty } from '~/validator'
import TrendLine from '~/widgets/TrendLine'

import { Wrapper, NumberItem, ActivitySpark } from './styles/content_status'

type TProps = {
  count: number
  contributesDigest: number[]
  onClick?: () => void
}

const ContentStatus: FC<TProps> = ({ count, onClick = null, contributesDigest }) => {
  const trendData = !nilOrEmpty(contributesDigest) ? contributesDigest : [0, 0, 0, 0, 0, 0]

  return (
    <Wrapper>
      <NumberItem readOnly={false} onClick={onClick}>
        {prettyNum(count)}
      </NumberItem>

      <ActivitySpark>
        {/* <TrendLine data={[12, 4, 7, 5, 4, 10, 6]} /> */}
        <TrendLine data={trendData} />
      </ActivitySpark>
    </Wrapper>
  )
}

export default memo(ContentStatus)
