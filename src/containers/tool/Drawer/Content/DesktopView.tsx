import { type FC, memo } from 'react'

import { scrollDrawerToTop } from '~/dom'
import { ANCHOR } from '~/const/dom'

import Content from './Content'
import { Wrapper } from '../styles/content'

type TProps = {
  type: string // TODO:
}

const DesktopView: FC<TProps> = ({ type }) => {
  return (
    <Wrapper type={type}>
      <div id={ANCHOR.DRAWER_HEAD} />
      <Content type={type} onLoad={() => scrollDrawerToTop()} />
    </Wrapper>
  )
}

export default memo(DesktopView)
