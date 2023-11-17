'use client'

import { FC } from 'react'

import { useStore } from './store'
import { useInit } from './logic'

const Mushroom: FC = () => {
  const store = useStore()
  useInit(store)

  return <div />
}

export default Mushroom
