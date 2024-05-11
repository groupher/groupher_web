'use client'

import { FC } from 'react'

import { observer } from 'mobx-react-lite'

import { useTheme } from './hooks'

const TestCmp: FC = () => {
  const { theme, toggle, themeDesc } = useTheme()

  return (
    <div>
      <h2>当前 theme: {theme}</h2>
      <p>{themeDesc}</p>

      <button onClick={() => toggle()}>改变</button>
      <p>吃瓜群众</p>
    </div>
  )
}

export default observer(TestCmp)
