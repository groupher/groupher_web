import { FC } from 'react'

import { Space, SpaceGrow } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'
import Linker from '@/widgets/Linker'

import BlockMenu from './BlockMenu'

import {
  Wrapper,
  ReadonlyWrapper,
  ReadOnlyFields,
  EditWrapper,
  ActionWrapper,
  EditPenIcon,
  SettingIcon,
  EditItem,
  EditLabel,
  Inputer,
  Label,
  NotifyLabel,
} from '../../styles/header/editors/link_editor'

type TProps = {
  editing?: boolean
  notifyText?: string
}

const LinkEditor: FC<TProps> = ({ editing = false, notifyText = '' }) => {
  return (
    <Wrapper>
      <ReadonlyWrapper editing={editing}>
        <ActionWrapper editing={editing}>
          <Tooltip
            content={<BlockMenu />}
            placement="bottom-start"
            trigger="mouseenter focus"
            offset={[0, 0]}
            hideOnClick
            noPadding
          >
            <SettingIcon />
          </Tooltip>
          <EditPenIcon />
        </ActionWrapper>
        <SpaceGrow />
        <ReadOnlyFields>
          <Label>
            讨论 <Space right={6} />
          </Label>
          <Linker src="https://groupher.com" left={-2} top={5} />
        </ReadOnlyFields>
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
