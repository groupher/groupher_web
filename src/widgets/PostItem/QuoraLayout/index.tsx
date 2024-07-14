/*
 *
 * PostItem
 *
 */

import { type FC, memo } from 'react'

import type { TPost } from '~/spec'

import DesktopView from './DesktopView'
import MobileView from './MobileView'
// import ListView from './ListView'

import useSalon from '../styles/quora_layout'

type TProps = {
  article: TPost
  isMobilePreview: boolean
}

const PostItem: FC<TProps> = ({ article, isMobilePreview }) => {
  const s = useSalon()

  if (isMobilePreview) {
    return <MobileView article={article} />
  }

  return (
    <article className={s.wrapper}>
      <MobileView article={article} />
      <DesktopView article={article} />
    </article>
  )
}

export default memo(PostItem)
