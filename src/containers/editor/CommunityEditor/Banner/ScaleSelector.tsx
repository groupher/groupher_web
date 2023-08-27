import { FC, useState } from 'react'

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
  L: '92%',
}

const ScaleSelector: FC = () => {
  const [step, setStep] = useState(STEP.S)

  return (
    <Wrapper>
      <SlideBox>
        <Bar width={step}>
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
          <ShineNote onClick={() => setStep(STEP.S)}>独立开发者</ShineNote>
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

export default ScaleSelector
