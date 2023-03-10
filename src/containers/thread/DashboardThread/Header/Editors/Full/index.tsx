import { FC, useState } from 'react'

import { FOOTER_LAYOUT } from '@/constant/layout'
import Button from '@/widgets/Buttons/Button'

import BrandInfo from '../BrandInfo'
import LinkEditor from '../LinkEditor'

import Editor from './Editor'

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
} from '../../../styles/header/editors/full'

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
            <Editor type={editType} onHide={() => setEditMode(false)} />
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
            <LinkEditor />
            <LinkEditor />
            <LinkEditor notifyText="new" />
            <LinkEditor />
            <LinkEditor />
          </ColumnWrapper>
          <ColumnWrapper>
            <Title>链接</Title>
            <LinkEditor />
            <LinkEditor />
            <LinkEditor editing />
            <LinkEditor />
            <LinkEditor />
          </ColumnWrapper>
          <ColumnWrapper>
            <Title>社交媒体</Title>
            <LinkEditor />
            <LinkEditor />
            <LinkEditor />
            <LinkEditor />
          </ColumnWrapper>
        </LinkGroup>
      </BottomWrapper>
    </Wrapper>
  )
}

export default Full
