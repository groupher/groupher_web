import { FC } from 'react'
import { keys } from 'ramda'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'
import { sortByIndex, groupByKey } from '@/utils/helper'

import SocialEditor from '@/widgets/SocialEditor'

import BrandInfo from './BrandInfo'
import LinkEditor from './LinkEditor'

import type { TFooterSettings } from '../../spec'

import {
  Wrapper,
  Title,
  LeftWrapper,
  CenterWrapper,
  RightWrapper,
} from '../../styles/footer/editors/simple'
import { moveLinkUp, moveLinkDown, moveLink2Top, moveLink2Bottom } from '../../logic/links'

type TProps = {
  settings: TFooterSettings
}

const Simple: FC<TProps> = ({ settings }) => {
  const [parent] = useAutoAnimate({ duration: 220 })

  const { footerLinks: links, editingLink, editingLinkMode } = settings

  // @ts-ignore
  const groupedLinks = groupByKey(sortByIndex(links, 'groupIndex'), 'group')
  const groupKeys = keys(groupedLinks)

  return (
    <Wrapper>
      <LeftWrapper>
        <BrandInfo />
      </LeftWrapper>
      <CenterWrapper ref={parent}>
        <Title>链接</Title>
        {groupedLinks[groupKeys[0]].map((item: TLinkItem) => (
          <LinkEditor
            key={`${item.title}`}
            mode={editingLinkMode}
            linkItem={item}
            editingLink={editingLink}
            moveLinkUp={moveLinkUp}
            moveLinkDown={moveLinkDown}
            moveLink2Top={moveLink2Top}
            moveLink2Bottom={moveLink2Bottom}
          />
        ))}
      </CenterWrapper>
      <RightWrapper>
        <Title>社交媒体</Title>
        <SocialEditor width="200px" withTitle={false} top={12} left={-5} />
      </RightWrapper>
    </Wrapper>
  )
}

export default Simple
