import { COLOR_NAME } from '@/constant'

export const demoTags = [
  {
    title: 'Bug 修复',
    raw: 'fix',
    color: COLOR_NAME.GREEN,
  },
  {
    title: '新功能',
    raw: 'feature',
    color: COLOR_NAME.PURPLE,
  },
]

export const demoEmotion = {
  beerCount: 2,
  confusedCount: 0,
  downvoteCount: 0,
  heartCount: 0,
  latestBeerUsers: [
    {
      login: 'porter172',
      nickname: 'Immanuel172',
      bio: null,
      shortbio: null,
      avatar: null,
    },
    {
      login: 'cp_bot',
      nickname: 'botman',
      bio: null,
      shortbio: null,
      avatar: null,
    },
  ],
  latestConfusedUsers: [],
  latestDownvoteUsers: [],
  latestHeartUsers: [],
  latestPillUsers: [],
  length: 2,
  latestPopcornUsers: [],
  pillCount: 0,
  popcornCount: 0,
  viewerHasBeered: false,
  viewerHasConfuseded: false,
  viewerHasDownvoteed: false,
  viewerHasHearted: false,
  viewerHasPilled: false,
  viewerHasPopcorned: false,
}
