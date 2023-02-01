import { FC, memo, useState } from 'react'

import Tooltip from '@/widgets/Tooltip'

import { MODE } from '../../constant'

import type { TProps as TBase } from '../index'

import {
  Wrapper,
  Title,
  ArrowIcon,
  Panel,
  MenuTitle,
  MenuItem,
  ReplyModeIcon,
  TimelineModeIcon,
  ExpandIcon,
  FoldIcon,
} from '../../styles/head_bar/state_bar/sort_menu'
import { foldAllComments, expandAllComments, onModeChange } from '../../logic'

type TProps = Pick<TBase, 'mode' | 'apiMode' | 'isAllFolded'>

const Actions: FC<TProps> = ({ mode, isAllFolded, apiMode }) => {
  const [moreActive, setMenuActive] = useState(false)

  return (
    <Wrapper>
      {isAllFolded ? (
        <Title onClick={() => expandAllComments()}>展开全部</Title>
      ) : (
        <Tooltip
          content={
            <Panel width="124px">
              <MenuItem onClick={() => onModeChange(MODE.REPLIES)}>
                <ReplyModeIcon />
                <MenuTitle>默认排序</MenuTitle>
              </MenuItem>
              <MenuItem onClick={() => onModeChange(MODE.TIMELINE)}>
                <TimelineModeIcon />
                <MenuTitle>时间线排序</MenuTitle>
              </MenuItem>
              <MenuItem onClick={() => expandAllComments()}>
                <ExpandIcon />
                <MenuTitle>展开全部</MenuTitle>
              </MenuItem>
              <MenuItem onClick={() => foldAllComments()}>
                <FoldIcon />
                <MenuTitle>折叠全部</MenuTitle>
              </MenuItem>
            </Panel>
          }
          placement="bottom-end"
          trigger="mouseenter focus"
          offset={[-5, 5]}
          onShow={() => setMenuActive(true)}
          onHide={() => setMenuActive(false)}
          noPadding
        >
          <Title $active={moreActive}>
            {mode === MODE.REPLIES ? '默认排序' : '时间线排序'}
            <ArrowIcon $active={moreActive} />
          </Title>
        </Tooltip>
      )}

      {/* {apiMode === API_MODE.ARTICLE && (
          <IconButton
            icon={SVG.LOCK}
            hint="关闭讨论"
            {...actionIconConfig}
            top={-1}
          />
        )} */}
      {/* {apiMode === API_MODE.ARTICLE && (
          <IconButton
            path="article/notify-on.svg"
            hint="订阅讨论"
            {...actionIconConfig}
          />
        )} */}
    </Wrapper>
  )
}

export default memo(Actions)
