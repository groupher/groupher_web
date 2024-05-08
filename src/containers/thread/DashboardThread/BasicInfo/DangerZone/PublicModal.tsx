import { FC, useState } from 'react'

import VIEW from '@/constant/view'

import Modal from '@/widgets/Modal'
import { SpaceGrow } from '@/widgets/Common'
import Tabs from '@/widgets/Switcher/Tabs'
// import NoteTip from '@/widgets/NoteTip'
import HeadsUp from '@/widgets/HeadsUp'

// import from '@/widgets/Alert'
import List from './List'

import { Wrapper, WarningTitle, Body, Footer } from '../../styles/basic_info/danger_zone/modal'

type TProps = {
  show: boolean
  onClose: () => void
}

export const VISIBLE_OPTIONS = [
  {
    title: '公开（默认）',
    slug: 'public',
  },
  {
    title: '隐藏',
    slug: 'private',
  },
]

const PublicModal: FC<TProps> = ({ show, onClose }) => {
  const [visible, setVisible] = useState('public')

  return (
    <Modal show={show} width="390px" offsetLeft="40%" onClose={() => onClose()} showCloseBtn>
      <Wrapper>
        <WarningTitle>社区可见性</WarningTitle>
        <Body>
          <HeadsUp type="warning">隐藏后所有内容只对管理员可见，当前为公开。</HeadsUp>

          <List
            items={[
              '所有帖子，看板，更新日志等等将不可见',
              '社区创建者以及管理员不受影响',
              '后台操作不受影响',
            ]}
            left={31}
            top={28}
          />
        </Body>
        <Footer>
          <SpaceGrow />
          <Tabs
            items={VISIBLE_OPTIONS}
            activeKey={visible}
            onChange={(value) => setVisible(value)}
            view={VIEW.DRAWER}
          />
          <SpaceGrow />
        </Footer>
      </Wrapper>
    </Modal>
  )
}

export default PublicModal
