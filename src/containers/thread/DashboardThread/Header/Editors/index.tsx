import { FC } from 'react'
import { keys } from 'ramda'
import { useAutoAnimate } from '@formkit/auto-animate/react'

// import type { TLinkItem } from '@/spec'
import { sortByIndex, groupByKey } from '@/utils/helper'

import Button from '@/widgets/Buttons/Button'

// import LinkEditor from '../../Footer/Editors/LinkEditor'

import FixedLinks from './FixedLinks'
import type { THeaderSettings } from '../../spec'

import {
  Wrapper,
  LeftPart,
  RightPart,
  NoteTitle,
  NoteP,
  Adder,
  PlusIcon,
} from '../../styles/header/editors'
import { add2Group } from '../../logic/links'

type TProps = {
  settings: THeaderSettings
}

const Editor: FC<TProps> = ({ settings }) => {
  const [parent] = useAutoAnimate({ duration: 220 })

  const { headerLinks: links, editingLink, editingLinkMode } = settings

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks) as string[]

  return (
    <Wrapper>
      <LeftPart ref={parent}>
        <FixedLinks />

        {!editingLink && (
          <Adder>
            <Button
              size="small"
              onClick={() => add2Group(groupKeys[0], groupedLinks[groupKeys[0]].length)}
              space={8}
              ghost
            >
              <PlusIcon />
              添加项&nbsp;
            </Button>
          </Adder>
        )}
      </LeftPart>
      <RightPart>
        <NoteTitle>注意事项</NoteTitle>
        <NoteP>改变顺序后可通过上方模板预览效果。</NoteP>
        <NoteP>固定链接无法调整顺序，分组链接会自动折叠。</NoteP>
      </RightPart>
    </Wrapper>
  )
}

export default Editor
