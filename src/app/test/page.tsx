'use client'

import Link from 'next/link'

import useRootStore from '@/hooks/useRootStore'
// import { useStore, initRootStore } from '@/stores/init'

const TestPage = () => {
  console.log('## in test page')
  const rootStore = useRootStore()
  // const rootStore = initRootStore({})
  // const rootStore = useStore()

  // rootStore.mark({ wallpaperEditor: { wallpaper: 'orange' }, firstLoad: false })
  // setTimeout(() => {
  //   rootStore.mark({ wallpaperEditor: { wallpaper: 'orange' }, firstLoad: false })
  // })

  return (
    <div>
      <br />
      <h1>Test</h1>
      <div>
        <Link href="/home">go to home</Link>
      </div>
      <div>
        <Link href="/home2">go to home2</Link>
      </div>
      <h2>foot: {rootStore.activeDemo}</h2>
      {/* <h2>paper: {rootStore.wallpaperEditor.wallpaper}</h2> */}
    </div>
  )
}

export default TestPage
