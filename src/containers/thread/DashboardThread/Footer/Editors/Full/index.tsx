import { FC, useState, memo } from 'react'
import { keys } from 'ramda'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'

import { FOOTER_LAYOUT } from '@/constant/layout'
import Button from '@/widgets/Buttons/Button'

import { sortByIndex, groupByKey } from '@/utils/helper'

import BrandInfo from '../BrandInfo'
import LinkEditor from '../LinkEditor'
import GroupInputer from '../GroupInputer'

import GroupHead from './GroupHead'
import MainEditor from './MainEditor'

import type { TFooterSettings, TFooterEditType } from '../../../spec'
import { FOOTER_EDIT_TYPE } from '../../../constant'

import {
  Wrapper,
  TopWrapper,
  LinkGroup,
  BottomWrapper,
  ActionRow,
  PlusIcon,
  ColumnWrapper,
  ItemsWrapper,
  Adder,
  TopLeft,
  TopRight,
} from '../../../styles/footer/editors/full'

import {
  add2Group,
  moveLinkUp,
  deleteGroup,
  moveLinkDown,
  moveLink2Top,
  moveLink2Bottom,
  moveGroup2Left,
  moveGroup2Right,
  moveGroup2EdgeLeft,
  moveGroup2EdgeRight,
  updateEditingGroup,
  triggerGroupAdd,
  cancelGroupChange,
  confirmGroupAdd,
} from '../../../logic/links'

type TProps = {
  settings: TFooterSettings
}

const Full: FC<TProps> = ({ settings }) => {
  const {
    footerLinks: links,
    editingLink,
    editingLinkMode,
    editingGroup,
    editingGroupIndex,
  } = settings

  const [editMode, setEditMode] = useState(false)
  const [editType, setEditType] = useState<TFooterEditType>(FOOTER_EDIT_TYPE.LOGO)

  const [animateRef] = useAutoAnimate()
  const [groupAnimateRef] = useAutoAnimate()

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper>
      <TopWrapper>
        <TopLeft>
          <BrandInfo
            footerLayout={FOOTER_LAYOUT.FULL}
            onEdit={(type) => {
              setEditMode(true)
              setEditType(type)
            }}
            editable
          />
        </TopLeft>
        {editMode && (
          <TopRight>
            <MainEditor type={editType} onHide={() => setEditMode(false)} />
          </TopRight>
        )}
      </TopWrapper>
      <BottomWrapper>
        <ActionRow>
          {editingGroup !== null && editingGroupIndex === null ? (
            <GroupInputer
              width="30%"
              value={editingGroup}
              onChange={updateEditingGroup}
              onConfirm={confirmGroupAdd}
              onCancel={cancelGroupChange}
            />
          ) : (
            <Button size="small" ghost space={10} onClick={() => triggerGroupAdd()}>
              <PlusIcon />
              添加分组&nbsp;
            </Button>
          )}
        </ActionRow>
        <LinkGroup ref={groupAnimateRef}>
          {groupKeys.map((groupKey: string, index) => {
            const curGroupLinks = groupedLinks[groupKey]

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
                    isEdgeRight={index === groupKeys.length - 1}
                    onDelete={() => deleteGroup(curGroupLinks[0].groupIndex)}
                  />
                  {curGroupLinks.map((item, index) => (
                    <LinkEditor
                      // must use item.title as key, or the sort animation will fail, wired
                      key={item.title}
                      mode={editingLinkMode}
                      linkItem={item as TLinkItem}
                      editingLink={editingLink}
                      moveLinkUp={moveLinkUp}
                      moveLinkDown={moveLinkDown}
                      moveLink2Top={moveLink2Top}
                      moveLink2Bottom={moveLink2Bottom}
                      isFirst={index === 0}
                      isLast={index === curGroupLinks.length - 1}
                    />
                  ))}
                </ItemsWrapper>

                {!editingLink && (
                  <Adder>
                    <Button
                      size="small"
                      ghost
                      space={8}
                      onClick={() => add2Group(groupKey, curGroupLinks.length)}
                    >
                      <PlusIcon />
                      添加项&nbsp;
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

export default memo(Full)
