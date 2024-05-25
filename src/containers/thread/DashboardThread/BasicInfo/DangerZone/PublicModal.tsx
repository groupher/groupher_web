import { FC, useState } from 'react'

import VIEW from '@/const/view'

import Modal from '@/widgets/Modal'
import { Br } from '@/widgets/Common'
import Tabs from '@/widgets/Switcher/Tabs'
import Button from '@/widgets/Buttons/Button'
// import NoteTip from '@/widgets/NoteTip'
import HeadsUp from '@/widgets/HeadsUp'

// import from '@/widgets/Alert'
import List from './List'

import {
  Wrapper,
  WarningTitle,
  Body,
  Desc,
  Footer,
  TextareaInput,
} from '../../styles/basic_info/danger_zone/modal'

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

const defaultPrivateNote = '当前社区为私有状态，只对管理员开放。'

const PublicModal: FC<TProps> = ({ show, onClose }) => {
  const [visible, setVisible] = useState('public')
  const [privateNote, setPrivateNote] = useState(defaultPrivateNote)

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
        <Br bottom={15} />
        <Footer>
          <Tabs
            items={VISIBLE_OPTIONS}
            activeKey={visible}
            onChange={(value) => setVisible(value)}
            view={VIEW.DRAWER}
          />
          <Br bottom={20} />
          <Desc>对外提示信息（支持 Markdown）</Desc>
          <Br bottom={8} />
          <TextareaInput
            value={privateNote}
            placeholder={defaultPrivateNote}
            behavior="textarea"
            onChange={(e) => setPrivateNote(e.target.value)}
          />
          <Br bottom={15} />
          <Button type="primary">确定变更</Button>
        </Footer>
      </Wrapper>
    </Modal>
  )
}

export default PublicModal
