import { FC } from 'react'
import { observer } from 'mobx-react'

import useBannerLayout from '@/hooks/useBannerLayout'
import { mockHelpCats } from '@/mock'

import Category from './Category'
import { Wrapper, CatsWrapper } from '../styles/blocks_layout'

const BlocksLayout: FC = () => {
  const cats = mockHelpCats()
  const bannerLayout = useBannerLayout()

  return (
    <Wrapper bannerLayout={bannerLayout}>
      <CatsWrapper bannerLayout={bannerLayout}>
        {cats.map((cat) => (
          <Category key={cat.id} color={cat.color} title={cat.title} articles={cat.articles} />
        ))}
      </CatsWrapper>
    </Wrapper>
  )
}

export default observer(BlocksLayout)
