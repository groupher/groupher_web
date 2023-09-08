import { FC } from 'react'

import type { TMediaReport } from '../../spec'

import MediaPreview from './MediaPreview'

import {
  Wrapper,
  Inputer,
  Desc,
  InputWrapper,
  DeleteWrapper,
  DeleteIcon,
} from '../../styles/basic_info/other_info/input_box'

type TProps = {
  item: TMediaReport
}

const InputBox: FC<TProps> = ({ item }) => {
  const { url } = item

  return (
    <Wrapper>
      <MediaPreview item={item} />
      <InputWrapper>
        <Inputer value={url} />
        <DeleteWrapper>
          <DeleteIcon />
        </DeleteWrapper>
      </InputWrapper>
      <Desc>相关媒体报道的 URL 链接</Desc>
    </Wrapper>
  )
}

export default InputBox
