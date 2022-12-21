import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

// import { Br } from '@/widgets/Common'

import Portal from '../Portal'
import SectionLabel from '../SectionLabel'
// import CheckLabel from '@/widgets/CheckLabel'

import { Wrapper, Section, Title } from '../styles/overview'

type TProps = {
  testid?: TPostLayout
}

const Overview: FC<TProps> = ({ testid = 'basic-info' }) => {
  return (
    <Wrapper>
      <Portal title="设置概览" desc="基础设置向导，帮助文档等等" />
      <Section>
        {/* <SectionLabel title="基本信息" /> */}
        <Title>外观设置：xxx, xxx</Title>
        <Title>设置指南：xxx, xxx</Title>
      </Section>
    </Wrapper>
  )
}

export default memo(Overview)
