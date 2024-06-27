import type { FC } from 'react'

import type { TMediaReport } from '~/spec'
import LavaLampLoading from '~/widgets/Loading/LavaLampLoading'
import { Br } from '~/widgets/Common'

import MediaPreview from './MediaPreview'

import useBaseInfo from '../../logic/useBaseInfo'

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
  queringMediaReportIndex: number | null
}

const InputBox: FC<TProps> = ({ item, queringMediaReportIndex }) => {
  const { index, editUrl, title } = item

  const { removeMediaReport, mediaReportOnChange, queryOpenGraphInfo } = useBaseInfo()

  return (
    <Wrapper>
      {index !== null && queringMediaReportIndex === index && (
        <LavaLampLoading size="tiny" top={-2} />
      )}
      {title && <MediaPreview item={item} />}
      <InputWrapper>
        <Inputer
          value={editUrl}
          onChange={(e) => mediaReportOnChange(item.index, e.target.value)}
          onBlur={() => queryOpenGraphInfo(item)}
        />
        <DeleteWrapper onClick={() => removeMediaReport(index)}>
          <DeleteIcon />
        </DeleteWrapper>
      </InputWrapper>
      {editUrl && <Br bottom={20} />}
      {!editUrl && <Desc>复制相关媒体报道的 URL 链接</Desc>}
    </Wrapper>
  )
}

export default InputBox
