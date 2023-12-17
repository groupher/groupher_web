/*
 *
 * PublishButton
 *
 */

import { memo, FC, Fragment } from 'react'

import { buildLog } from '@/logger'

// import Button from './Button'
import { Wrapper, Title, EditIcon } from '../styles/publish_button/sidebar_header_layout'

const _log = buildLog('w:PublishButton:index')

type TProps = {
  text: string
}

const SidebarHeaderLayout: FC<TProps> = ({ text }) => {
  return (
    <Wrapper>
      <Fragment>
        <EditIcon />
        <Title>{text}</Title>
      </Fragment>
    </Wrapper>
  )
}

export default memo(SidebarHeaderLayout)
