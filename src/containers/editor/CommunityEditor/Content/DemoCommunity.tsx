/*
 *
 * DemoCommunity
 *
 */

import { FC, memo } from 'react'

import type { TCommunity } from '@/spec'
import { buildLog } from '@/logger'

import { Wrapper, Community, Logo, Title } from '../styles/content/demo_community'

// import { searchOnChange } from './logic'

const _log = buildLog('C:NewExploreContent')

type TProps = {
  item: TCommunity
}

const DemoCommunity: FC<TProps> = ({ item }) => {
  return (
    <Wrapper>
      <Community>
        <Logo src={item.logo} />
        <Title href={`/${item.slug}`}>{item.title}</Title>
      </Community>
    </Wrapper>
  )
}

export default memo(DemoCommunity)
