import { type FC, memo } from 'react'

import type { TEmotionType } from '~/spec'
import { EIcon } from '../styles/selected_emotions/emotion_icon'

type TProps = {
  name: TEmotionType
}

const EmotionIcon: FC<TProps> = ({ name }) => {
  return <EIcon src={`/icons/emotion/${name}.png`} name={name} noLazy />
}

export default memo(EmotionIcon)
