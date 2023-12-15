/*
 *
 * Tag
 *
 */

import { FC, memo, ReactNode } from 'react'

import { buildLog } from '@/logger'

import { Wrapper, CloseIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:Tag:index')

type TProps = {
  children: ReactNode
  onClose?: () => void
}

const Tag: FC<TProps> = ({ children, onClose = null }) => {
  const closeable = onClose !== null

  return (
    <Wrapper $testid="tag" closeable={closeable}>
      {children}
      {closeable && (
        <div onKeyDown={() => onClose()}>
          <CloseIcon />
        </div>
      )}
    </Wrapper>
  )
}

export default memo(Tag)
