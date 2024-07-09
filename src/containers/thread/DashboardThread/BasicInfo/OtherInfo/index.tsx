import type { FC } from 'react'

import CitySelector from '~/widgets/CitySelector'
import { Br, SexyDivider } from '~/widgets/Common'

import { SETTING_FIELD } from '../../constant'

import SavingBar from '../../SavingBar'

import useBaseInfo from '../../logic/useBaseInfo'
import { Wrapper, Label, Inputer, Desc } from '../../styles/basic_info/other_info'

import MediaEditor from './MediaEditor'

const OtherInfo: FC = () => {
  const { city, techstack, isTouched, isMediaReportsTouched, edit } = useBaseInfo()

  return (
    <Wrapper>
      <Label left={-6}>（团队）所在城市</Label>
      <CitySelector value={city} onChange={(v) => edit(v, 'city')} top={15} />

      <Br top={20} />
      <Label>技术栈</Label>
      <Inputer value={techstack} onChange={(v) => edit(v, 'techstack')} />
      <Desc>团队主要使用的开发或创作工具等，多项请用 , 隔开。</Desc>

      <Br top={22} />

      <SavingBar
        field={SETTING_FIELD.BASE_INFO}
        isTouched={isTouched}
        loading={false}
        top={30}
        left={-1}
      />

      <SexyDivider top={30} bottom={30} />

      <MediaEditor />

      <SavingBar
        field={SETTING_FIELD.MEDIA_REPORTS}
        isTouched={isMediaReportsTouched}
        loading={false}
        top={30}
        left={-1}
      />
    </Wrapper>
  )
}

export default OtherInfo
