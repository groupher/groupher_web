import { FC } from 'react'

import type { TLinkItem } from '@/spec'

import { buildLog } from '@/utils/logger'

import { Space, SpaceGrow } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'
import Linker from '@/widgets/Linker'

import BlockMenu from './BlockMenu'

import {
  Wrapper,
  ReadonlyWrapper,
  ReadOnlyHeader,
  EditWrapper,
  ActionWrapper,
  EditPenIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SettingIcon,
  EditItem,
  EditLabel,
  Inputer,
  Label,
  NotifyLabel,
} from '../../styles/footer/editors/link_editor'

const DEFAULT_LINK = {
  title: '讨论',
  addr: 'https://groupher.com',
}

/* eslint-disable-next-line */
const log = buildLog('C:Dashboard:LinkEditor')

type TProps = {
  editing?: boolean
  notifyText?: string
  linkItem?: TLinkItem
  isFirst?: boolean
  isLast?: boolean

  moveUpLink?: (linkItem: TLinkItem) => void
  moveDownLink?: (linkItem: TLinkItem) => void

  move2TopLink?: (linkItem: TLinkItem) => void
  move2BottomLink?: (linkItem: TLinkItem) => void
}

const LinkEditor: FC<TProps> = ({
  editing = false,
  notifyText = '',
  linkItem = DEFAULT_LINK,
  isFirst = false,
  isLast = false,
  moveUpLink = log,
  moveDownLink = log,

  move2TopLink = log,
  move2BottomLink = log,
}) => {
  return (
    <Wrapper>
      <ReadonlyWrapper editing={editing}>
        <ReadOnlyHeader>
          <Label>
            {linkItem.title} <Space right={6} /> {notifyText && <NotifyLabel>New</NotifyLabel>}
          </Label>
          <SpaceGrow />
          <ActionWrapper editing={editing}>
            {!isFirst && <ArrowUpIcon onClick={() => moveUpLink(linkItem)} />}
            {!isLast && <ArrowDownIcon onClick={() => moveDownLink(linkItem)} />}
            <EditPenIcon />
            <Tooltip
              content={
                <BlockMenu
                  isFirst={isFirst}
                  isLast={isLast}
                  move2Top={() => move2TopLink(linkItem)}
                  move2Bottom={() => move2BottomLink(linkItem)}
                />
              }
              placement="bottom-end"
              trigger="mouseenter focus"
              offset={[4, 0]}
              hideOnClick
              noPadding
            >
              <SettingIcon />
            </Tooltip>
          </ActionWrapper>
        </ReadOnlyHeader>
        <SpaceGrow />
        <Linker src={linkItem.addr} left={-2} top={5} external />
      </ReadonlyWrapper>
      {editing && (
        <EditWrapper>
          <EditItem>
            <EditLabel>标签</EditLabel>
            <Inputer value="讨论" />
          </EditItem>

          <EditItem>
            <EditLabel>链接</EditLabel>
            <Inputer value="https://simple.com" />
          </EditItem>
        </EditWrapper>
      )}
    </Wrapper>
  )
}

export default LinkEditor
