import { FC, useEffect, useState, useCallback } from 'react'
import { Portal } from 'react-portal'

import useShortcut from '@/hooks/useShortcut'
import useTheme from '@/hooks/useTheme'
import useGlowLight from '@/hooks/useGlowLight'

import { toggleGlobalBlur, lockPage, unlockPage } from '@/dom'
import ViewportTracker from '@/widgets/ViewportTracker'

import type { TProps as BaseTProps } from '.'
import { Mask, Wrapper, CloseBtn, ChildrenWrapper, GlowLight } from './styles'

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
  const { glowType } = useGlowLight()
  const { curTheme } = useTheme()

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
          <GlowLight
            glowType={glowType}
            $curTheme={curTheme}
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
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
