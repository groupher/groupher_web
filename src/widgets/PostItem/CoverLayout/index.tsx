/*
 *
 * PostItem
 *
 */

import type { FC } from 'react'

import type { TPost } from '~/spec'

import DesktopView from './DesktopView'
// import ListView from './ListView'

import { Wrapper } from '../styles/cover_layout'

type TProps = {
  article: TPost
}

const PostItem: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <DesktopView article={article} />
    </Wrapper>
  )
}

export default PostItem
