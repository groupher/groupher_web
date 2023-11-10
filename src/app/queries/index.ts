/**
 * for reault returned by urql, ref:
 * https://formidable.com/open-source/urql/docs/api/urql/#usequery
 * https://formidable.com/open-source/urql/docs/api/core/#operationresult
 */
import { useQuery } from '@urql/next'

import type { TCommunityRes, TSSRQueryOpt } from './spec'
import { P } from '@/schemas'

import { DEFAULT_OPTION, commonRes } from './helper'

export const useQueryCommunity = (slug: string, _opt: TSSRQueryOpt = {}): TCommunityRes => {
  const opt = { ...DEFAULT_OPTION, ..._opt }

  const [result] = useQuery({
    query: P.community,
    variables: {
      slug,
      userHasLogin: false,
    },
    pause: opt.skip,
  })

  return {
    ...commonRes(result),
    community: result.data.community,
  }
}

export const holder = 1
