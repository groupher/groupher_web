import { THREAD } from '~/const/thread'

import { mutationCacheEffect } from './cacheInvalidation'

describe('mutation cache effect mapping', () => {
  const article = { community: 'home', thread: THREAD.POST, innerId: '42' }

  it('does not immediately purge for high-frequency article interactions', () => {
    expect(
      mutationCacheEffect(
        'mutation QueryUpvotePost($article: ArticlePathInput!) { upvotePost(article: $article) { innerId } }',
        { article },
      ),
    ).toEqual({
      mode: 'none',
      operationName: 'QueryUpvotePost',
      tags: ['community[home]-thread[POST]-article[42]', 'community[home]-thread[POST]-articles'],
    })
  })

  it('does not immediately purge for high-frequency comment interactions', () => {
    expect(
      mutationCacheEffect(
        'mutation EmotionToComment($comment: CommentPathInput!) { emotionToComment(comment: $comment) { innerId } }',
        { comment: { article, innerId: '7' } },
      ),
    ).toMatchObject({ mode: 'none', operationName: 'EmotionToComment' })
  })

  it('immediately invalidates public comment content changes', () => {
    expect(
      mutationCacheEffect(
        'mutation CreateComment($comment: CommentPathInput!) { createComment(comment: $comment) { innerId } }',
        { comment: { article } },
      ),
    ).toEqual({
      mode: 'immediate',
      operationName: 'CreateComment',
      tags: [
        'community[home]-thread[POST]-article[42]',
        'community[home]-thread[POST]-articles',
        'community[home]-thread[POST]-article[42]-comments',
      ],
    })
  })

  it('ignores caller-provided tags and unknown operations', () => {
    expect(
      mutationCacheEffect('mutation Unknown { unknown }', { article, tag: 'community[other]' }),
    ).toBeNull()
  })

  it('invalidates the public post list after creating a post', () => {
    expect(
      mutationCacheEffect(
        'mutation CreatePost($community: String!) { createPost(community: $community) { innerId } }',
        { community: 'home' },
      ),
    ).toMatchObject({ mode: 'immediate', tags: ['community[home]-thread[POST]-articles'] })
  })

  it('maps document publishing to only the document list and tree tags', () => {
    expect(
      mutationCacheEffect(
        'mutation publishDocChanges($community: String!) { publishDocChanges(community: $community) { done } }',
        { community: 'home' },
      ),
    ).toMatchObject({
      mode: 'immediate',
      tags: ['community[home]-thread[DOC]-articles', 'community[home]-doc-tree'],
    })
  })

  it('maps dashboard and theme mutations to the community tag', () => {
    for (const operationName of [
      'UpdateDashboardSeo',
      'SaveCustomThemePreset',
      'DashboardAddModerator',
      'PublishWallpaper',
      'RestoreWallpaperSnapshot',
    ]) {
      expect(
        mutationCacheEffect(
          `mutation ${operationName}($community: String!) { result: update(community: $community) }`,
          { community: 'home' },
        ),
      ).toMatchObject({ mode: 'immediate', tags: ['community[home]'] })
    }
  })

  it('maps typed tag mutations to tag and article-list tags', () => {
    expect(
      mutationCacheEffect(
        'mutation DashboardCreateCommunityTag($community: String!, $thread: Thread!) { createCommunityTag(community: $community, thread: $thread) { id } }',
        { community: 'home', thread: THREAD.POST },
      ),
    ).toMatchObject({
      mode: 'immediate',
      tags: ['community[home]-thread[POST]-tags', 'community[home]-thread[POST]-articles'],
    })
  })

  it('falls back to the community tag when a tag mutation has no thread variable', () => {
    expect(
      mutationCacheEffect(
        'mutation DashboardUpdateCommunityTag($community: String!) { updateCommunityTag(community: $community) { id } }',
        { community: 'home' },
      ),
    ).toMatchObject({ mode: 'immediate', tags: ['community[home]'] })
  })

  it('reads community from nested dashboard press config input', () => {
    expect(
      mutationCacheEffect(
        'mutation UpdateDashboardPressConfig($input: UpdatePressConfigInput!) { updatePressConfig(input: $input) { config { revision } } }',
        { input: { community: 'home', feedEnabled: true } },
      ),
    ).toMatchObject({ mode: 'immediate', tags: ['community[home]'] })
  })
})
