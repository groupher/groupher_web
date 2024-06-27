'use client'

import useIsSidebarLayout from '~/hooks/useIsSidebarLayout'

import PostThread from '~/containers//thread/PostThread'
import { Br } from '~/widgets/Common'

const CommunityPostPage = () => {
  const isSidebarLayout = useIsSidebarLayout()

  return (
    <>
      {isSidebarLayout && <Br top={20} />}
      <PostThread />
    </>
  )
}

export default CommunityPostPage
