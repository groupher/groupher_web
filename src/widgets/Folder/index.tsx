/*
 *
 * Folder
 * see orignal example at: https://codepen.io/mydearxym2/pen/YzyLYqL
 *
 */

import { type FC, memo } from 'react'

import type { TSizeSM } from '~/spec'

import SIZE from '~/const/size'

import Content from './Content'
import Footer from './Footer'

import { Wrapper, TabShape } from './styles'

type TProps = {
  title?: string
  total?: number
  updatedAt?: string
  lock?: boolean
  size?: TSizeSM
  inactive?: boolean
  onSelect?: () => void
  onMenuClick?: (key: string) => void
}

const Folder: FC<TProps> = ({
  size = SIZE.MEDIUM,
  title = '新收藏夹',
  total = 12,
  updatedAt = '',
  lock = false,
  inactive = false,
  onSelect = console.log,
  onMenuClick = console.log,
}) => {
  return (
    <Wrapper $testid="folder" size={size}>
      <TabShape />
      <Content total={total} lock={lock} updatedAt={updatedAt} inactive={inactive} />
      <Footer title={title} onClick={onSelect} onMenuClick={onMenuClick} inactive={inactive} />
    </Wrapper>
  )
}

export default memo(Folder)
