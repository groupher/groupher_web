import type { TFeatType } from './spec'

export const FEAT = {
  DISCUSS: {
    COLOR: '#ad86bf',
  },

  KANBAN: {
    COLOR: '#5187ef',
  },

  CHANGELOG: {
    COLOR: '#ec6760',
  },

  HELP: {
    COLOR: '#50A1A2',
  },
}

export const FEAT_TYPE = {
  CHANGELOG: 'CHANGELOG',
  DISCUSS: 'DISCUSS',
  HELP: 'HELP',
  KANBAN: 'KANBAN',
} as Record<TFeatType, TFeatType>
