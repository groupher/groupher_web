import { ICON_BASE } from '@/config'

import type { TCommunitySetterStyle } from '@/spec'
import type { TTagView, TCommunityView, TType } from './spec'

export const TYPE = {
  MOVE_COMMUNITY: 'move-community' as TType,
  MIRROR_COMMUNITY: 'mirror-community' as TType,
  UNMIRROR_COMMUNITY: 'unmirror-community' as TType,
  SELECT_COMMUNITY: 'select-community' as TType,
  TAG: 'tag' as TType,
}

export const TAG_VIEW = {
  SELECT: 'select' as TTagView,
  UPDATE: 'update' as TTagView,
  DELETE: 'delete' as TTagView,
  CREATE_ITEM: 'create-item' as TTagView,
  UPDATE_ITEM: 'update-item' as TTagView,
}

export const COMMUNITY_VIEW = {
  SEARCHING: 'searching' as TCommunityView,
  SEARCH_ERROR: 'search-error' as TCommunityView,
  RESULT: 'result' as TCommunityView,
  DEFAULT: 'default' as TCommunityView,
}

export const COMMUNITY_STYLE = {
  NORMAL: 'normal' as TCommunitySetterStyle,
  LANG: 'lang' as TCommunitySetterStyle,
  FRAMEWORK: 'framework' as TCommunitySetterStyle,
  DATABASE: 'database' as TCommunitySetterStyle,
  DEVOPS: 'devOps' as TCommunitySetterStyle,
  DESIGN: 'design' as TCommunitySetterStyle,
}

export const COMMON_COMMUNITIES = {
  LANG: [
    {
      title: 'JavaScript',
      logo: `${ICON_BASE}/pl/javascript.png`,
      slug: 'javascript',
    },
    {
      title: 'TypeScript',
      logo: `${ICON_BASE}/pl/typescript.png`,
      slug: 'typescript',
    },
    {
      title: 'Java',
      logo: `${ICON_BASE}/pl/java.png`,
      slug: 'java',
    },
    {
      title: 'PHP',
      logo: `${ICON_BASE}/pl/php.png`,
      slug: 'php',
    },
    {
      title: 'Go',
      logo: `${ICON_BASE}/pl/go.png`,
      slug: 'go',
    },
    {
      title: 'Python',
      logo: `${ICON_BASE}/pl/python.png`,
      slug: 'python',
    },
    {
      title: 'Ruby',
      logo: `${ICON_BASE}/pl/ruby.png`,
      slug: 'ruby',
    },
    {
      title: 'Swift',
      logo: `${ICON_BASE}/pl/swift.png`,
      slug: 'swift',
    },
    {
      title: 'Rust',
      logo: `${ICON_BASE}/pl/rust.png`,
      slug: 'rust',
    },
    {
      title: 'Elixir',
      logo: `${ICON_BASE}/pl/elixir.png`,
      slug: 'elixir',
    },
  ],
  FRAMEWORK: [
    {
      title: 'React',
      logo: `${ICON_BASE}/framework/react.png`,
      slug: 'react',
    },
    {
      title: 'Vue',
      logo: `${ICON_BASE}/framework/vue.png`,
      slug: 'vue',
    },
    {
      title: 'Electron',
      logo: `${ICON_BASE}/framework/electron.png`,
      slug: 'electron',
    },
    {
      title: 'Django',
      logo: `${ICON_BASE}/framework/django.png`,
      slug: 'django',
    },
    {
      title: 'Rails',
      logo: `${ICON_BASE}/framework/rails.png`,
      slug: 'rails',
    },
    {
      title: 'Laravel',
      logo: `${ICON_BASE}/framework/laravel.png`,
      slug: 'laravel',
    },
  ],
  DATABASE: [
    {
      title: 'MySQL',
      logo: `${ICON_BASE}/database/mysql.png`,
      slug: 'mysql',
    },
    {
      title: 'PostgreSQL',
      logo: `${ICON_BASE}/database/postgresql.png`,
      slug: 'postgresql',
    },
    {
      title: 'Redis',
      logo: `${ICON_BASE}/database/redis.png`,
      slug: 'redis',
    },
    {
      title: 'MongoDB',
      logo: `${ICON_BASE}/database/mongodb.png`,
      slug: 'mongodb',
    },
    {
      title: 'SQL-Server',
      logo: `${ICON_BASE}/database/sql-server.png`,
      slug: 'sql-server',
    },
  ],
}
