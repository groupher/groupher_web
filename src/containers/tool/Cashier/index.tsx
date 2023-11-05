/*
 *
 * Cashier
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { buildLog } from '@/logger'

import Modal from '@/widgets/Modal'

import Sidebar from './Sidebar'
import Content from './Content'

import { useStore } from './store'
import { Wrapper } from './styles'
import { useInit, onClose } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:Cashier')

const Cashier: FC = () => {
  const store = useStore()
  useInit(store)

  const { show, sidebarView, contentView, subContentView, paymentMethod, amount, transferAccount } =
    store

  return (
    <Modal width="520px" show={show} showCloseBtn onClose={onClose}>
      <Wrapper>
        <Sidebar
          sidebarView={sidebarView}
          subContentView={subContentView}
          paymentMethod={paymentMethod}
          amount={amount}
        />
        <Content
          contentView={contentView}
          subContentView={subContentView}
          amount={amount}
          paymentMethod={paymentMethod}
          transferAccount={transferAccount}
        />
      </Wrapper>
    </Modal>
  )
}

export default observer(Cashier)
