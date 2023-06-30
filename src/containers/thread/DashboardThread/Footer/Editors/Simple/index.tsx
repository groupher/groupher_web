import { FC } from 'react'
import { keys } from 'ramda'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'
import { sortByIndex, groupByKey } from '@/utils/helper'

import Button from '@/widgets/Buttons/Button'

import LinkEditor from '../LinkEditor'

import type { TFooterSettings } from '../../../spec'

import {
  Wrapper,
  LeftPart,
  RightPart,
  NoteTitle,
  NoteP,
  Adder,
  PlusIcon,
} from '../../../styles/footer/editors/simple'
import { add2Group } from '../../../logic/links'

type TProps = {
  settings: TFooterSettings
}

const Simple: FC<TProps> = ({ settings }) => {
  const [parent] = useAutoAnimate({ duration: 220 })

  const { footerLinks: links, editingLink, editingLinkMode } = settings

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks) as string[]

  return (
    <Wrapper>
      <LeftPart ref={parent}>
        {groupedLinks[groupKeys[0]].map((item: TLinkItem) => (
          <LinkEditor
            key={item.title}
            mode={editingLinkMode}
            linkItem={item}
            editingLink={editingLink}
          />
        ))}

        {!editingLink && (
          <Adder>
            <Button
              size="small"
              ghost
              space={8}
              onClick={() => add2Group(groupKeys[0], groupedLinks[groupKeys[0]].length)}
            >
              <PlusIcon />
              链接&nbsp;
            </Button>
          </Adder>
        )}
      </LeftPart>
      <RightPart>
        <NoteTitle>注意事项</NoteTitle>
        <NoteP>改变顺序后可通过上方模板预览效果。</NoteP>
        <NoteP>不同模板间切换时，本组（第一组）链接组会被保留。</NoteP>
      </RightPart>
    </Wrapper>
  )
}

export default Simple
