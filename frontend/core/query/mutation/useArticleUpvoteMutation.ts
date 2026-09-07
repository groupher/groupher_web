'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import type { TArticle } from '~/spec'
import useAccount from '~/stores/account/hooks'
import { toast } from '~/ui/Toaster'

import { mutateArticleUpvote } from './article'

/** Binds article upvote intent directly to the rendering entity and current viewer. */
export default function useArticleUpvoteMutation(article: TArticle | null) {
  const queryClient = useQueryClient()
  const { user } = useAccount()
  const viewerScope = user?.login

  return useCallback(
    (viewerHasUpvoted: boolean): void => {
      if (!viewerScope || !article) return

      void mutateArticleUpvote(queryClient, article, viewerHasUpvoted, viewerScope).catch(() => {
        toast('操作失败，请重试', 'error')
      })
    },
    [article, queryClient, viewerScope],
  )
}
