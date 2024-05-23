import { FC, memo } from 'react'

import Portal from '../Portal'
import BasicNumbers from './BasicNumbers'

import { Wrapper, Section } from '../styles/overview'

const Overview: FC = () => {
  return (
    <Wrapper>
      <Portal title="设置概览" desc="基础设置向导，帮助文档等等" />
      <Section>
        <BasicNumbers />
        {/* <SectionLabel title="基本信息" /> */}
      </Section>
    </Wrapper>
  )
}

export default memo(Overview)
