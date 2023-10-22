import { FC, memo, useEffect } from 'react'

import type { TOverview } from '../spec'

import Portal from '../Portal'
import BasicNumbers from './BasicNumbers'

import { Wrapper, Section } from '../styles/overview'
import { loadCommunityOverview } from '../logic'

export type TProps = {
  data: TOverview
}

const Overview: FC<TProps> = ({ data }) => {
  useEffect(() => {
    setTimeout(() => {
      loadCommunityOverview()
    })
  }, [])

  return (
    <Wrapper>
      <Portal title="设置概览" desc="基础设置向导，帮助文档等等" />
      <Section>
        <BasicNumbers data={data} />
        {/* <SectionLabel title="基本信息" /> */}
      </Section>
    </Wrapper>
  )
}

export default memo(Overview)
