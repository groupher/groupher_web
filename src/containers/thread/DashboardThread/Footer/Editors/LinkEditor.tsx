import { FC } from 'react'

import type { TChangeMode, TLinkItem } from '@/spec'

import { buildLog } from '@/utils/logger'

import { Space, SpaceGrow } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'
import Linker from '@/widgets/Linker'
import Button from '@/widgets/Buttons/Button'

import { EMPTY_LINK_ITEM } from '../../constant'
import LinkMenu from './LinkMenu'

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
  EditFooter,
  EditTitle,
  Inputer,
  Label,
  NotifyLabel,
} from '../../styles/footer/editors/link_editor'
import {
  cancelLinkEditing,
  deleteLink,
  updateEditingLink,
  confirmLinkEditing,
  updateInGroup,
} from '../../logic/links'
import { CHANGE_MODE } from '@/constant/mode'

/* eslint-disable-next-line */
const log = buildLog('C:Dashboard:LinkEditor')

type TProps = {
  notifyText?: string
  linkItem?: TLinkItem
  editingLink?: TLinkItem
  isFirst?: boolean
  isLast?: boolean
  mode?: TChangeMode

  moveLinkUp?: (linkItem: TLinkItem) => void
  moveLinkDown?: (linkItem: TLinkItem) => void

  moveLink2Top?: (linkItem: TLinkItem) => void
  moveLink2Bottom?: (linkItem: TLinkItem) => void
}

const LinkEditor: FC<TProps> = ({
  notifyText = '',
  linkItem = EMPTY_LINK_ITEM,
  editingLink = null,
  isFirst = false,
  isLast = false,
  mode = CHANGE_MODE.CREATE,

  moveLinkUp = log,
  moveLinkDown = log,
  moveLink2Top = log,
  moveLink2Bottom = log,
}) => {
  // const isEditExisting = linkItem
  const editing = linkItem.group === editingLink?.group && linkItem.index === editingLink?.index

  return (
    <Wrapper>
      <ReadonlyWrapper editing={editing}>
        <ReadOnlyHeader editing={editing}>
          <Label>
            {linkItem.title || '--'} <Space right={6} />
            {notifyText && <NotifyLabel>New</NotifyLabel>}
          </Label>
          <SpaceGrow />
          <ActionWrapper editing={editing}>
            {!isFirst && <ArrowUpIcon onClick={() => moveLinkUp(linkItem)} />}
            {!isLast && <ArrowDownIcon onClick={() => moveLinkDown(linkItem)} />}
            <EditPenIcon onClick={() => updateInGroup(linkItem)} />
            <Tooltip
              content={
                <LinkMenu
                  isFirst={isFirst}
                  isLast={isLast}
                  move2Top={() => moveLink2Top(linkItem)}
                  move2Bottom={() => moveLink2Bottom(linkItem)}
                  onDelete={() => deleteLink(linkItem)}
                />
              }
              placement="bottom-end"
              trigger="click"
              offset={[4, 0]}
              hideOnClick
              noPadding
            >
              <SettingIcon />
            </Tooltip>
          </ActionWrapper>
        </ReadOnlyHeader>
        <SpaceGrow />
        {!editing && <Linker src={linkItem?.link || ''} left={-2} top={5} external />}
      </ReadonlyWrapper>

      {editing && (
        <EditWrapper>
          <EditTitle>{mode === CHANGE_MODE.CREATE ? '添加' : '更新'}链接：</EditTitle>
          <EditItem>
            <Inputer
              value={editingLink?.title || ''}
              placeholder="链接名称"
              onChange={(e) => updateEditingLink('title', e.target.value)}
              autoFocus
            />
          </EditItem>

          <EditItem>
            <Inputer
              value={editingLink?.link || ''}
              placeholder="链接地址"
              onChange={(e) => updateEditingLink('link', e.target.value)}
            />
          </EditItem>

          <EditFooter>
            <SpaceGrow />
            <Button ghost size="small" noBorder onClick={() => cancelLinkEditing()}>
              取消
            </Button>
            <Button size="small" onClick={() => confirmLinkEditing()}>
              {mode === CHANGE_MODE.CREATE ? '确定' : '更新'}
            </Button>
            <SpaceGrow />
          </EditFooter>
        </EditWrapper>
      )}
    </Wrapper>
  )
}

export default LinkEditor
