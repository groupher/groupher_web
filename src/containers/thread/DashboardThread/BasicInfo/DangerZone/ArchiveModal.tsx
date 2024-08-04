import type { FC } from 'react'

import Modal from '~/widgets/Modal'

// import NoteTip from '~/widgets/NoteTip'
import HeadsUp from '~/widgets/HeadsUp'
import Button from '~/widgets/Buttons/Button'

// import from '~/widgets/Alert'
import List from './List'

import useBaseInfo from '../../logic/useBaseInfo'
import { Wrapper, WarningTitle, Body, Footer } from '../../styles/basic_info/danger_zone/modal'

type TProps = {
  show: boolean
  onClose: () => void
}

const ArchiveModal: FC<TProps> = ({ show, onClose }) => {
  const { archiveCommunity } = useBaseInfo()

  return (
    <Modal show={show} width="390px" offsetLeft="40%" onClose={() => onClose()} showCloseBtn>
      <Wrapper>
        <WarningTitle>社区归档</WarningTitle>
        <Body>
          <HeadsUp type="warning">归档后社区将变为只读，可再次切换。</HeadsUp>

          <List
            items={[
              '无法发布帖子，更新日志以及文档等',
              '无法评论，点增等互动操作',
              '相关的操作队列将停止运行',
            ]}
            left={31}
            top={28}
          />
        </Body>
        <Footer>
          <div className="grow" />
          <Button space={15} right={10} bottom={8} onClick={() => archiveCommunity()}>
            已了解，确定归档
          </Button>
          <div className="grow" />
        </Footer>
      </Wrapper>
    </Modal>
  )
}

export default ArchiveModal
