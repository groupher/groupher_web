import { FC } from 'react'

import type { TBlog } from '@/spec'
import { ROUTE } from '@/constant'

import TagsList from '@/widgets/TagsList'

import {
  Wrapper,
  TitleLink,
  AddonInfo,
  LinkIcon,
  Brief,
  Title,
  TagListWrapper,
} from '../styles/desktop_view/header'

type TProps = {
  item: TBlog
}

const Header: FC<TProps> = ({ item }) => {
  return (
    <Wrapper>
      <Brief>
        <Title href={`/${ROUTE.BLOG}/${item.id}`}>{item.title}</Title>

        <AddonInfo>
          {item.linkAddr && (
            <TitleLink href={item.linkAddr} target="_blank">
              <LinkIcon />
              原文
            </TitleLink>
          )}
          <TagListWrapper>
            <TagsList items={item.articleTags} />
          </TagListWrapper>
        </AddonInfo>
      </Brief>
    </Wrapper>
  )
}

export default Header
