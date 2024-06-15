import { mockHelpCats } from '@/mock'
import useLayout from '@/hooks/useLayout'

import Category from './Category'
import { Wrapper, CatsWrapper } from '../styles/cards_layout'

export default () => {
  const cats = mockHelpCats()

  const { bannerLayout } = useLayout()

  return (
    <Wrapper $bannerLayout={bannerLayout}>
      <CatsWrapper $bannerLayout={bannerLayout}>
        {cats.map((cat) => (
          <Category
            key={cat.id}
            color={cat.color}
            title={cat.title}
            desc={cat.desc}
            articles={cat.articles}
          />
        ))}
      </CatsWrapper>
    </Wrapper>
  )
}
