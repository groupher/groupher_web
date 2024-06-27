import type { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { DASHBOARD_DOC_ROUTE } from '~/const/route'
import VIEW from '~/const/view'
import useViewingCommunity from '~/hooks/useViewingCommunity'

import Tabs from '~/widgets/Switcher/Tabs'

import TableView from './Table'
import TreeView from './Tree'
import Cover from './Cover'
import FAQ from './FAQ'

import { DOC_TABS } from '../../constant'
import useCMSInfo from '../../hooks/useCMSInfo'
import { Wrapper, TabsWrapper } from '../../styles/cms/docs'
import { edit } from '../../logic'

const Docs: FC = () => {
  const {
    pagedDocs,
    docTab,
    batchSelectedIDs,
    loading,
    faqSections,
    editingFAQ,
    editingFAQIndex,
    isFaqSectionsTouched,
  } = useCMSInfo()

  const router = useRouter()
  const curCommunity = useViewingCommunity()

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

            router.push(targetPath)
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
        <FAQ
          sections={faqSections}
          editingFAQIndex={editingFAQIndex}
          editingFAQ={editingFAQ}
          isTouched={isFaqSectionsTouched}
        />
      )}
    </Wrapper>
  )
}

export default observer(Docs)
