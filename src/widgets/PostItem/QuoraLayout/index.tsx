/*
 *
 * PostItem
 *
 */

import { type FC, memo } from 'react'

import type { TPost } from '~/spec'

import DesktopView from './DesktopView'
// import ListView from './ListView'

import useSalon from '../styles/quora_layout'

type TProps = {
  article: TPost
}

const PostItem: FC<TProps> = ({ article }) => {
  const s = useSalon()

  return (
    <article className={s.wrapper}>
      <DesktopView article={article} />
    </article>
  )
}

export default memo(PostItem)
