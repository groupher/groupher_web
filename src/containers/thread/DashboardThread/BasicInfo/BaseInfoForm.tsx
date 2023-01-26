import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import { Br } from '@/widgets/Common'
import OSSUploader from '@/widgets/OSSUploader'
import SocialEditor from '@/widgets/SocialEditor'

import type { TBaseInfoSettings } from '../spec'
import SectionLabel from '../SectionLabel'

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
} from '../styles/basic_info/baseinfo_form'
import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TBaseInfoSettings
}

const BasicInfo: FC<TProps> = ({ testid = 'basic-info', settings }) => {
  return (
    <Wrapper>
      <SectionLabel title="基本信息" />
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
      <Label>社区 URL</Label>
      <Inputer value={settings.url} onChange={(v) => edit(v, 'url')} />
      <SocialEditor />

      <Br bottom={40} />
      <SectionLabel title="其它信息" />
      <Label>社交媒体</Label>
      <Inputer />
      <Label>城市</Label>
      <Inputer />
      <Label>技术栈</Label>
      <Inputer />
      <Label>媒体报道</Label>
      <Inputer />
    </Wrapper>
  )
}

export default memo(BasicInfo)
