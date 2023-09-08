import { FC } from 'react'

import AddButton from '@/widgets/Buttons/AddButton'
import { SpaceGrow } from '@/widgets/Common'

import InputBox from './InputBox'

import type { TMediaReport } from '../../spec'
import { Wrapper, Label } from '../../styles/basic_info/other_info/media_editor'

const mediaReports = [
  {
    id: 0,
    favicon: 'https://cdn-static.sspai.com/favicon/sspai.ico',
    siteName: '少数派',
    title: '我在数字时代做了一个电子日历，让油画和照片可以被装进去 - 少数派',
    url: 'https://sspai.com/post/82704',
  },
  {
    id: 1,
    url: 'https://www.ifanr.com/1561465',
    favicon: 'https://images.ifanr.cn/wp-content/themes/ifanr-5.0-pc/static/images/favicon.ico',
    siteName: '爱范儿',
    title: '续航久到离谱，Sonos 这款音箱「吃了炫迈」？',
  },
]

const MediaEditor: FC = () => {
  return (
    <Wrapper>
      <Label>
        媒体报道
        <SpaceGrow />
        <AddButton top={2} dimWhenIdle>
          添加
        </AddButton>
      </Label>
      {/*  @ts-ignore */}
      {mediaReports.map((item: TMediaReport) => (
        <InputBox key={item.id} item={item} />
      ))}
    </Wrapper>
  )
}

export default MediaEditor
