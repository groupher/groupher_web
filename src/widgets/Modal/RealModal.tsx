import { FC, useEffect, useState, useCallback } from 'react'
import { Portal } from 'react-portal'

import { toggleGlobalBlur, lockPage, unlockPage } from '@/utils/dom'
import useShortcut from '@/hooks/useShortcut'

import ViewportTracker from '@/widgets/ViewportTracker'

import type { TProps as BaseTProps } from '.'
import { Mask, Wrapper, CloseBtn, ChildrenWrapper } from './styles'

type TProps = Pick<
  BaseTProps,
  | 'children'
  | 'show'
  | 'width'
  | 'showCloseBtn'
  | 'mode'
  | 'background'
  | 'offsetTop'
  | 'offsetLeft'
> & {
  handleCloseModal: () => void
}

const RealModal: FC<TProps> = ({
  children,
  show,
  width,
  showCloseBtn,
  mode,
  background,
  offsetTop = '20%',
  offsetLeft,
  handleCloseModal,
}) => {
  // damn, i forgot why i set this state, fix LATER
  const [visibleOnPage, setVisibleOnPage] = useState(false)

  const handleClose = useCallback(() => {
    setVisibleOnPage(false)
    toggleGlobalBlur(false)
    handleCloseModal()
    unlockPage()
  }, [handleCloseModal])

  useShortcut('Escape', handleClose)

  useEffect(() => {
    if (visibleOnPage) {
      toggleGlobalBlur(true)
      lockPage()
    }
    if (visibleOnPage && !show) {
      toggleGlobalBlur(false)
      unlockPage()
    }
  }, [show, visibleOnPage])

  return (
    <Portal>
      <Mask show={show} onClick={handleClose}>
        <Wrapper
          width={width}
          mode={mode}
          background={background}
          offsetTop={offsetTop}
          offsetLeft={offsetLeft}
        >
          <ViewportTracker onEnter={() => setVisibleOnPage(true)} />
          {showCloseBtn && <CloseBtn mode={mode} onClick={handleClose} />}
          {/* {showCloseBtn && <EscHint mode={mode}>Esc</EscHint>} */}
          <ChildrenWrapper onClick={(e) => e.stopPropagation()}>{children}</ChildrenWrapper>
        </Wrapper>
      </Mask>
    </Portal>
  )
}

export default RealModal
