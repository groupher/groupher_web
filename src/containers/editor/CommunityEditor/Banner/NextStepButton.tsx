import { FC } from 'react'

import ArrowButton from '@/widgets/Buttons/ArrowButton'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import { Wrapper, Text } from '../styles/banner/next_step_button'

type TProps = {
  loading?: boolean
  onClick: () => void
  disabled: boolean
  text?: string
}

const NextStepButton: FC<TProps> = ({ loading = false, onClick, disabled, text = '下一步' }) => {
  return (
    <>
      {loading ? (
        <LavaLampLoading />
      ) : (
        <Wrapper onClick={onClick} disabled={disabled} noPaddingRight={disabled}>
          <ArrowButton disabled={disabled} reverseColor>
            <Text disabled={disabled}>{text}</Text>
          </ArrowButton>
        </Wrapper>
      )}
    </>
  )
}

export default NextStepButton
