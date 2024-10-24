/*
 * EmojiSelector
 */

import { type FC, memo } from 'react'

import type { TEmotion, TEmotionType } from '~/spec'
import IconButton from '~/widgets/Buttons/IconButton'
import Tooltip from '~/widgets/Tooltip'

import { emotionsCoverter } from './helper'
import SelectedEmotions from './SelectedEmotions/index'
import Panel from './Panel'
import { SelectEmotionWrapper } from './styles'

type TProps = {
  isLegal?: boolean
  emotions: TEmotion
  onAction?: (name: TEmotionType, hasEmotioned: boolean) => void
}

const EmotionSelector: FC<TProps> = ({ onAction = console.log, isLegal = true, emotions }) => {
  const validEmotions = emotionsCoverter(emotions)
  return (
    <>
      <SelectedEmotions emotions={validEmotions} onAction={onAction} />
      {isLegal && (
        <Tooltip
          content={<Panel emotions={validEmotions} onAction={onAction} />}
          trigger="click"
          noPadding
        >
          <SelectEmotionWrapper>
            <IconButton icon="emotion" dimWhenIdle size={18} />
          </SelectEmotionWrapper>
        </Tooltip>
      )}
    </>
  )
}

export default memo(EmotionSelector)
