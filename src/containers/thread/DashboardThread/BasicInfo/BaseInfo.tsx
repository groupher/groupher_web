import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import { Br } from '@/widgets/Common'
import OSSUploader from '@/widgets/OSSUploader'

import type { TBaseInfoSettings, TTouched } from '../spec'
import { SETTING_FIELD } from '../constant'
import SavingBar from '../SavingBar'

import {
  Wrapper,
  Label,
  Inputer,
  FaviconWrapper,
  Favicon,
  LogoWrapper,
  Logo,
  Title,
  Desc,
  Hint,
} from '../styles/basic_info/base_info'
import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TBaseInfoSettings
  touched: TTouched
}

const BasicInfo: FC<TProps> = ({ testid = 'basic-info', settings, touched }) => {
  const { saving } = settings

  return (
    <Wrapper>
      <Title>favicon</Title>
      <FaviconWrapper>
        <OSSUploader>
          <Favicon />
        </OSSUploader>
      </FaviconWrapper>
      <Desc>上传 favicon, 仅支持 ico 格式，最大 10 KB。可选。</Desc>
      <Br bottom={30} />

      <Title>LOGO</Title>
      <LogoWrapper>
        <OSSUploader>
          <Logo />
        </OSSUploader>
      </LogoWrapper>
      <Desc>上传社区 Logo, 支持常见图片格式，200 KB以内。可选。</Desc>
      <Br bottom={30} />
      <Label>社区名称</Label>
      <Inputer value={settings.title} onChange={(v) => edit(v, 'title')} />

      <Label>官方主页</Label>
      <Inputer value={settings.homepage} onChange={(v) => edit(v, 'homepage')} />
      <Hint>您产品或服务的官方地址。</Hint>
      <Label>路径（slug）</Label>
      <Inputer value={settings.raw} onChange={(v) => edit(v, 'raw')} />
      <Hint>
        社区的 URL 地址段，填写后可通过 https://groupher.com/[slug] 或 https://[slug].groupher.com
        访问。
      </Hint>
      <Label>社区简介</Label>
      <Inputer behavior="textarea" value={settings.desc} onChange={(v) => edit(v, 'desc')} />

      <SavingBar
        field={SETTING_FIELD.BASE_INFO}
        isTouched={touched.baseInfo}
        loading={saving}
        top={30}
      />
    </Wrapper>
  )
}

export default memo(BasicInfo)
