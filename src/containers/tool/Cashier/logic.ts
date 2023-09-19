import { useEffect } from 'react'
import { isEmpty } from 'ramda'

import EVENT from '@/constant/event'
import ERR from '@/constant/err'

import asyncSuit from '@/utils/async'
import { errorForHuman } from '@/utils/errors'
import { Global } from '@/utils/helper'
import { send, errRescue, toast } from '@/signal'
import { buildLog } from '@/utils/logger'

import type { TStore } from './store'
import S from './schema'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit

const sr71$ = new SR71({
  // @ts-ignore
  receive: [EVENT.CALL_CASHIER],
})

let store: TStore | undefined
let sub$ = null

/* eslint-disable-next-line */
const log = buildLog('L:Cashier')

export const sidebarViewOnChange = (sidebarView): void =>
  store.mark({ sidebarView, contentView: sidebarView })

export const paymentMethodOnChange = (paymentMethod): void => store.mark({ paymentMethod })

export const subContentViewOnChange = (subContentView): void => store.mark({ subContentView })

export const transferAccountChange = ({ target: { value } }) =>
  store.mark({ transferAccount: value })

export const onPaymentConfirm = (): void => {
  if (!store.isLogin) return store.authWarning({ hideToast: true })
  if (isEmpty(store.transferAccount)) {
    return toast('提交失败: 请填写转账信息', 'error')
  }

  const { paymentMethod, paymentUsage, amount, transferAccount: note } = store

  const args = {
    paymentMethod,
    paymentUsage,
    amount: parseFloat(amount),
    note,
  }
  log('onPaymentConfirm: ', args)
  sr71$.mutate(S.createBill, args)
}

export const onClose = (): void => {
  const confirmed = Global.confirm('若已付款，请确保您填写了账户信息')

  if (confirmed) return store.mark({ show: false, subContentView: 'pay' })
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes(EVENT.CALL_CASHIER),
    action: (data) => {
      const { amount, usage } = data[EVENT.CALL_CASHIER]
      store.mark({ show: true, amount: String(amount), paymentUsage: usage })
    },
  },
  {
    match: asyncRes('createBill'),
    action: ({ createBill }) => {
      log('createBill done: ', createBill)
      store.mark({ show: false, subContentView: 'pay' })
      send(EVENT.NEW_BILLS)
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.GRAPHQL),
    action: ({ details }) => toast(`提交失败: ${errorForHuman(details)}`, 'error'),
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => errRescue({ type: ERR.TIMEOUT, details, path: 'Cashier' }),
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: () => errRescue({ type: ERR.NETWORK, path: 'Cashier' }),
  },
]

// ###############################
// init & uninit
// ###############################
export const useInit = (_store: TStore): void => {
  useEffect(() => {
    store = _store
    // log('effect init')
    sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

    return () => {
      // log('effect uninit')
      sr71$.stop()
      sub$.unsubscribe()
    }
  }, [_store])
}
