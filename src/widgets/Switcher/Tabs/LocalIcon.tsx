import type { FC } from 'react'

import { THREAD } from '@/const/thread'
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
      return <DiscussIcon $active={active} $small={small} $color={primaryColor} />
    }

    case THREAD.KANBAN: {
      return <KanbanIcon $active={active} $small={small} $color={primaryColor} />
    }

    case THREAD.DOC: {
      return <GuideIcon $active={active} $small={small} $color={primaryColor} />
    }

    case THREAD.CHANGELOG: {
      return <TadaIcon $active={active} $small={small} $color={primaryColor} />
    }

    case THREAD.ABOUT: {
      return <InfoIcon $active={active} $small={small} $color={primaryColor} />
    }

    default: {
      return <ArrowIcon $active={active} $small={small} $color={primaryColor} />
    }
  }
}

export default TabIcon
