import { FC } from 'react'
import 'rsuite-table/dist/css/rsuite-table.css'

import { DASHBOARD_ROUTE } from '@/constant/route'

import type { TCMSContents, TTouched } from '../spec'
import GlobalTableStyle from '../styles/cms/global'
import { Wrapper } from '../styles/cms'

import Posts from './Posts'
import Communities from './Communities'
import Changelogs from './Changelogs'
import Docs from './Docs'

type TProps = {
  cmsContents: TCMSContents
  route: string
  touched: TTouched
}

const CMS: FC<TProps> = ({ route, cmsContents, touched }) => {
  const {
    pagedCommunities,
    pagedPosts,
    pagedDocs,
    docTab,
    pagedChangelogs,
    loading,
    batchSelectedIDs,
    faqSections,
    editingFAQ,
    editingFAQIndex,
  } = cmsContents

  let contents = null

  switch (route) {
    case DASHBOARD_ROUTE.COMMUNITIES: {
      contents = (
        <Communities
          pagedCommunities={pagedCommunities}
          batchSelectedIDs={batchSelectedIDs}
          loading={loading}
        />
      )
      break
    }
    case DASHBOARD_ROUTE.POST: {
      contents = (
        <Posts pagedPosts={pagedPosts} batchSelectedIDs={batchSelectedIDs} loading={loading} />
      )
      break
    }
    case DASHBOARD_ROUTE.CHANGELOG: {
      contents = (
        <Changelogs
          pagedChangelogs={pagedChangelogs}
          batchSelectedIDs={batchSelectedIDs}
          loading={loading}
        />
      )
      break
    }
    case DASHBOARD_ROUTE.DOC: {
      contents = (
        <Docs
          loading={loading}
          pagedDocs={pagedDocs}
          docTab={docTab}
          batchSelectedIDs={batchSelectedIDs}
          faqSections={faqSections}
          editingFAQ={editingFAQ}
          editingFAQIndex={editingFAQIndex}
          touched={touched}
        />
      )
      break
    }
    default:
      contents = <div>no such route</div>
      break
  }

  return (
    <Wrapper>
      {contents}
      <GlobalTableStyle />
    </Wrapper>
  )
}

export default CMS
