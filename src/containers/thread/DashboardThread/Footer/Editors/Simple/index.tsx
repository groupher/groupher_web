import { FC } from 'react'
import { keys } from 'ramda'
import { observer } from 'mobx-react-lite'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'
import { sortByIndex, groupByKey } from '@/helper'

import Button from '@/widgets/Buttons/Button'

import LinkEditor from '../LinkEditor'

import useFooterSettingsInfo from '../../../hooks/useFooterSettingsInfo'
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

const Simple: FC = () => {
  const [animateRef] = useAutoAnimate()

  const { footerLinks: links, editingLink, editingLinkMode } = useFooterSettingsInfo()

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks) as string[]

  return (
    <Wrapper>
      <LeftPart ref={animateRef}>
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

export default observer(Simple)
