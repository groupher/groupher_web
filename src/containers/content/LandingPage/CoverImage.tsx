import { FC } from 'react'

import { Space, SpaceGrow } from '@/widgets/Common'
import {
  Wrapper,
  BrowerHead,
  Dot,
  AddrBar,
  LockIcon,
  AddText,
  Highlight,
  Image,
} from './styles/cover_image'

const CoverImage: FC = () => {
  return (
    <Wrapper>
      <BrowerHead>
        <Dot />
        <Dot />
        <Dot />
        <SpaceGrow />
        <AddrBar>
          <LockIcon />
          <AddText>https://</AddText>
          <Space right={2} />
          <Highlight>your-brand</Highlight>
          <AddText>.groupher.com</AddText>
        </AddrBar>
        <SpaceGrow />
      </BrowerHead>
      <Image src="/landing-demo.png" />
    </Wrapper>
  )
}

export default CoverImage
