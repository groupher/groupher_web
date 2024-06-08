import { type FC, useState } from 'react'

import Button from '@/widgets/Buttons/Button'

import PublicModal from './PublicModal'
import ArchiveModal from './ArchiveModal'
import DeleteModal from './DeleteModal'

import {
  Wrapper,
  Item,
  Intro,
  DangerTitle,
  Title,
  InfoIcon,
  Desc,
} from '../../styles/basic_info/danger_zone'

const ActionButton = ({ children, onClick }) => {
  return (
    <Button type="red" size="small" space={10} top={2} ghost onClick={onClick}>
      {children}
    </Button>
  )
}

const DangerZone: FC = () => {
  const [showPublicModal, setPublicModal] = useState(false)
  const [showArchiveModal, setArchiveModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <Wrapper>
      <DangerTitle>危险操作</DangerTitle>
      <Item>
        <Intro>
          <Title>
            社区可见性
            <InfoIcon />
          </Title>
          <Desc>当前社区为公开，任何人可以访问</Desc>
        </Intro>
        <ActionButton onClick={() => setPublicModal(true)}>隐藏</ActionButton>
      </Item>
      <Item>
        <Intro>
          <Title>
            社区归档
            <InfoIcon />
          </Title>
          <Desc>归档后社区将变为只读</Desc>
        </Intro>
        <ActionButton onClick={() => setArchiveModal(true)}>归档</ActionButton>
      </Item>
      <Item>
        <Intro>
          <Title>
            删除社区
            <InfoIcon />
          </Title>
          <Desc>会关联删除所有帖子评论等，不可逆。</Desc>
        </Intro>

        <ActionButton onClick={() => setShowDeleteModal(true)}>删除</ActionButton>
      </Item>
      <PublicModal show={showPublicModal} onClose={() => setPublicModal(false)} />
      <ArchiveModal show={showArchiveModal} onClose={() => setArchiveModal(false)} />
      <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
    </Wrapper>
  )
}

export default DangerZone
