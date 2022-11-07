/*
 *
 * HaveADrink Body
 *
 */

import { FC, memo } from 'react'

import Button from '@/widgets/Buttons/Button'
import Linker from '@/widgets/Linker'

import { Wrapper, Title, Body, Indent } from '../styles/body/about'
import { setView } from '../logic'

const About: FC = () => {
  return (
    <Wrapper>
      <Title>关于「来一杯」</Title>
      <Body>
        <Indent />
        来一杯版块是对碎片知识呈现与互动的一个尝试，目前还在雏形阶段。所收集的片段、案列、黑料等都与本行业相关，大多来自网络。
        如果你对此有任何建议请到
        <Linker
          src="/feedback"
          external={false}
          text="Feedback"
          left={4}
          right={4}
          inline
        />
        参与讨论。
      </Body>

      <Button size="medium" onClick={() => setView('default')} noBorder ghost>
        返回
      </Button>
    </Wrapper>
  )
}

export default memo(About)
