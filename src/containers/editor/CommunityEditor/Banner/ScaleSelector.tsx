import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import useTheme from '@/hooks/useTheme'
import THEME from '@/const/theme'

import type { TCommunityType } from '../spec'
import { COMMUNITY_CATS_TEXT_COLORS } from '../constant'
import {
  Wrapper,
  SlideBox,
  Bar,
  BarDot,
  IndexDot,
  Footer,
  Note,
  ShineNote,
} from '../styles/banner/scale_selector'

const STEP = {
  S: '15%',
  X: '40%',
  M: '65%',
  L: '91%',
}

type TProps = {
  communityType: TCommunityType
}

const ScaleSelector: FC<TProps> = ({ communityType }) => {
  const { theme } = useTheme()
  const [step, setStep] = useState(STEP.X)
  const colors = COMMUNITY_CATS_TEXT_COLORS[communityType]
  const darker = theme === THEME.NIGHT

  return (
    <Wrapper>
      <SlideBox>
        <Bar $width={step} $colors={colors} $darker={darker}>
          <BarDot />
        </Bar>
        <IndexDot onClick={() => setStep(STEP.S)} />
        <IndexDot onClick={() => setStep(STEP.X)} />
        <IndexDot onClick={() => setStep(STEP.M)} />
        <IndexDot onClick={() => setStep(STEP.L)} />
      </SlideBox>
      <Footer>
        {step !== STEP.S ? (
          <Note left={-22} onClick={() => setStep(STEP.S)} $active={step === STEP.S}>
            独立开发者
          </Note>
        ) : (
          <ShineNote $colors={colors} onClick={() => setStep(STEP.S)}>
            独立开发者
          </ShineNote>
        )}
        <Note left={-12} onClick={() => setStep(STEP.X)} $active={step === STEP.X}>
          2-20
        </Note>
        <Note left={-4} onClick={() => setStep(STEP.M)} $active={step === STEP.M}>
          20-100
        </Note>
        <Note left={-4} right={2} onClick={() => setStep(STEP.L)} $active={step === STEP.L}>
          100+
        </Note>
      </Footer>
    </Wrapper>
  )
}

export default observer(ScaleSelector)
