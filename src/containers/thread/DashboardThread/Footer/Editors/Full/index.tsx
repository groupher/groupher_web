import { FC, useState, memo } from 'react'
import { keys } from 'ramda'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'

import { FOOTER_LAYOUT } from '@/constant/layout'
import Button from '@/widgets/Buttons/Button'

import { sortByIndex, groupByKey } from '@/utils/helper'

import BrandInfo from '../BrandInfo'
import LinkEditor from '../LinkEditor'

import MainEditor from './MainEditor'

import type { TFooterEditType } from '../../../spec'
import { FOOTER_EDIT_TYPE } from '../../../constant'

import {
  Wrapper,
  Title,
  TopWrapper,
  LinkGroup,
  BottomWrapper,
  ActionRow,
  PlusIcon,
  ColumnWrapper,
  TopLeft,
  TopRight,
} from '../../../styles/footer/editors/full'
import { moveUpLink, moveDownLink, move2TopLink, move2BottomLink } from '../../../logic/links'

type TProps = {
  links: TLinkItem[]
}

const Full: FC<TProps> = ({ links }) => {
  const [editMode, setEditMode] = useState(false)
  const [editType, setEditType] = useState<TFooterEditType>(FOOTER_EDIT_TYPE.LOGO)

  const [animateRef] = useAutoAnimate()

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
            <PlusIcon />
            添加列
          </Button>
        </ActionRow>
        <LinkGroup>
          {groupKeys.map((groupKey) => {
            const curGroupLinks = groupedLinks[groupKey]

            return (
              <ColumnWrapper key={groupKey as string} ref={animateRef}>
                <Title>{groupKey}</Title>
                {/* @ts-ignore */}
                {sortByIndex(curGroupLinks).map((item, index) => (
                  <LinkEditor
                    key={`${item.title}${item.addr}`}
                    linkItem={item as TLinkItem}
                    moveUpLink={moveUpLink}
                    moveDownLink={moveDownLink}
                    move2TopLink={move2TopLink}
                    move2BottomLink={move2BottomLink}
                    isFirst={index === 0}
                    isLast={index === curGroupLinks.length - 1}
                  />
                ))}
              </ColumnWrapper>
            )
          })}
        </LinkGroup>
      </BottomWrapper>
    </Wrapper>
  )
}

export default memo(Full)
