import type { FC } from 'react'

import useSwipe from '~/hooks/useSwipe'
import { nilOrEmpty } from '~/validator'

import type { TSwipeOption } from '../spec'
// import CloseLine from './CloseLine'
import useLogic from '../useLogic'
import { TopWrapper, BottomWrapper, TextWrapper, CloseButton } from '../styles/header'

/* <TextWrapper>讨论共 167 条</TextWrapper> */

type TProps = {
  headerText?: string
  options: TSwipeOption
  setSwipeUpY: (i: number) => void
  setSwipeDownY: (i: number) => void
  canBeClose: boolean
  showHeaderText: boolean
}

const Header: FC<TProps> = ({
  headerText,
  options,
  setSwipeUpY,
  setSwipeDownY,
  canBeClose,
  showHeaderText,
}) => {
  const { closeDrawer, onSwipedYHandler, onSwipingYHandler } = useLogic()
  const ignoreSwipeAviliable = true
  const swipeHandlers = useSwipe({
    onSwiped: (ev) => onSwipedYHandler(ev, setSwipeUpY, setSwipeDownY, ignoreSwipeAviliable),
    onSwiping: (ev) => onSwipingYHandler(ev, setSwipeUpY, setSwipeDownY, ignoreSwipeAviliable),
  })

  const content = showHeaderText && !nilOrEmpty(headerText) && (
    <TextWrapper>{headerText}</TextWrapper>
  )
  // <CloseLine curve={!canBeClose} />

  if (options.direction === 'bottom') {
    return (
      <BottomWrapper {...swipeHandlers}>
        {content}
        <CloseButton onClick={() => closeDrawer()} />
      </BottomWrapper>
    )
  }
  return <TopWrapper {...swipeHandlers}>{content}</TopWrapper>
}

export default Header
