import type { TFeedProps } from './context'
import CursorFeed from './CursorFeed'
import OffsetFeed from './OffsetFeed'

/** Selects an implementation before registering hooks; each root owns a separate collection. */
export default function FeedProvider(props: TFeedProps) {
  return props.config.api === 'cursor' ? <CursorFeed {...props} /> : <OffsetFeed {...props} />
}
