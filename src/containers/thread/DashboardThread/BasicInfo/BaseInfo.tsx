import type { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { find } from 'ramda'

import type { TSelectOption } from '@/spec'
import { LANGS_OPTIONS } from '@/const/i18n'

import { Br } from '@/widgets/Common'
import Select from '@/widgets/Select'

import DangerZone from './DangerZone'

import { SETTING_FIELD } from '../constant'
import SavingBar from '../SavingBar'
import useBaseInfo from '../logic/useBaseInfo'

import { Wrapper, Label, Inputer, Hint } from '../styles/basic_info/base_info'

const BasicInfo: FC = () => {
  const { saving, locale, desc, title, slug, homepage, introduction, isTouched, edit } =
    useBaseInfo()

  const curLangOption = find((o) => o.value === locale, LANGS_OPTIONS)

  return (
    <Wrapper>
      <Label>默认语言</Label>
      <Select
        value={curLangOption}
        options={LANGS_OPTIONS}
        placeholder="社区默认语言"
        onChange={(option: TSelectOption) => edit(option.value, 'locale')}
        top={10}
        bottom={10}
        right={8}
      />
      <Hint>社区界面的默认语言</Hint>

      <Label>社区域名</Label>
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

      {/* avoid show savingbar when loading community info */}
      {title && (
        <SavingBar
          field={SETTING_FIELD.BASE_INFO}
          isTouched={isTouched}
          loading={saving}
          top={30}
        />
      )}

      <Br bottom={45} />
      <DangerZone />
    </Wrapper>
  )
}

export default observer(BasicInfo)
