import { FC } from 'react'

import type { TLinkItem } from '@/spec'

import { buildLog } from '@/utils/logger'

import { Space, SpaceGrow } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'
import Linker from '@/widgets/Linker'

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
  EditLabel,
  Inputer,
  Label,
  NotifyLabel,
} from '../../styles/footer/editors/link_editor'

const DEFAULT_LINK = {
  title: '讨论',
  link: 'https://groupher.com',
}

/* eslint-disable-next-line */
const log = buildLog('C:Dashboard:LinkEditor')

type TProps = {
  editing?: boolean
  notifyText?: string
  linkItem?: TLinkItem
  isFirst?: boolean
  isLast?: boolean

  moveLinkUp?: (linkItem: TLinkItem) => void
  moveLinkDown?: (linkItem: TLinkItem) => void

  moveLink2Top?: (linkItem: TLinkItem) => void
  moveLink2Bottom?: (linkItem: TLinkItem) => void
}

const LinkEditor: FC<TProps> = ({
  editing = false,
  notifyText = '',
  linkItem = DEFAULT_LINK,
  isFirst = false,
  isLast = false,
  moveLinkUp = log,
  moveLinkDown = log,

  moveLink2Top = log,
  moveLink2Bottom = log,
}) => {
  return (
    <Wrapper>
      <ReadonlyWrapper editing={editing}>
        <ReadOnlyHeader>
          <Label>
            {linkItem.title || '--'} <Space right={6} />{' '}
            {notifyText && <NotifyLabel>New</NotifyLabel>}
          </Label>
          <SpaceGrow />
          <ActionWrapper editing={editing}>
            {!isFirst && <ArrowUpIcon onClick={() => moveLinkUp(linkItem)} />}
            {!isLast && <ArrowDownIcon onClick={() => moveLinkDown(linkItem)} />}
            <EditPenIcon />
            <Tooltip
              content={
                <LinkMenu
                  isFirst={isFirst}
                  isLast={isLast}
                  move2Top={() => moveLink2Top(linkItem)}
                  move2Bottom={() => moveLink2Bottom(linkItem)}
                  onDelete={() => log('delete')}
                />
              }
              placement="bottom-end"
              trigger="mouseenter focus"
              offset={[4, 0]}
              delay={300}
              hideOnClick
              noPadding
            >
              <SettingIcon />
            </Tooltip>
          </ActionWrapper>
        </ReadOnlyHeader>
        <SpaceGrow />
        {linkItem.link ? <Linker src={linkItem.link} left={-2} top={5} external /> : '--'}
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
