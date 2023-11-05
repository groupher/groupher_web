/* *
 * Subscriber
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { Br, Divider } from '@/widgets/Common'
import Modal from '@/widgets/Modal'

import type { TBy } from './spec'
import { BY } from './constant'
import { useStore } from './store'

import SubscribeInfo from './SubscribeInfo'

import { Wrapper, ByWrapper, IconWrapper, MailIcon, RSSIcon, IconTitle, IconBox } from './styles'

import { useInit, onClose, changeBy } from './logic'

// const log = buildLog('C:Subscriber')

const Subscriber: FC = () => {
  const store = useStore()
  useInit(store)

  const { visible, by } = store

  return (
    <Modal
      show={visible}
      width="380px"
      onClose={onClose}
      showCloseBtn
      offsetTop="25%"
      mode="default"
    >
      <Wrapper testid="subscriber">
        <h3>订阅更新</h3>
        <Br top={20} />
        <ByWrapper>
          <IconWrapper $active={by === BY.EMAIL} onClick={() => changeBy(BY.EMAIL)}>
            <IconBox>
              <MailIcon />
            </IconBox>
            <IconTitle>电子邮件</IconTitle>
          </IconWrapper>
          <IconWrapper $active={by === BY.RSS} onClick={() => changeBy(BY.RSS)}>
            <IconBox>
              <RSSIcon />
            </IconBox>
            <IconTitle>RSS</IconTitle>
          </IconWrapper>
        </ByWrapper>
        <Divider top={30} bottom={30} />
        <SubscribeInfo by={by as TBy} />
      </Wrapper>
    </Modal>
  )
}

export default observer(Subscriber)
