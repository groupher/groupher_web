import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import { Br } from '@/widgets/Common'
import OSSUploader from '@/widgets/OSSUploader'

import type { TBaseInfoSettings } from '../spec'

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
} from '../styles/basic_info/base_info'
import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TBaseInfoSettings
}

const BasicInfo: FC<TProps> = ({ testid = 'basic-info', settings }) => {
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
      <Label>社区简介</Label>
      <Inputer value={settings.desc} onChange={(v) => edit(v, 'desc')} />
      <Label>官方主页</Label>
      <Inputer value={settings.homepage} onChange={(v) => edit(v, 'homepage')} />
      <Label>社区 URL</Label>
      <Inputer value={settings.url} onChange={(v) => edit(v, 'url')} />
    </Wrapper>
  )
}

export default memo(BasicInfo)
