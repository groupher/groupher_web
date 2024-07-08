import { type FC, memo } from 'react'

import type { TSubmitState } from '~/spec'

// import Header from './Header'
import BodyEditor from './BodyEditor'

import useLogic from '../useLogic'
import { Wrapper } from '../styles/editor/publish_editor'

type TProps = {
  body: string
  submitState: TSubmitState
}

const PublishEditor: FC<TProps> = ({ submitState, body }) => {
  const { commentOnChange } = useLogic()

  return (
    <Wrapper>
      {/* <Header accountInfo={accountInfo} showEditor={showEditor} /> */}
      <BodyEditor body={body} onChange={(v) => commentOnChange(v)} />

      {/* <Footer
        submitState={submitState}
        body={body}
        onPublish={createComment}
        onCancel={closeEditor}
      /> */}
    </Wrapper>
  )
}

export default memo(PublishEditor)
