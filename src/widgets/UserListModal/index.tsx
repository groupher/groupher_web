import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useUserListModal from '~/hooks/useUserListModal'
import Modal from '~/widgets/Modal'
import CustomScroller from '~/widgets/CustomScroller'
import UserList from '~/widgets/UserList'

import { Wrapper } from './styles'

const UserListModal: FC = () => {
  const { show, onClose } = useUserListModal()

  return (
    <Modal show={show} width="400px" onClose={onClose} showCloseBtn>
      <Wrapper>
        <h2>List Modal</h2>

        <CustomScroller>
          <UserList />
        </CustomScroller>
      </Wrapper>
    </Modal>
  )
}

export default observer(UserListModal)
