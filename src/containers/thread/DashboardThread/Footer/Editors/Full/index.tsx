import { FC, useState } from 'react'

import { FOOTER_LAYOUT } from '@/constant/layout'
import Button from '@/widgets/Buttons/Button'

import BrandInfo from '../BrandInfo'
import ItemEditor from '../ItemEditor'

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

const Full: FC = () => {
  const [editMode, setEditMode] = useState(false)
  const [editType, setEditType] = useState<TFooterEditType>(FOOTER_EDIT_TYPE.LOGO)

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
          <ColumnWrapper>
            <Title>链接</Title>
            <ItemEditor />
            <ItemEditor />
            <ItemEditor />
            <ItemEditor />
            <ItemEditor />
          </ColumnWrapper>
          <ColumnWrapper>
            <Title>链接</Title>
            <ItemEditor />
            <ItemEditor />
            <ItemEditor editing />
            <ItemEditor />
            <ItemEditor />
          </ColumnWrapper>
          <ColumnWrapper alignRight>
            <Title>社交媒体</Title>
            <ItemEditor alignRight />
            <ItemEditor alignRight editing />
            <ItemEditor alignRight />
            <ItemEditor alignRight />
          </ColumnWrapper>
        </LinkGroup>
      </BottomWrapper>
    </Wrapper>
  )
}

export default Full
