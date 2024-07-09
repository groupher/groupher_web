import { Fragment, type FC, type ReactNode } from 'react'
import { includes } from 'ramda'

import { ANCHOR } from '~/const/dom'
import useDrawerOffset from '~/hooks/useDrawerOffset'

import type { TSwipeOption } from '../spec'
import { ARTICLE_VIEWER_TYPES } from '../constant'

import ArticleNavi from './ArticleNavi'
import useLogic from '../useLogic'
import { DrawerOverlay, DrawerWrapper, DrawerContent, NaviArea } from '../styles'

type TProps = {
  testid?: string
  options: TSwipeOption
  visible: boolean
  type: string
  children: ReactNode
}

const DesktopView: FC<TProps> = ({
  testid = 'drawer-sidebar-panel',
  options,
  visible,
  type,
  children,
}) => {
  const { rightOffset, fromContentEdge } = useDrawerOffset()
  const { closeDrawer } = useLogic()

  const isArticleViewer = includes(type, ARTICLE_VIEWER_TYPES)

  return (
    <Fragment>
      <DrawerOverlay
        $visible={visible}
        onClick={() => closeDrawer()}
        className={ANCHOR.GLOBAL_BLUR_CLASS}
      />
      <DrawerWrapper
        $testid={testid}
        $visible={visible}
        $fromContentEdge={fromContentEdge}
        $rightOffset={rightOffset}
        type={type}
        $mobile={false}
        options={options}
      >
        <DrawerContent type={type}>
          {isArticleViewer && (
            <NaviArea>
              <ArticleNavi />
            </NaviArea>
          )}
          {children}
        </DrawerContent>
      </DrawerWrapper>
    </Fragment>
  )
}

export default DesktopView
