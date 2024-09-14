import type { FC } from 'react'

import CitySelector from '~/widgets/CitySelector'
import Input from '~/widgets/Input'

import { SETTING_FIELD } from '../../constant'

import SavingBar from '../../SavingBar'

import useBaseInfo from '../../logic/useBaseInfo'
import useSalon, { cn } from '../../styles/basic_info/other_info'

import MediaEditor from './MediaEditor'

const OtherInfo: FC = () => {
  const { city, techstack, isTouched, isMediaReportsTouched, edit } = useBaseInfo()
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <div className={cn(s.label, '-ml-1.5')}>（团队）所在城市</div>
      <CitySelector value={city} onChange={(v) => edit(v, 'city')} top={15} />

      <div className="mt-5" />
      <div className={s.label}>技术栈</div>
      <Input className={s.input} value={techstack} onChange={(v) => edit(v, 'techstack')} />
      <p className={s.hint}>团队主要使用的开发或创作工具等，多项请用 , 隔开。</p>

      <div className="mt-5" />

      <SavingBar
        field={SETTING_FIELD.BASE_INFO}
        isTouched={isTouched}
        loading={false}
        top={30}
        left={-1}
      />

      <div className={s.divider} />

      <MediaEditor />

      <SavingBar
        field={SETTING_FIELD.MEDIA_REPORTS}
        isTouched={isMediaReportsTouched}
        loading={false}
        top={30}
        left={-1}
      />
    </div>
  )
}

export default OtherInfo
