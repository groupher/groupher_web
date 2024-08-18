import { type FC, memo } from 'react'
import { filter } from 'ramda'

import type { TArticle, TCommunity } from '~/spec'
import { HCN } from '~/const/name'

import MirrorHint from './MirrorHint'

import { Wrapper, HomeLogo, Icon, Name, JoinDesc } from './styles'

type TProps = {
  article: TArticle
  onFollow: () => void
  onUndoFollow: () => void
}

const ArticleBelongCommunity: FC<TProps> = ({ article }) => {
  const { originalCommunity: oc, communities } = article

  // @ts-ignore
  const mirrorCommunities = filter((c) => c.id !== oc.id, communities)
  const hasMirror = mirrorCommunities.length > 0

  return (
    <Wrapper>
      {oc.slug === HCN ? <HomeLogo /> : <Icon src={oc.logo} />}
      {hasMirror && <MirrorHint communities={mirrorCommunities as TCommunity[]} />}
      <Name href={`/${oc.slug}`} prefetch={false}>
        {oc.title}
      </Name>
      <JoinDesc>{oc.subscribersCount} 人加入</JoinDesc>
    </Wrapper>
  )
}

export default memo(ArticleBelongCommunity)
