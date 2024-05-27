import { type FC, useEffect, useState } from 'react'

import type { TChangeMode, TLinkItem } from '@/spec'

import { Space, SpaceGrow } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'
import Linker from '@/widgets/Linker'
import CancelButton from '@/widgets/Buttons/CancelButton'
import SavingBar from '../../SavingBar'

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
  moveLink,
} from '../../logic/links'
import { CHANGE_MODE } from '@/const/mode'

type TProps = {
  notifyText?: string
  linkItem?: TLinkItem
  editingLink?: TLinkItem
  isFirst?: boolean
  isLast?: boolean
  mode?: TChangeMode
  disableSetting?: boolean
  disableEdit?: boolean
}

const LinkEditor: FC<TProps> = ({
  notifyText = '',
  linkItem = EMPTY_LINK_ITEM,
  editingLink = null,
  isFirst = false,
  isLast = false,
  mode = CHANGE_MODE.CREATE,
  disableSetting = false,
  disableEdit = false,
}) => {
  const [snapshot, setSnapshot] = useState<TLinkItem | null>(null)

  const editing = linkItem.group === editingLink?.group && linkItem.index === editingLink?.index

  useEffect(() => {
    return () => {
      setSnapshot(null)
    }
  }, [])

  useEffect(() => {
    if (!snapshot && editing && editingLink) {
      setSnapshot(editingLink)
    }
  }, [editing, snapshot, editingLink])

  const isTouched =
    editing &&
    snapshot &&
    (snapshot?.title !== editingLink?.title || snapshot?.link !== editingLink?.link)

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
            {!isFirst && <ArrowUpIcon onClick={() => moveLink(linkItem, 'up')} />}
            {!isLast && <ArrowDownIcon onClick={() => moveLink(linkItem, 'down')} />}
            {!disableEdit && <EditPenIcon onClick={() => updateInGroup(linkItem)} />}
            {!disableSetting && (
              <Tooltip
                content={
                  <LinkMenu
                    isFirst={isFirst}
                    isLast={isLast}
                    move2Top={() => moveLink(linkItem, 'top')}
                    move2Bottom={() => moveLink(linkItem, 'bottom')}
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
            )}
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
            {isTouched ? (
              <SavingBar
                prefix="是否添加"
                onConfirm={confirmLinkEditing}
                onCancel={cancelLinkEditing}
                isTouched
                minimal
              />
            ) : (
              <CancelButton onClick={cancelLinkEditing} top={5} left={-15} />
            )}
          </EditFooter>
        </EditWrapper>
      )}
    </Wrapper>
  )
}

export default LinkEditor
