import { type FC, memo } from 'react'

import type { TSubmitState } from '~/spec'

import LavaLampLoading from '~/widgets/Loading/LavaLampLoading'
import CustomScroller from '~/widgets/CustomScroller'

import BodyEditor from './BodyEditor'
import Footer from './Footer'

import useLogic from '../useLogic'
import { Wrapper, Header, EditorWrapper, FooterWrapper } from '../styles/editor/update_editor'

type TProps = {
  body: string
  submitState: TSubmitState
  id: string | null
}

const UpdateEditor: FC<TProps> = ({ id, body, submitState }) => {
  const { commentOnChange, updateComment, closeUpdateEditor } = useLogic()

  return (
    <Wrapper>
      <Header>修改评论</Header>
      <CustomScroller direction="vertical" height="320px" showShadow={false} autoHide={false}>
        <EditorWrapper>
          {id ? (
            <BodyEditor body={body} onChange={(v) => commentOnChange(v)} />
          ) : (
            <LavaLampLoading top={10} left={30} />
          )}
        </EditorWrapper>
      </CustomScroller>

      <FooterWrapper>
        <Footer
          label="更 新"
          submitState={submitState}
          body={body}
          onPublish={updateComment}
          onCancel={closeUpdateEditor}
        />
      </FooterWrapper>
    </Wrapper>
  )
}

export default memo(UpdateEditor)
