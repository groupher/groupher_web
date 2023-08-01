import { FC } from 'react'
import Router from 'next/router'

import type { TID, TDashboardDocRoute, TPagedArticles, TFAQSection } from '@/spec'
import { DASHBOARD_DOC_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'
import useCurCommunity from '@/hooks/useCurCommunity'

import Tabs from '@/widgets/Switcher/Tabs'

import TableView from './Table'
import TreeView from './Tree'
import Cover from './Cover'
import FAQ from './FAQ'

import { DOC_TABS } from '../../constant'
import { Wrapper, TabsWrapper } from '../../styles/cms/docs'
import { edit } from '../../logic'

type TProps = {
  pagedDocs: TPagedArticles
  docTab: TDashboardDocRoute
  loading: boolean
  batchSelectedIDs: TID[]
  faqSections: TFAQSection[]
  editingFAQ: TFAQSection
  editingFAQIndex: number | null
}

const Docs: FC<TProps> = ({
  pagedDocs,
  docTab,
  batchSelectedIDs,
  loading,
  faqSections,
  editingFAQ,
  editingFAQIndex,
}) => {
  const curCommunity = useCurCommunity()

  return (
    <Wrapper>
      <TabsWrapper>
        <Tabs
          items={DOC_TABS}
          activeKey={docTab}
          onChange={(tab) => {
            edit(tab, 'docTab')

            const targetPath =
              tab === DASHBOARD_DOC_ROUTE.TABLE
                ? `/${curCommunity.slug}/dashboard/doc`
                : `/${curCommunity.slug}/dashboard/doc/${tab}`

            Router.push(targetPath)
          }}
          view={VIEW.DESKTOP}
          noAnimation
        />
      </TabsWrapper>

      {docTab === DASHBOARD_DOC_ROUTE.TREE && <TreeView pagedDocs={pagedDocs} />}
      {docTab === DASHBOARD_DOC_ROUTE.TABLE && (
        <TableView pagedDocs={pagedDocs} loading={loading} batchSelectedIDs={batchSelectedIDs} />
      )}
      {docTab === DASHBOARD_DOC_ROUTE.COVER && <Cover />}
      {docTab === DASHBOARD_DOC_ROUTE.FAQ && (
        <FAQ sections={faqSections} editingFAQIndex={editingFAQIndex} editingFAQ={editingFAQ} />
      )}
    </Wrapper>
  )
}

export default Docs
