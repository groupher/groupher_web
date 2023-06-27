import { FC } from 'react'
import { reject } from 'ramda'

import type { TCommunityThread } from '@/spec'
import { ROUTE } from '@/constant/route'

import useCurCommunity from '@/hooks/useCurCommunity'

import {
  Wrapper,
  ItemsWrapper,
  Note,
  Item,
  Title,
  ArrowIcon,
  LinkRaw,
} from '../../styles/header/editors/fixed_links'

type TProps = {
  isAboutLinkFold: boolean
}

const FixedLinks: FC<TProps> = ({ isAboutLinkFold }) => {
  const { slug, threads } = useCurCommunity()

  return (
    <Wrapper>
      <Note>固定链接:</Note>

      <ItemsWrapper>
        {reject((t: TCommunityThread) => t.slug === ROUTE.ABOUT, threads).map(
          (item: TCommunityThread) => (
            <Item key={item.slug}>
              <Title>{item.title}</Title>
              <LinkRaw>
                /{slug}/{item.slug}
              </LinkRaw>
            </Item>
          ),
        )}

        {isAboutLinkFold ? (
          <Item>
            <Title>
              更多
              <ArrowIcon />
            </Title>
            <LinkRaw>关于</LinkRaw>
          </Item>
        ) : (
          <Item>
            <Title>关于</Title>
            <LinkRaw>/{slug}/about</LinkRaw>
          </Item>
        )}
      </ItemsWrapper>
    </Wrapper>
  )
}

export default FixedLinks
