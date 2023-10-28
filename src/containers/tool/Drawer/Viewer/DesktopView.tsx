import { Fragment, FC, ReactNode, memo } from 'react'
import { includes } from 'ramda'

import { ANCHOR } from '@/constant/dom'

import type { TArticleNavi, TSwipeOption } from '../spec'
import { ARTICLE_VIEWER_TYPES } from '../constant'

import ArticleNavi from './ArticleNavi'
import { DrawerOverlay, DrawerWrapper, DrawerContent, NaviArea } from '../styles'
import { closeDrawer } from '../logic'

type TProps = {
  testid?: string
  options: TSwipeOption
  visible: boolean
  rightOffset: string
  fromContentEdge: boolean
  type: string
  children: ReactNode
  articleNavi: TArticleNavi
}

const DesktopView: FC<TProps> = ({
  testid = 'drawer-sidebar-panel',
  options,
  visible,
  rightOffset,
  fromContentEdge,
  type,
  articleNavi,
  children,
}) => {
  const isArticleViewer = includes(type, ARTICLE_VIEWER_TYPES)

  return (
    <Fragment>
      <DrawerOverlay
        $visible={visible}
        onClick={() => closeDrawer()}
        className={ANCHOR.GLOBAL_BLUR_CLASS}
      />
      <DrawerWrapper
        testid={testid}
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
              <ArticleNavi articleNavi={articleNavi} />
            </NaviArea>
          )}
          {children}
        </DrawerContent>
      </DrawerWrapper>
    </Fragment>
  )
}

export default memo(DesktopView)
