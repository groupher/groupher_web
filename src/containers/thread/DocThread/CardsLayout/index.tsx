import { FC } from 'react'
import { observer } from 'mobx-react'

import { mockHelpCats } from '@/mock'
import useBannerLayout from '@/hooks/useBannerLayout'

import Category from './Category'
import { Wrapper, CatsWrapper } from '../styles/cards_layout'

type TProps = {
  testid?: string
}

const BlocksLayout: FC<TProps> = ({ testid = 'home' }) => {
  const cats = mockHelpCats()

  const bannerLayout = useBannerLayout()

  return (
    <Wrapper bannerLayout={bannerLayout}>
      <CatsWrapper bannerLayout={bannerLayout}>
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

export default observer(BlocksLayout)
