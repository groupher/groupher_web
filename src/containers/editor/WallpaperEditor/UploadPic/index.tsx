import { type FC, memo } from 'react'

import UploadBox from './UploadBox'
import { Wrapper } from '../styles/upload_pic'

const UploadPic: FC = () => {
  return (
    <Wrapper>
      <UploadBox />
    </Wrapper>
  )
}

export default memo(UploadPic)
