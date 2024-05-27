/*
 *
 * MasonryCards
 *
 */

import { type FC, type ReactNode, memo } from 'react'
import Masonry from 'react-masonry-css'

import { Wrapper } from './styles'

type TProps = {
  testid?: string
  column?: number
  children: ReactNode
}

const MasonryCards: FC<TProps> = ({ testid = 'masonry-cards', column = 2, children }) => {
  return (
    <Wrapper $testid={testid}>
      <Masonry
        breakpointCols={column}
        className="masonry-cards-grid"
        columnClassName="masonry-cards-grid_column"
      >
        {children}
      </Masonry>
    </Wrapper>
  )
}

export default memo(MasonryCards)
