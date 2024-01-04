import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { Br } from '@/widgets/Common'
import OSSUploader from '@/widgets/OSSUploader'

import { SETTING_FIELD } from '../constant'
import SavingBar from '../SavingBar'

import useBaseInfo from '../hooks/useBaseInfo'
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

const BasicInfo: FC = () => {
  const { saving, desc, title, slug, homepage, introduction, logo, isTouched } = useBaseInfo()

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
      <Label>子域名 (slug)</Label>
      <Inputer value={slug} onChange={(v) => edit(v, 'slug')} />
      <Hint>
        社区的 URL 地址段，填写后可通过 https://groupher.com/[slug] 或 https://[slug].groupher.com
        访问。
      </Hint>
      <Br bottom={10} />

      <Label>社区名称</Label>
      <Inputer value={title} onChange={(v) => edit(v, 'title')} />

      <Br bottom={10} />

      <Label>官方主页</Label>
      <Inputer value={homepage} onChange={(v) => edit(v, 'homepage')} />
      <Hint>您产品或服务的官方地址。</Hint>

      <Label>社区简介</Label>
      <Inputer placeholder="一句话简介" value={desc} onChange={(v) => edit(v, 'desc')} />
      <Br bottom={15} />

      <Label>关于社区</Label>
      <Inputer
        behavior="textarea"
        placeholder="支持 Markdown 语法"
        value={introduction}
        onChange={(v) => edit(v, 'introduction')}
      />

      <SavingBar field={SETTING_FIELD.BASE_INFO} isTouched={isTouched} loading={saving} top={30} />
    </Wrapper>
  )
}

export default observer(BasicInfo)
