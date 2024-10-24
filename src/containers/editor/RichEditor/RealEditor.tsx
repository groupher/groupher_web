/*
 *
 * RichEditor
 *
 */

import type { FC } from 'react'

import TheRichEditor from '@groupher/react-editor'

import OverwriteStyle from './styles/overwrite'
import { Wrapper, InnerWrapper, EditorWrapper } from './styles'

type TProps = {
  placeholder?: string
  data?: string
  type?: 'article' | 'works' | 'job' | 'comment' | 'radar'
  reinitKey?: string
  onChange?: (json) => void
}

const RichEditor: FC<TProps> = ({
  data,
  placeholder = "// 正文内容（'Tab' 键插入富文本）",
  type = 'article',
  reinitKey = '',
  onChange = console.log,
}) => {
  // 使用模板 or 转载或翻译 or 请保持友善
  return (
    <Wrapper>
      <InnerWrapper type={type}>
        {/* {type !== 'comment' && <Options addon={addon} />} */}
        <EditorWrapper className="rich-editor" type={type}>
          <TheRichEditor
            onData={onChange}
            reinitKey={reinitKey}
            data={JSON.parse(data || '{}')}
            placeholder={placeholder}
          />
          <OverwriteStyle />
        </EditorWrapper>
      </InnerWrapper>
      {/* <EditorWrapper id="codex-editor" /> */}
    </Wrapper>
  )
}

export default RichEditor
