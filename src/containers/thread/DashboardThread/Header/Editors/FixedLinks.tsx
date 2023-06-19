import { FC } from 'react'

import type { TCommunityThread } from '@/spec'

import useCurCommunity from '@/hooks/useCurCommunity'

import {
  Wrapper,
  ItemsWrapper,
  Note,
  Item,
  Title,
  LinkRaw,
} from '../../styles/header/editors/fixed_links'

const FixedLinks: FC = () => {
  const curCommunity = useCurCommunity()

  return (
    <Wrapper>
      <Note>固定链接:</Note>

      <ItemsWrapper>
        {curCommunity.threads.map((item: TCommunityThread) => (
          <Item key={item.raw}>
            <Title>{item.title}</Title>
            <LinkRaw>
              /{curCommunity.raw}/{item.raw}
            </LinkRaw>
          </Item>
        ))}
      </ItemsWrapper>
    </Wrapper>
  )
}

export default FixedLinks
