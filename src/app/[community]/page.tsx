import Link from 'next/link'

// import useRootStore from '@/hooks/useRootStore'

const CommunityPage = async ({ params }) => {
  // const rootStore = useRootStore()

  // console.log('## in community render, ', data)

  return (
    <div>
      <br />
      <h1>{params.community}</h1>
      <div>
        <Link href="/test">go to test</Link>
      </div>

      <div>
        <Link href="/home">go to home</Link>
      </div>

      <div>
        <Link href="/home2">go to home2</Link>
      </div>
      {/* <h2>Community: {rootStore.wallpaperEditor.wallpaper}</h2> */}
      {/* <PostContent /> */}
    </div>
  )
}

export default CommunityPage
