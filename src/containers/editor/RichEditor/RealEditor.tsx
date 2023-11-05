/*
 *
 * RichEditor
 *
 */

import { FC } from 'react'

import TheRichEditor from '@groupher/react-editor'
import { buildLog } from '@/logger'

import { useStore } from './store'
import { useInit } from './logic'

import OverwriteStyle from './styles/overwrite'
import { Wrapper, InnerWrapper, EditorWrapper } from './styles'
import { observer } from 'mobx-react-lite'

/* eslint-disable-next-line */
const log = buildLog('C:RichEditor')

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
  onChange = log,
}) => {
  const store = useStore()
  useInit(store)

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

export default observer(RichEditor)
