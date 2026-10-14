import { useNavigate } from '@tanstack/react-router'

import useNaviArticle from '~/hooks/useNaviArticle'
import ArrowSVG from '~/icons/ArrowSimple'
import useCommunity from '~/stores/community/hooks'
import { thread2Path } from '~/utils/thread'

import useSalon, { cn } from './salon/article_navi'

export default function ArticleNavi() {
  const s = useSalon()
  const navigate = useNavigate()
  const { slug } = useCommunity()

  const articleNavi = useNaviArticle()
  const previous = articleNavi?.previous
  const next = articleNavi?.next
  const previousHref =
    previous?.meta?.thread && previous.innerId
      ? `/${slug}/${thread2Path(previous.meta.thread)}/${previous.innerId}`
      : null
  const nextHref =
    next?.meta?.thread && next.innerId
      ? `/${slug}/${thread2Path(next.meta.thread)}/${next.innerId}`
      : null

  return (
    <div className={s.wrapper}>
      {previousHref && (
        <button
          type='button'
          className={cn(s.switchBlock, s.upBlock)}
          onClick={() =>
            void navigate({
              to: previousHref,
              resetScroll: false,
            } as never)
          }
        >
          <ArrowSVG className={s.upArrow} />
          {/* <div className={cn(s.indexWrapper)}>
            <div className={s.upIndex}>上一篇</div>
          </div> */}
        </button>
      )}
      {nextHref && (
        <button
          type='button'
          className={cn(s.switchBlock, s.downBlock)}
          onClick={() =>
            void navigate({
              to: nextHref,
              resetScroll: false,
            } as never)
          }
        >
          <ArrowSVG className={s.downArrow} />
          {/* <div className={cn(s.indexWrapper)}>
            <div className={s.downIndex}>下一篇</div>
          </div> */}
        </button>
      )}
    </div>
  )
}
