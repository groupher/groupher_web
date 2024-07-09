import type { FC } from 'react'

import type { TEditMode, TSubmitState } from '~/spec'

import SubmitButton from '~/widgets/Buttons/SubmitButton'
import { SpaceGrow } from '~/widgets/Common'
import WordsCounter from '~/widgets/WordsCounter'

import type { TEditData } from './spec'
import useLogic from './useLogic'
import { Wrapper, PublishFooter } from './styles/footer'

type TProps = {
  mode: TEditMode
  editData: TEditData
  submitState: TSubmitState
}

const Footer: FC<TProps> = ({ mode, editData, submitState }) => {
  const { onPublish, onCancel, setWordsCountState } = useLogic()

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

export default Footer
