import { FC, memo } from 'react'

import {
  PostIcon,
  PublishIcon,
  TabCommentsIcon,
} from '../styles/tabs/local_icon'

type TProps = {
  raw: string
  active: boolean
  small?: boolean
}

const TabIcon: FC<TProps> = ({ raw, active, small }) => {
  switch (raw) {
    case 'publish': {
      return <PublishIcon $active={active} $small={small} />
    }

    // case 'billing': {
    //   return <TabBillingIcon $active={active} $small={small} />
    // }

    case 'comments': {
      return <TabCommentsIcon $active={active} $small={small} />
    }

    // case THREAD.SETTING: {
    //   return <SettingIcon $active={active} $small={small} />
    // }

    default: {
      return <PostIcon $active={active} $small={small} />
    }
  }
}

export default memo(TabIcon)
