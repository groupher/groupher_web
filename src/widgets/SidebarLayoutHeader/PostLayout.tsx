/*
 *
 */

import { FC } from 'react'

import { SpaceGrow, SexyDivider } from '@/widgets/Common'
import AccountUnit from '@/widgets/AccountUnit'
import SearchBox from '@/widgets/SearchBox'

import { Wrapper, InnerWrapper, MainArea } from './styles/post_layout'

type TProps = {
  testid?: string
}

const PostLayout: FC<TProps> = ({ testid = 'sidebar-layout-header' }) => {
  return (
    <Wrapper>
      <InnerWrapper testid={testid}>
        <MainArea>
          <SearchBox left={-14} top={-5} />
          <SpaceGrow />
          <AccountUnit top={-5} />
        </MainArea>
      </InnerWrapper>

      <SexyDivider top={16} />
    </Wrapper>
  )
}

export default PostLayout
