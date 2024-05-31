import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { Br } from '@/widgets/Common'
import OSSUploader from '@/widgets/OSSUploader'

import { SETTING_FIELD } from '../constant'
import SavingBar from '../SavingBar'

import useBaseInfo from '../logic/useBaseInfo'
import {
  Wrapper,
  FaviconWrapper,
  Favicon,
  LogoWrapper,
  Logo,
  Title,
  Desc,
} from '../styles/basic_info/logos'

const Logos: FC = () => {
  const { edit, saving, logo, isLogosTouched } = useBaseInfo()

  return (
    <Wrapper>
      <Title>favicon</Title>
      <FaviconWrapper>
        <OSSUploader previewHeight={30} previewWidth={30}>
          <Favicon />
        </OSSUploader>
      </FaviconWrapper>
      <Desc>上传 favicon, 仅支持 ico 格式，最大 10 KB。可选。</Desc>
      <Br bottom={30} />
      <Title>LOGO</Title>
      <LogoWrapper>
        <OSSUploader
          previewUrl={logo}
          previewHeight={70}
          previewWidth={70}
          onDelete={() => edit('', 'logo')}
          onUploadDone={(v) => edit(v, 'logo')}
        >
          <Logo />
        </OSSUploader>
      </LogoWrapper>
      <Desc>上传社区 Logo, 支持常见图片格式，200 KB以内。可选。</Desc>
      <Br bottom={30} />

      <SavingBar
        field={SETTING_FIELD.BASE_INFO}
        isTouched={isLogosTouched}
        loading={saving}
        top={30}
      />
    </Wrapper>
  )
}

export default observer(Logos)
