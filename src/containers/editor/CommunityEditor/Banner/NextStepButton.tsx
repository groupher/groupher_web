import { FC } from 'react'

import ArrowButton from '@/widgets/Buttons/ArrowButton'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { NextButton } from '../styles/banner/next_step_button'

type TProps = {
  loading?: boolean
  onClick: () => void
  disabled: boolean
}

const NextStepButton: FC<TProps> = ({ loading = false, onClick, disabled }) => {
  return (
    <>
      {loading ? (
        <LavaLampLoading />
      ) : (
        <NextButton onClick={onClick}>
          <ArrowButton disabled={disabled} reverseColor>
            下一步
          </ArrowButton>
        </NextButton>
      )}
    </>
  )
}

export default NextStepButton
