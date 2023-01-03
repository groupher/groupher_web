import { FC, useState } from 'react'

import { FOOTER_LAYOUT } from '@/constant'
import Button from '@/widgets/Buttons/Button'

import BrandInfo from '../BrandInfo'
import ItemEditor from '../ItemEditor'

import BrandEditor from './BrandEditor'

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

  return (
    <Wrapper>
      <TopWrapper>
        <TopLeft>
          <BrandInfo
            footerLayout={FOOTER_LAYOUT.FULL}
            triggerEditor={() => setEditMode(true)}
            editable
          />
        </TopLeft>
        {editMode && (
          <TopRight>
            <BrandEditor onHide={() => setEditMode(false)} />
          </TopRight>
        )}
      </TopWrapper>
      <BottomWrapper>
        <ActionRow>
          <Button size="small" ghost space={10}>
            <PlusIcon />
            添加组
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
