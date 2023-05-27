/* *
 * TagSettingEditor
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'
import { ROUTE } from '@/constant/route'
import { DRAWER_SCROLLER } from '@/constant/dom'
import { COLORS } from '@/constant/colors'

import ColorSelector from '@/widgets/ColorSelector'

import { Br } from '@/widgets/Common'
import Select from '@/widgets/Select'
import CustomScroller from '@/widgets/CustomScroller'

import PostLayout from './PostLayout'
import Footer from './Footer'

import type { TStore } from './store'

import {
  Wrapper,
  BasicInfo,
  DotSelector,
  TitleDot,
  SelectorWrapper,
  Title,
  Desc,
  Navi,
  TitleInputer,
  Inputer,
} from './styles'
import { useInit, edit } from './logic'

// const log = buildLog('C:TagSettingEditor')

type TProps = {
  tagSettingEditor?: TStore
  testid: string
  mode?: 'create' | 'edit'
}

const TagSettingEditorContainer: FC<TProps> = ({
  tagSettingEditor: store,
  testid,
  mode = 'edit',
}) => {
  useInit(store, mode)

  const { editingTagData: editingTag, curCategory, categoryOptions, processing } = store

  console.log('## mode: ', mode)
  console.log('### editingTag: ', editingTag.color)

  return (
    <Wrapper testid={testid}>
      <CustomScroller
        instanceKey={DRAWER_SCROLLER}
        direction="vertical"
        height="calc(100vh - 200px)"
        barSize="small"
        showShadow={false}
        autoHide={false}
      >
        <Title>标签名称</Title>
        <BasicInfo>
          <ColorSelector
            activeColor={editingTag.color || COLORS.BLACK}
            onChange={(color) => edit(color, 'color')}
            placement="bottom-start"
            offset={[-8, 0]}
          >
            <DotSelector>
              <TitleDot color={editingTag?.color || COLORS.BLACK} />
            </DotSelector>
          </ColorSelector>

          <TitleInputer value={editingTag.title} onChange={(e) => edit(e.target.value, 'title')} />
        </BasicInfo>

        <Title>标签分组</Title>
        <Br bottom={5} />
        <SelectorWrapper>
          <Select
            value={curCategory}
            options={categoryOptions}
            placeholder="请选择标签所在分组"
            closeMenuOnSelect={false}
          />
        </SelectorWrapper>
        <Br bottom={25} />
        <Title>标签说明</Title>
        <Br bottom={5} />
        <Inputer
          value=""
          placeholder="标签说明, 支持 Markdown"
          behavior="textarea"
          onChange={(e) => console.log(e)}
        />
        <Br bottom={25} />
        <Title>标签布局</Title>
        <Desc>
          当选中该标签后，帖子列表将以此布局展示。所有标签默认的展示布局可在{' '}
          <Navi href={`/dashboard/home/${ROUTE.DASHBOARD.LAYOUT}`}>板块布局</Navi>
          中设置。{' '}
        </Desc>
        <Br bottom={20} />
        <PostLayout layout="upvote_first" />
      </CustomScroller>
      <Footer tag={editingTag} mode={mode} processing={processing} />
    </Wrapper>
  )
}

export default bond(TagSettingEditorContainer, 'tagSettingEditor') as FC<TProps>
