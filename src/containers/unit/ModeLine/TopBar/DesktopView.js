import React from 'react'

import SIZE from '~/const/size'
import VIEW from '~/const/view'

import TabBar from '~/widgets/TabBar'

import { Wrapper, InnerWrapper, TabsWrapper } from '../styles/top_bar/desktop_view'

import { tabOnChange } from '../logic'

const DesktopView = ({ visible, viewing, leftOffset, hasNoBottomBorder }) => {
  const { community, activeThread } = viewing

  return (
    <Wrapper
      leftOffset={leftOffset}
      noBorder={hasNoBottomBorder}
      $testid="modeline-topbar"
      visible={visible}
    >
      <InnerWrapper>
        <TabsWrapper>
          <TabBar
            source={community.threads}
            onChange={tabOnChange}
            active={activeThread}
            view={VIEW.DESKTOP}
            // layout={layout}
            communitySlug={community.slug}
            size={SIZE.SMALL}
          />
        </TabsWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default React.memo(DesktopView)
