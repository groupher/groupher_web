/*
 * ArticleEditor
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TEditMode, TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import { buildLog } from '@/logger'

import RichEditor from '@/containers/editor/RichEditor'
import { Space } from '@/widgets/Common'
import ConditionSelector from '@/widgets/ConditionSelector'
import ArchiveAlert from '@/widgets/ArchiveAlert'
import NoticeBar from '@/widgets/NoticeBar'
import TagSelector from '@/widgets/TagSelector'

import ArticleCover from './ArticleCover'

import TitleInput from './TitleInput'
import Footer from './Footer'

import { useStore } from './store'
// import Settings from './Settings'
import { Wrapper, InnerWrapper, ContentWrapper, FuncRow } from './styles'

import {
  useInit,
  editOnChange,
  // changeCommunity,
  // onTagSelect,
  catOnChange,
} from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ArticleEditor')

type TProps = {
  metric?: TMetric
}

const ArticleEditor: FC<TProps> = ({ metric = METRIC.ARTICLE_EDITOR }) => {
  const store = useStore()
  useInit(store)
  const { activeCat, activeTagData } = store

  const { isArchived, archivedAt, mode, submitState, groupedTags, texts, editData, allowEdit } =
    store

  const { title, body } = editData

  const initEditor = mode === 'publish' || body !== '{}'

  return (
    <Wrapper>
      <InnerWrapper metric={metric}>
        <ContentWrapper>
          {!allowEdit && <NoticeBar type="notice" content="只有作者可以编辑本内容。" left={25} />}
          {isArchived && <ArchiveAlert date={archivedAt} top={12} bottom={20} left={25} />}

          <ArticleCover />

          <TitleInput title={title} placeholder={texts.holder.title} />

          <FuncRow>
            <TagSelector groupedTags={groupedTags} activeTag={activeTagData} />
            <Space left={20} />
            <ConditionSelector
              mode="category"
              title="分类"
              selected={false}
              active={activeCat}
              onSelect={catOnChange}
              right={20}
            />
          </FuncRow>

          {initEditor && (
            <RichEditor
              data={body}
              onChange={(v) => editOnChange(JSON.stringify(v), 'body')}
              placeholder={texts.holder.body}
            />
          )}
          <Footer mode={mode as TEditMode} editData={editData} submitState={submitState} />
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default observer(ArticleEditor)
