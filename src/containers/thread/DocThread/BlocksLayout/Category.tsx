import { FC, memo, useState } from 'react'

// import { config, library } from '@fortawesome/fontawesome-svg-core'
// config.autoAddCss = false

import FaIcons from '@/widgets/FaIcons'
import ArrowButton from '@/widgets/Buttons/ArrowButton'

import type { TArticle, TColorName } from '@/spec'
import {
  Wrapper,
  Header,
  IconWrapper,
  Title,
  ItemsWrapper,
  Item,
} from '../styles/blocks_layout/category'
import { gotoDetailLayout } from '../logic'

const FOLD_LIMIT = 5

type TProps = {
  color: TColorName
  title: string
  articles: TArticle[]
}

const Category: FC<TProps> = ({ color, title, articles }) => {
  const [sliceCount, setSliceCount] = useState(FOLD_LIMIT)

  return (
    <Wrapper color={color}>
      <Header>
        <IconWrapper color={color}>
          <FaIcons icon="music" size={15} color={color} opacity={0.6} />
        </IconWrapper>
        <Title>{title}</Title>
      </Header>

      <ItemsWrapper>
        {articles.slice(0, sliceCount).map((article) => (
          <Item key={article.id} color={color} onClick={() => gotoDetailLayout()}>
            {article.title}
          </Item>
        ))}
      </ItemsWrapper>

      {articles.length >= FOLD_LIMIT && sliceCount <= FOLD_LIMIT && (
        <ArrowButton down onClick={() => setSliceCount(articles.length)} top={18}>
          查看全部
        </ArrowButton>
      )}

      {articles.length >= FOLD_LIMIT && sliceCount > FOLD_LIMIT && (
        <ArrowButton up onClick={() => setSliceCount(FOLD_LIMIT)} top={18}>
          收起
        </ArrowButton>
      )}
    </Wrapper>
  )
}

export default memo(Category)
