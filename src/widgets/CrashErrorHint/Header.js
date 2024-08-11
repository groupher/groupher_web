import React from 'react'

import EXECUTES from './executes'

import { Header, HintIcon, Title } from './styles'

const HeaderComp = ({ index, themeName }) => {
  return (
    <div>
      <Header>
        <HintIcon src={EXECUTES[index].icon} />
        <Title t={themeName}>{EXECUTES[index].title}</Title>
        <div className="grow" />
      </Header>
    </div>
  )
}

export default React.memo(HeaderComp)
