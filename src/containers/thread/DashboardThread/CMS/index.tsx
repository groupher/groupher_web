import { FC } from 'react'
import 'rsuite-table/dist/css/rsuite-table.css'

import { DASHBOARD_ROUTE } from '@/constant/route'

import type { TCMSContents } from '../spec'
import GlobalTableStyle from '../styles/cms/global'
import { Wrapper } from '../styles/cms'
import Posts from './Posts'

type TProps = {
  cmsContents: TCMSContents
  route: string
}

const CMS: FC<TProps> = ({ route, cmsContents }) => {
  const { pagedPosts, loading } = cmsContents

  let contents = null

  switch (route) {
    case DASHBOARD_ROUTE.POST: {
      contents = <Posts pagedPosts={pagedPosts} loading={loading} />
      break
    }
    default:
      contents = <Posts pagedPosts={pagedPosts} loading={loading} />
      break
  }

  return (
    <Wrapper>
      <GlobalTableStyle />
      {contents}
    </Wrapper>
  )
}

export default CMS
