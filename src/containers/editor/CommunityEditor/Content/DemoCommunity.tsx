/*
 *
 * DemoCommunity
 *
 */

import { FC, memo } from 'react'

import type { TCommunity } from '@/spec'
import { buildLog } from '@/utils/logger'

// import SearchBox from './SearchBox'
import { Wrapper, Community, Logo, Title } from '../styles/content/demo_community'

// import { searchOnChange } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:NewExploreContent')

type TProps = {
  item: TCommunity
}

const DemoCommunity: FC<TProps> = ({ item }) => {
  return (
    <Wrapper>
      <Community>
        <Logo src={item.logo} slug={item.slug} />
        <Title href={`/${item.slug}`}>{item.title}</Title>
      </Community>
    </Wrapper>
  )
}

export default memo(DemoCommunity)
