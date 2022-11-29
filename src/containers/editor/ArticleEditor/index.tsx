/*
 * ArticleEditor
 */

import { FC } from 'react'

import type { TEditMode, TMetric } from '@/spec'
import { METRIC } from '@/constant'

import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import { Space } from '@/widgets/Common'
import ArchiveAlert from '@/widgets/ArchiveAlert'
import TagsList from '@/widgets/TagsList'
import NoticeBar from '@/widgets/NoticeBar'
import CatSelector from '@/widgets/CatSelector'

import CommunityTagSetter from '@/containers/tool/CommunityTagSetter'
import RichEditor from '@/containers/editor/RichEditor'

import type { TStore } from './store'

import TitleInput from './TitleInput'
import Footer from './Footer'

// import PublishRules from './PublishRules'
// import Settings from './Settings'
import { Wrapper, InnerWrapper, ContentWrapper, FuncRow } from './styles'
import { useInit, editOnChange, changeCommunity, onTagSelect } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ArticleEditor')

type TProps = {
  testid?: string
  articleEditor?: TStore
  metric?: TMetric
}

const ArticleEditorContainer: FC<TProps> = ({
  testid = 'article-editor',
  articleEditor: store,
  metric = METRIC.ARTICLE_EDITOR,
}) => {
  useInit(store)
  const {
    isArchived,
    archivedAt,
    mode,
    communityData,
    submitState,
    tagsData,
    texts,
    thread,
    editData,
    viewingArticle,
    allowEdit,
  } = store

  const { meta } = viewingArticle
  const { title, body } = editData

  const initEditor = mode === 'publish' || body !== '{}'

  return (
    <Wrapper testid={testid}>
      <InnerWrapper metric={metric}>
        {communityData.id && (
          <CommunityTagSetter
            selectedCommunity={communityData}
            onCommunitySelect={changeCommunity}
            onTagSelect={onTagSelect}
          />
        )}
        <ContentWrapper>
          {!allowEdit && (
            <NoticeBar
              type="notice"
              content="只有作者可以编辑本内容。"
              left={25}
            />
          )}

          {isArchived && (
            <ArchiveAlert date={archivedAt} top={12} bottom={20} left={25} />
          )}
          <TitleInput title={title} placeholder={texts.holder.title} />

          <FuncRow>
            <TagsList
              items={tagsData}
              size="medium"
              community={communityData}
              thread={thread}
              withSetter={mode === 'publish'}
            />
            <Space left={20} />

            <CatSelector onSelect={log} activeFilter={{}} mode="full" />
          </FuncRow>

          {initEditor && (
            <RichEditor
              data={body}
              onChange={(v) => editOnChange(JSON.stringify(v), 'body')}
              placeholder={texts.holder.body}
            />
          )}
          <Footer
            mode={mode as TEditMode}
            editData={editData}
            submitState={submitState}
          />
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default bond(ArticleEditorContainer, 'articleEditor') as FC<TProps>
