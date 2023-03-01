import type { TFeatType } from './spec'

export const FEAT = {
  DISCUSS: {
    COLOR: '#ad86bf',
    HINT: 'Discuss',
  },

  KANBAN: {
    COLOR: '#6399ff',
    HINT: 'Roadmap',
  },

  CHANGELOG: {
    COLOR: '#ec6760',
    HINT: 'Changelog',
  },

  HELP: {
    COLOR: '#ce9f6f',
    HINT: 'HelpDesk',
  },
}

export const FEAT_TYPE = {
  CHANGELOG: 'CHANGELOG',
  DISCUSS: 'DISCUSS',
  HELP: 'HELP',
  KANBAN: 'KANBAN',
} as Record<TFeatType, TFeatType>
