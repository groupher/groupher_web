/*
 *
 * UserLister
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import TYPE from '@/constant/type'
import { buildLog } from '@/logger'

import EmptyLabel from '@/widgets/EmptyLabel'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { useStore } from './store'
import HeaderInfo from './HeaderInfo'
import List from './List'

import { Wrapper, MsgWrapper } from './styles'
import { useInit } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:UserLister')

const renderContent = (type, curView, pagedUsersData) => {
  switch (curView) {
    case TYPE.LOADING:
      return (
        <MsgWrapper>
          <LavaLampLoading />
        </MsgWrapper>
      )

    case TYPE.RESULT_EMPTY:
      return (
        <MsgWrapper>
          <EmptyLabel text="没有找到你要找的人呢" />
        </MsgWrapper>
      )

    default:
      return <List type={type} data={pagedUsersData} />
  }
}

type TProps = {
  type: string
}

const UserLister: FC<TProps> = ({ type }) => {
  const store = useStore()
  useInit(store, type)

  const { curView, pagedUsersData, curCommunity } = store

  return (
    <Wrapper>
      <HeaderInfo type={type} totalCount={pagedUsersData.totalCount} curCommunity={curCommunity} />

      {renderContent(type, curView, pagedUsersData)}
    </Wrapper>
  )
}

export default observer(UserLister)
