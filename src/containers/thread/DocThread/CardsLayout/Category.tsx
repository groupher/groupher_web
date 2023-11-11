import { FC, memo, useState } from 'react'

// import { config, library } from '@fortawesome/fontawesome-svg-core'
// config.autoAddCss = false

import { mockUsers } from '@/mock'

import ArrowButton from '@/widgets/Buttons/ArrowButton'
import Facepile from '@/widgets/Facepile'

import type { TArticle, TColorName } from '@/spec'
import {
  Wrapper,
  Header,
  Footer,
  Topping,
  UpdateDate,
  Title,
  Desc,
  ItemsWrapper,
  Item,
} from '../styles/cards_layout/category'
import { gotoDetailLayout } from '../logic'

const FOLD_LIMIT = 5

type TProps = {
  color: TColorName
  title: string
  desc: string
  articles: TArticle[]
}

const Category: FC<TProps> = ({ color, title, desc, articles }) => {
  const [sliceCount, setSliceCount] = useState(FOLD_LIMIT)

  return (
    <Wrapper color={color}>
      <Header>
        <Topping>
          <UpdateDate>2022-3-4</UpdateDate>
          <Facepile users={mockUsers(2)} total={3} />
        </Topping>

        <Title>{title}</Title>
        <Desc>We are proud today to introduce the production-ready Next.js 8, featuring:</Desc>
      </Header>

      <ItemsWrapper>
        {articles.slice(0, sliceCount).map((article) => (
          <Item key={article.id} color={color} onClick={() => gotoDetailLayout()}>
            {article.title}
          </Item>
        ))}
      </ItemsWrapper>

      {articles.length >= FOLD_LIMIT && (
        <Footer>
          {articles.length >= FOLD_LIMIT && sliceCount <= FOLD_LIMIT && (
            <ArrowButton down onClick={() => setSliceCount(articles.length)}>
              查看全部
            </ArrowButton>
          )}

          {articles.length >= FOLD_LIMIT && sliceCount > FOLD_LIMIT && (
            <ArrowButton up onClick={() => setSliceCount(FOLD_LIMIT)} initWidth={26}>
              收起
            </ArrowButton>
          )}
        </Footer>
      )}
    </Wrapper>
  )
}

export default memo(Category)
