'use client'

import Link from 'next/link'

import PostContent from '@/containers/content/CommunityContent/PostContent'

const CommunityPage = () => {
  // const rootStore = useRootStore()

  // console.log('## in community render, ', data)

  return (
    <div>
      <div>
        <Link href="/test">go to test</Link>
      </div>

      <PostContent />
    </div>
  )
}

export default CommunityPage
