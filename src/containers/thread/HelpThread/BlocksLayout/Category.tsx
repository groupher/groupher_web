import { FC, memo } from 'react'

// import { config, library } from '@fortawesome/fontawesome-svg-core'
// config.autoAddCss = false

import FaIcons from '@/widgets/FaIcons'

import type { TArticle, TColorName } from '@/spec'
import {
  Wrapper,
  Header,
  IconWrapper,
  Title,
  ItemsWrapper,
  Item,
  MoreLink,
} from '../styles/blocks_layout/category'
import { gotoDetailLayout } from '../logic'

const FOLD_LIMIT = 5

type TProps = {
  color: TColorName
  title: string
  desc: string
  articles: TArticle[]
}

const Category: FC<TProps> = ({ color, title, desc, articles }) => {
  return (
    <Wrapper color={color}>
      <Header>
        <IconWrapper color={color}>
          <FaIcons icon="music" size={15} color={color} />
        </IconWrapper>
        <Title>{title}</Title>
      </Header>

      <ItemsWrapper>
        {articles.slice(0, FOLD_LIMIT).map((article) => (
          <Item key={article.id} color={color} onClick={() => gotoDetailLayout()}>
            {article.title}
          </Item>
        ))}
      </ItemsWrapper>

      {articles.length > FOLD_LIMIT && <MoreLink linkColor>查看全部</MoreLink>}
    </Wrapper>
  )
}

export default memo(Category)
