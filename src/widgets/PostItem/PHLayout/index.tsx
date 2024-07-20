/*
 *
 * PostItem
 *
 */

import type { FC } from 'react'

import type { TPost } from '~/spec'

import DesktopView from './DesktopView'

import useSalon from '../styles/ph_layout'

type TProps = {
  article: TPost
}

const PostItem: FC<TProps> = ({ article }) => {
  const s = useSalon()

  return (
    <section className={s.wrapper}>
      <DesktopView article={article} />
    </section>
  )
}

export default PostItem
