/*
 *
 * PostItem
 *
 */

import type { FC } from 'react'

import type { TPost } from '~/spec'

import DesktopView from './DesktopView'
// import ListView from './ListView'

import useSalon from '../styles/minimal_layout'

type TProps = {
  article: TPost
  isMobilePreview: boolean
}

const PostItem: FC<TProps> = ({ article, isMobilePreview }) => {
  const s = useSalon()

  return (
    <section className={s.wrapper}>
      <DesktopView article={article} />
    </section>
  )
}

export default PostItem
