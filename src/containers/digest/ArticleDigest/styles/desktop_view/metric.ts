import type { TMetric, TThread, TFlexRule } from '@/spec'
import METRIC from '@/constant/metric'

export const getDigestHeight = (metric: TMetric): string => {
  switch (metric) {
    default: {
      return '252px'
    }
  }
}

/**
 * for fixedheader sticker margin-left offset
 */
export const getFixStickerOffset = (metric: TMetric): string => {
  switch (metric) {
    default: {
      return '0'
    }
  }
}

export const getFixStickerAlign = (thread: TThread): TFlexRule => {
  switch (thread) {
    default: {
      return 'justify-center'
    }
  }
}
