import { Fragment, FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import { includes } from 'ramda'

import { ANCHOR } from '@/constant/dom'
import useDrawerOffset from '@/hooks/useDrawerOffset'

import type { TArticleNavi, TSwipeOption } from '../spec'
import { ARTICLE_VIEWER_TYPES } from '../constant'

import ArticleNavi from './ArticleNavi'
import { DrawerOverlay, DrawerWrapper, DrawerContent, NaviArea } from '../styles'
import { closeDrawer } from '../logic'

type TProps = {
  testid?: string
  options: TSwipeOption
  visible: boolean
  type: string
  children: ReactNode
  articleNavi: TArticleNavi
}

const DesktopView: FC<TProps> = ({
  testid = 'drawer-sidebar-panel',
  options,
  visible,
  type,
  articleNavi,
  children,
}) => {
  const { rightOffset, fromContentEdge } = useDrawerOffset()

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
              <ArticleNavi articleNavi={articleNavi} />
            </NaviArea>
          )}
          {children}
        </DrawerContent>
      </DrawerWrapper>
    </Fragment>
  )
}

export default observer(DesktopView)
