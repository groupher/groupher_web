import { FC, memo } from 'react'

import type { TEditMode, TSubmitState } from '@/spec'

import SubmitButton from '@/widgets/Buttons/SubmitButton'
import { SpaceGrow } from '@/widgets/Common'
import WordsCounter from '@/widgets/WordsCounter'

import type { TEditData } from './spec'
import { Wrapper, PublishFooter } from './styles/footer'
import { onPublish, onCancel, setWordsCountState } from './logic'

type TProps = {
  mode: TEditMode
  editData: TEditData
  submitState: TSubmitState
}

const Footer: FC<TProps> = ({ mode, editData, submitState }) => {
  const { body } = editData
  return (
    <Wrapper>
      <PublishFooter>
        <WordsCounter body={body} bottom={3} onChange={setWordsCountState} min={40} />
        <SpaceGrow />
        <SubmitButton
          submitState={submitState}
          okText={mode === 'publish' ? '发 布' : '更 新'}
          onPublish={onPublish}
          onCancel={onCancel}
        />
      </PublishFooter>
    </Wrapper>
  )
}

export default memo(Footer)
