/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react'
import { keys, startsWith, filter, length } from 'ramda'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'
import { MORE_GROUP, ONE_LINK_GROUP } from '@/constant/dashboard'
import { sortByIndex, groupByKey } from '@/utils/helper'

import Button from '@/widgets/Buttons/Button'

import type { THeaderSettings } from '../../spec'

import LinkEditor from '../../Footer/Editors/LinkEditor'
import GroupInputer from '../../Footer/Editors/GroupInputer'

import FixedLinks from './FixedLinks'
import GroupHead from './GroupHead'

import {
  Wrapper,
  TopWrapper,
  BottomWrapper,
  GroupInputerWrapper,
  LeftPart,
  RightPart,
  NoteTitle,
  NoteP,
  Adder,
  Slash,
  PlusIcon,
  LinkGroup,
  ColumnWrapper,
  ItemsWrapper,
} from '../../styles/header/editors'

import {
  deleteGroup,
  moveGroup2Left,
  moveGroup2Right,
  moveGroup2EdgeLeft,
  moveGroup2EdgeRight,
  add2Group,
  addHeaderLinkGroup,
  triggerGroupAdd,
  updateEditingGroup,
  confirmGroupAdd,
  cancelGroupChange,
} from '../../logic/links'

type TProps = {
  settings: THeaderSettings
}

const Editor: FC<TProps> = ({ settings }) => {
  const [animateRef] = useAutoAnimate()
  const [groupAnimateRef] = useAutoAnimate()

  const {
    headerLinks: links,
    editingLink,
    editingLinkMode,
    editingGroup,
    editingGroupIndex,
  } = settings

  const isAboutLinkFold =
    length(filter((item) => item.title !== '' && item.group !== MORE_GROUP, links)) >= 1

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks) as string[]

  return (
    <Wrapper>
      <TopWrapper>
        <LeftPart>
          <FixedLinks isAboutLinkFold={isAboutLinkFold} />
        </LeftPart>
        <RightPart>
          <NoteTitle>注意事项</NoteTitle>
          <NoteP>改变顺序后可通过上方模板预览效果。</NoteP>
          <NoteP>固定链接无法调整顺序，分组链接会自动折叠。</NoteP>
          <NoteP>新增链接或链接组后，"关于"会自动折叠到"更多"中。</NoteP>
        </RightPart>
      </TopWrapper>

      <BottomWrapper>
        {editingGroup !== null && editingGroupIndex === null ? (
          <GroupInputerWrapper>
            <GroupInputer
              value={editingGroup}
              onChange={updateEditingGroup}
              onConfirm={confirmGroupAdd}
              onCancel={cancelGroupChange}
            />
          </GroupInputerWrapper>
        ) : (
          <Adder>
            <Button size="small" onClick={addHeaderLinkGroup} space={8} ghost>
              <PlusIcon />
              链接&nbsp;
            </Button>
            <Slash>/</Slash>
            <Button size="small" onClick={triggerGroupAdd} space={10} ghost>
              <PlusIcon />
              链接组&nbsp;
            </Button>
          </Adder>
        )}

        <LinkGroup ref={groupAnimateRef}>
          {groupKeys.map((groupKey: string, index) => {
            const curGroupLinks = groupedLinks[groupKey]

            if (
              // isAboutLinkFold
              links.length === 2 &&
              links[0].title === '' &&
              curGroupLinks[0].group === MORE_GROUP
            ) {
              return null
            }

            return (
              <ColumnWrapper key={groupKey}>
                <ItemsWrapper ref={animateRef}>
                  <GroupHead
                    title={groupKey as string}
                    editingGroup={editingGroup}
                    editingGroupIndex={editingGroupIndex}
                    curGroupIndex={index}
                    moveLeft={() => moveGroup2Left(groupKey)}
                    moveRight={() => moveGroup2Right(groupKey)}
                    moveEdgeLeft={() => moveGroup2EdgeLeft(groupKey)}
                    moveEdgeRight={() => moveGroup2EdgeRight(groupKey)}
                    isEdgeLeft={index === 0}
                    isEdgeRight={index === groupKeys.length - 2}
                    onDelete={() => deleteGroup(curGroupLinks[0].groupIndex)}
                  />
                  {curGroupLinks.map((item, index) => {
                    const isAboutLink =
                      item.group === MORE_GROUP && index === curGroupLinks.length - 1

                    return (
                      <LinkEditor
                        // must use item.title as key, or the sort animation will fail, wired
                        key={item.title}
                        mode={editingLinkMode}
                        linkItem={item as TLinkItem}
                        editingLink={editingLink}
                        isFirst={index === 0}
                        isLast={index === curGroupLinks.length - 1}
                        disableEdit={isAboutLink}
                        disableSetting={isAboutLink}
                      />
                    )
                  })}
                </ItemsWrapper>

                {!editingLink && !startsWith(ONE_LINK_GROUP, groupKey) && (
                  <Adder>
                    <Button
                      size="small"
                      ghost
                      space={8}
                      onClick={() => add2Group(groupKey, curGroupLinks.length)}
                    >
                      <PlusIcon />
                      链接&nbsp;
                    </Button>
                  </Adder>
                )}
              </ColumnWrapper>
            )
          })}
        </LinkGroup>
      </BottomWrapper>
    </Wrapper>
  )
}

export default Editor
