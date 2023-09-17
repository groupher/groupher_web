import { FC } from 'react'
import { observer } from 'mobx-react'
import { reject } from 'ramda'

import type { TCommunityThread } from '@/spec'
import { ROUTE } from '@/constant/route'

import useViewingCommunity from '@/hooks/useViewingCommunity'

import {
  Wrapper,
  ItemsWrapper,
  Note,
  Item,
  Title,
  ArrowIcon,
  LinkSlug,
} from '../../styles/header/editors/fixed_links'

type TProps = {
  isAboutLinkFold: boolean
}

const FixedLinks: FC<TProps> = ({ isAboutLinkFold }) => {
  const { slug, threads } = useViewingCommunity()

  return (
    <Wrapper>
      <Note>固定链接:</Note>

      <ItemsWrapper>
        {reject((t: TCommunityThread) => t.slug === ROUTE.ABOUT, threads).map(
          (item: TCommunityThread) => (
            <Item key={item.slug}>
              <Title>{item.title}</Title>
              <LinkSlug>
                /{slug}/{item.slug}
              </LinkSlug>
            </Item>
          ),
        )}

        {isAboutLinkFold ? (
          <Item>
            <Title>
              更多
              <ArrowIcon />
            </Title>
            <LinkSlug>关于</LinkSlug>
          </Item>
        ) : (
          <Item>
            <Title>关于</Title>
            <LinkSlug>
              /{slug}/{ROUTE.ABOUT}
            </LinkSlug>
          </Item>
        )}
      </ItemsWrapper>
    </Wrapper>
  )
}

export default observer(FixedLinks)
