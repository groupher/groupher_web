import { FC } from 'react'
import { observer } from 'mobx-react'

import { THREAD } from '@/constant/thread'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import {
  DiscussIcon,
  TadaIcon,
  KanbanIcon,
  GuideIcon,
  InfoIcon,
  ArrowIcon,
} from '../styles/tabs/local_icon'

type TProps = {
  slug: string
  active: boolean
  small?: boolean
}

const TabIcon: FC<TProps> = ({ slug, active, small }) => {
  const primaryColor = usePrimaryColor()

  switch (slug) {
    case THREAD.POST: {
      return <DiscussIcon $active={active} $small={small} primaryColor={primaryColor} />
    }

    case THREAD.KANBAN: {
      return <KanbanIcon $active={active} $small={small} primaryColor={primaryColor} />
    }

    case THREAD.DOC: {
      return <GuideIcon $active={active} $small={small} primaryColor={primaryColor} />
    }

    case THREAD.CHANGELOG: {
      return <TadaIcon $active={active} $small={small} primaryColor={primaryColor} />
    }

    case THREAD.ABOUT: {
      return <InfoIcon $active={active} $small={small} primaryColor={primaryColor} />
    }

    default: {
      return <ArrowIcon $active={active} $small={small} primaryColor={primaryColor} />
    }
  }
}

export default observer(TabIcon)
