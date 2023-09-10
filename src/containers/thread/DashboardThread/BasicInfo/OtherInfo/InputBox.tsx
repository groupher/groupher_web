import { FC } from 'react'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import { Br } from '@/widgets/Common'

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
import { removeMediaReport, mediaReportOnChange, queryOpenGraphInfo } from '../../logic'

type TProps = {
  item: TMediaReport
  queringMediaReportId: number | null
}

const InputBox: FC<TProps> = ({ item, queringMediaReportId }) => {
  const { id, editUrl, title } = item

  return (
    <Wrapper>
      {queringMediaReportId === id && <LavaLampLoading size="tiny" top={-2} />}
      {title && <MediaPreview item={item} />}
      <InputWrapper>
        <Inputer
          value={editUrl}
          onChange={(e) => mediaReportOnChange(item.id, e.target.value)}
          onBlur={() => queryOpenGraphInfo(item)}
        />
        <DeleteWrapper onClick={() => removeMediaReport(id)}>
          <DeleteIcon />
        </DeleteWrapper>
      </InputWrapper>
      {editUrl && <Br bottom={20} />}
      {!editUrl && <Desc>相关媒体报道的 URL 链接</Desc>}
    </Wrapper>
  )
}

export default InputBox
