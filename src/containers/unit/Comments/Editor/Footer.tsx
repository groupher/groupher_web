import type { FC } from 'react'

import type { TSubmitState } from '~/spec'

import WordsCounter from '~/widgets/WordsCounter'
import SubmitButton from '~/widgets/Buttons/SubmitButton'

import useLogic from '../useLogic'
import { Wrapper } from '../styles/editor/footer'

type TProps = {
  body: string
  label?: string
  submitState: TSubmitState
  onPublish: () => void
  onCancel: () => void
}

const EditorFooter: FC<TProps> = ({ body, label = '发 布', submitState, onPublish, onCancel }) => {
  const { setWordsCountState } = useLogic()

  return (
    <Wrapper>
      <WordsCounter body={body} bottom={3} min={10} max={1000} onChange={setWordsCountState} />
      <SubmitButton
        okText={label}
        submitState={submitState}
        onPublish={onPublish}
        onCancel={onCancel}
      />
    </Wrapper>
  )
}

export default EditorFooter
