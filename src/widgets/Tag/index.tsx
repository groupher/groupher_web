/*
 *
 * Tag
 *
 */

import { type FC, memo, type ReactNode } from 'react'

import { Wrapper, CloseIcon } from './styles'

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
