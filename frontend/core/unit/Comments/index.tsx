import type { ComponentProps } from 'react'

import Content from './Content'
import RootFeed from './pagination/RootFeed'

export default function Comments(props: ComponentProps<typeof Content>) {
  return (
    <RootFeed>
      <Content {...props} />
    </RootFeed>
  )
}
