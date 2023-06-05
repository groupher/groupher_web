import { FC, useState, memo } from 'react'
import { keys } from 'ramda'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'

import { FOOTER_LAYOUT } from '@/constant/layout'
import Button from '@/widgets/Buttons/Button'

import { sortByIndex, groupByKey } from '@/utils/helper'

import BrandInfo from '../BrandInfo'
import LinkEditor from '../LinkEditor'

import GroupHead from './GroupHead'
import MainEditor from './MainEditor'

import type { TFooterEditType } from '../../../spec'
import { FOOTER_EDIT_TYPE } from '../../../constant'

import {
  Wrapper,
  TopWrapper,
  LinkGroup,
  BottomWrapper,
  ActionRow,
  PlusIcon,
  ColumnWrapper,
  Adder,
  TopLeft,
  TopRight,
} from '../../../styles/footer/editors/full'

import {
  add2Group,
  moveLinkUp,
  moveLinkDown,
  moveLink2Top,
  moveLink2Bottom,
  moveGroup2Left,
  moveGroup2Right,
  moveGroup2EdgeLeft,
  moveGroup2EdgeRight,
} from '../../../logic/links'

type TProps = {
  links: TLinkItem[]
}

const Full: FC<TProps> = ({ links }) => {
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
          <Button size="small" ghost space={10}>
            添加组
            <PlusIcon />
          </Button>
        </ActionRow>
        <LinkGroup ref={groupAnimateRef}>
          {groupKeys.map((groupKey: string, index) => {
            const curGroupLinks = groupedLinks[groupKey]

            return (
              <ColumnWrapper key={groupKey} ref={animateRef}>
                <GroupHead
                  title={groupKey as string}
                  moveLeft={() => moveGroup2Left(groupKey)}
                  moveRight={() => moveGroup2Right(groupKey)}
                  moveEdgeLeft={() => moveGroup2EdgeLeft(groupKey)}
                  moveEdgeRight={() => moveGroup2EdgeRight(groupKey)}
                  isEdgeLeft={index === 0}
                  isEdgeRight={index === groupKeys.length - 1}
                />
                {/* @ts-ignore */}
                {sortByIndex(curGroupLinks).map((item, index) => (
                  <LinkEditor
                    key={`${item.group}${item.groupIndex}`}
                    linkItem={item as TLinkItem}
                    moveLinkUp={moveLinkUp}
                    moveLinkDown={moveLinkDown}
                    moveLink2Top={moveLink2Top}
                    moveLink2Bottom={moveLink2Bottom}
                    isFirst={index === 0}
                    isLast={index === curGroupLinks.length - 1}
                  />
                ))}

                <Adder>
                  <Button
                    size="small"
                    ghost
                    space={8}
                    onClick={() => add2Group(groupKey, curGroupLinks.length)}
                  >
                    添加项
                    <PlusIcon />
                  </Button>
                </Adder>
              </ColumnWrapper>
            )
          })}
        </LinkGroup>
      </BottomWrapper>
    </Wrapper>
  )
}

export default memo(Full)
