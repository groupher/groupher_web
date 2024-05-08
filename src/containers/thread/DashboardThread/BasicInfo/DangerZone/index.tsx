import { FC, useState } from 'react'

import Button from '@/widgets/Buttons/Button'

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

const DangerZone: FC = () => {
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
        <Button type="red" size="small" ghost space={10} top={2}>
          隐藏
        </Button>
      </Item>
      <Item>
        <Intro>
          <Title>
            归档社区
            <InfoIcon />
          </Title>
          <Desc>归档后社区将变为只读</Desc>
        </Intro>
        <Button type="red" size="small" ghost space={10} top={2}>
          归档
        </Button>
      </Item>
      <Item>
        <Intro>
          <Title>
            删除社区
            <InfoIcon />
          </Title>
          <Desc>会关联删除所有帖子评论等，不可逆。</Desc>
        </Intro>

        <Button
          type="red"
          size="small"
          ghost
          space={10}
          top={2}
          onClick={() => setShowDeleteModal(true)}
        >
          删除
        </Button>
      </Item>
      <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
    </Wrapper>
  )
}

export default DangerZone
