/*
 *
 * ClassicSidebar
 * common sidebar include community badge, publisher, tagsbar ads .. etc,
 * used for classic layout
 *
 */

import { Fragment, lazy, Suspense } from 'react'

import useTrans from '~/hooks/useTrans'
import useLayout from '~/hooks/useLayout'
import useCommunityDigestViewport from '~/hooks/useCommunityDigestViewport'
import useViewingCommunity from '~/hooks/useViewingCommunity'
import useActiveTag from '~/hooks/useActiveTag'

import { refreshArticles, callGEditor, callSyncSelector, listUsers } from '~/signal'
import { mockUsers } from '~/mock'
import { BANNER_LAYOUT } from '~/const/layout'

import { Link, SpaceGrow, Br, SexyDivider } from '~/widgets/Common'
import ImgFallback from '~/widgets/ImgFallback'
import Sticky from '~/widgets/Sticky'
import GetMe from '~/widgets/GetMe'
import Img from '~/Img'
import LinkSVG from '~/icons/Link'

import PublishButton from '~/widgets/Buttons/PublishButton'
import TagsBar from '~/containers/unit/TagsBar'

import CommunityBrief from './CommunityBrief'
import useSalon from '../salon/thread_sidebar'

const UniBar = lazy(() => import('~/widgets/UniBar'))

export default () => {
  const { t } = useTrans()
  const curCommunity = useViewingCommunity()

  const { inView: showCommunityBadge } = useCommunityDigestViewport()
  const { bannerLayout } = useLayout()
  const activeTag = useActiveTag()

  const s = useSalon()

  return (
    <div className={`${s.wrapper}`} data-test-id="thread-sidebar">
      <Sticky offsetTop={0}>
        <Fragment>
          {showCommunityBadge && bannerLayout !== BANNER_LAYOUT.TABBER && (
            <Fragment>
              <h3 className={`${s.title}`}>{t('intro', 'titleCase')}</h3>
              <div className={s.desc}>{curCommunity.desc}</div>
              <div className={`${s.homeLinks}`}>
                <LinkSVG className={`${s.linkIcon}`} />
                <Link href="https://groupher.com" maxLength="150px">
                  {curCommunity.homepage}
                </Link>
                <SpaceGrow />

                <GetMe />
              </div>
            </Fragment>
          )}

          <div className={`${s.showArea}`}>
            {showCommunityBadge && (
              <Fragment>
                <h3 className={`${s.title}`}>{t('team.member', 'titleCase')}</h3>
                <Br top={14} />
              </Fragment>
            )}

            <div className={`${s.joiners}`}>
              {mockUsers(5).map((user) => (
                <Img
                  key={user.login}
                  className={`${s.joinAvatar}`}
                  src={user.avatar}
                  fallback={<ImgFallback size={24} right={8} user={user} />}
                />
              ))}
              <div className={`${s.moreNum}`} onClick={() => listUsers('drawer')}>
                +2
              </div>
            </div>
          </div>
        </Fragment>

        <div className={`${s.publish}`}>
          <PublishButton
            text="参与讨论"
            onMenuSelect={(cat) => {
              callGEditor()
              setTimeout(() => callSyncSelector({ cat, tag: activeTag }), 500)
            }}
            left={-2}
            offset={[0, 5]}
          />
        </div>

        <CommunityBrief />
        {!showCommunityBadge && <SexyDivider bottom={5} />}

        <div className={`${s.tagsBar}`}>
          <TagsBar onSelect={() => refreshArticles()} />
        </div>

        <Suspense fallback={null}>
          <UniBar />
        </Suspense>
      </Sticky>
    </div>
  )
}
