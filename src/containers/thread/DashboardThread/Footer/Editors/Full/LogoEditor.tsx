import { FC } from 'react'

import Button from '@/widgets/Buttons/Button'
import OSSUploader from '@/widgets/OSSUploader'
import { SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  LeftWrapper,
  InputWrapper,
  LogoWrapper,
  UnitTitle,
  RightWrapper,
  Note,
  InfoIcon,
  ArrowIcon,
  Inputer,
} from '../../../styles/footer/editors/full/logo_editor'

type TProps = {
  onHide: () => void
}

const LogoEditor: FC<TProps> = ({ onHide }) => {
  return (
    <Wrapper>
      <LeftWrapper>
        <OSSUploader onUploadDone={(url) => console.log(url)}>
          <LogoWrapper />
        </OSSUploader>
        <UnitTitle>长宽设置 (px):</UnitTitle>
        <InputWrapper>
          <Inputer placeholder="长度" />
          <Inputer placeholder="宽度" />
        </InputWrapper>

        <SpaceGrow />
        <Button left={-3} size="small" noBorder ghost onClick={() => onHide()}>
          <ArrowIcon />
          收起
        </Button>
      </LeftWrapper>
      <RightWrapper>
        <Note>
          <InfoIcon />
          上传说明
        </Note>
        <ul>
          <li>图片支持 50 KB 以下的主流格式，最大 150px * 50px。</li>
          <li>为满足您品牌的个性，Logo 和标题可以只设置一个。</li>
          <li>页首与页脚可分开设置。</li>
          <li>请上传社区相关的 LOGO, 盗版违法追责。</li>
        </ul>
      </RightWrapper>
    </Wrapper>
  )
}

export default LogoEditor
