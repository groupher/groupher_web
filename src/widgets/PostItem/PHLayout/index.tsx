/*
 *
 * PostItem
 *
 */

import type { FC } from 'react'

import type { TPost } from '~/spec'

import { DesktopOnly } from '~/widgets/Common'

import DesktopView from './DesktopView'

import useSalon from '../styles/ph_layout'

type TProps = {
  article: TPost
  isMobilePreview: boolean
}

const PostItem: FC<TProps> = ({ article, isMobilePreview }) => {
  const s = useSalon()

  return (
    <section className={s.wrapper}>
      <DesktopOnly>
        <DesktopView article={article} />
      </DesktopOnly>
    </section>
  )
}

export default PostItem
