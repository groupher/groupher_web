import { FC, memo, useCallback } from 'react'

import { ICON } from '@/config'
import { Trans } from '@/utils/i18n'

import CustomScroller from '@/widgets/CustomScroller'

import SortColumn from './SortColumn/index'
import type { TCurActive } from '../spec'

import {
  Wrapper,
  RightPartWrapper,
  SortWrapper,
  ThreadWrapper,
  TagWrapper,
  ItemBar,
  TagDot,
  ArrowIcon,
} from '../styles/filter_menu/content'
import { getFilterMenuScrollHeight } from '../styles/metrics/filter_menu'

import { disableDrawerContentDrag, restoreDrawerContentDrag } from '../logic'

type TProps = {
  curActive: TCurActive
}

const Content: FC<TProps> = ({ curActive }) => {
  const { community, thread } = curActive

  const scrollableHeight = getFilterMenuScrollHeight()
  const handleDisableDrawerContentDrag = useCallback(
    disableDrawerContentDrag,
    [],
  )
  const handleRestoreDrawerContentDrag = useCallback(
    restoreDrawerContentDrag,
    [],
  )

  return (
    <Wrapper>
      <SortColumn />
      <CustomScroller
        direction="horizontal"
        width="calc(68vw - 40px)"
        autoHide={false}
        barSize="medium"
      >
        <RightPartWrapper>
          <CustomScroller
            direction="vertical"
            height={scrollableHeight}
            onTopEnter={handleRestoreDrawerContentDrag}
            onTopLeave={handleDisableDrawerContentDrag}
          >
            <ThreadWrapper>
              {community.threads.map((item) => (
                <ItemBar key={item.raw} active={item.raw === thread}>
                  {Trans(item.title)}
                  {item.raw === thread && (
                    <ArrowIcon src={`${ICON}/shape/arrow-solid.svg`} />
                  )}
                </ItemBar>
              ))}
            </ThreadWrapper>
          </CustomScroller>
          <CustomScroller
            direction="vertical"
            height={scrollableHeight}
            onTopEnter={handleRestoreDrawerContentDrag}
            onTopLeave={handleDisableDrawerContentDrag}
          >
            <TagWrapper>
              <ItemBar>??????</ItemBar>
              <ItemBar>??????</ItemBar>
              <ItemBar>??????</ItemBar>
              <ItemBar active>
                ?????? <TagDot />
              </ItemBar>
              <ItemBar>??????</ItemBar>
              <ItemBar>??????</ItemBar>
              <ItemBar>??????</ItemBar>
              <ItemBar>??????</ItemBar>
              <br />
            </TagWrapper>
          </CustomScroller>

          <CustomScroller
            direction="vertical"
            height={scrollableHeight}
            onTopEnter={handleRestoreDrawerContentDrag}
            onTopLeave={handleDisableDrawerContentDrag}
          >
            <SortWrapper>
              <ItemBar>????????????</ItemBar>
              <ItemBar>??????</ItemBar>
              <ItemBar active>??????</ItemBar>
              <ItemBar>??????</ItemBar>
            </SortWrapper>
          </CustomScroller>
          <CustomScroller
            direction="vertical"
            height={scrollableHeight}
            onTopEnter={handleRestoreDrawerContentDrag}
            onTopLeave={handleDisableDrawerContentDrag}
          >
            <SortWrapper>
              <ItemBar>??????</ItemBar>
              <ItemBar>??????</ItemBar>
              <ItemBar>??????</ItemBar>
              <ItemBar>??????</ItemBar>
            </SortWrapper>
          </CustomScroller>
        </RightPartWrapper>
      </CustomScroller>
    </Wrapper>
  )
}

export default memo(Content)
