import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
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
} from '../../styles/footer/editors/item_editor'

type TProps = {
  editing?: boolean
  alignRight?: boolean
}

const ItemEditor: FC<TProps> = ({ editing = false, alignRight = false }) => {
  return (
    <Wrapper>
      <ReadonlyWrapper editing={editing}>
        {!alignRight ? (
          <>
            <ReadOnlyFields alignRight={alignRight}>
              <Label>讨论</Label>
              <Linker src="https://groupher.com" left={-2} top={5} />
            </ReadOnlyFields>
            <SpaceGrow />
            <ActionWrapper editing={editing}>
              <EditPenIcon />

              <Tooltip
                content={<BlockMenu />}
                placement="bottom-end"
                trigger="mouseenter focus"
                offset={[4, 0]}
                hideOnClick
                noPadding
              >
                <SettingIcon />
              </Tooltip>
            </ActionWrapper>
          </>
        ) : (
          <>
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
            <ReadOnlyFields alignRight={alignRight}>
              <Label>讨论</Label>
              <Linker src="https://groupher.com" left={-2} top={5} />
            </ReadOnlyFields>
          </>
        )}
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

export default ItemEditor
