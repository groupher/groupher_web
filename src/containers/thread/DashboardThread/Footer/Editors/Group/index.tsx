import { FC, memo } from 'react'
import { keys } from 'ramda'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'

import Button from '@/widgets/Buttons/Button'

import { sortByIndex, groupByKey } from '@/helper'

import LinkEditor from '../LinkEditor'
import GroupInputer from '../GroupInputer'

import GroupHead from './GroupHead'

import type { TFooterSettings } from '../../../spec'

import {
  Wrapper,
  LinkGroup,
  ActionRow,
  PlusIcon,
  ColumnWrapper,
  ItemsWrapper,
  Adder,
} from '../../../styles/footer/editors/group'

import {
  add2Group,
  deleteGroup,
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

const Group: FC<TProps> = ({ settings }) => {
  const {
    footerLinks: links,
    editingLink,
    editingLinkMode,
    editingGroup,
    editingGroupIndex,
  } = settings

  const [animateRef] = useAutoAnimate()
  const [groupAnimateRef] = useAutoAnimate()

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper>
      <ActionRow>
        {editingGroup !== null && editingGroupIndex === null ? (
          <GroupInputer
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
                    链接&nbsp;
                  </Button>
                </Adder>
              )}
            </ColumnWrapper>
          )
        })}
      </LinkGroup>
    </Wrapper>
  )
}

export default memo(Group)
