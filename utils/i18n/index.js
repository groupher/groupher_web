// this is tmp, use react-i18n .. later

const I18nDict = {
  community: '社区',
  posts: '帖子',
  post: '帖子',
  radar: '雷达',
  city: '同城',
  share: '分享',
  users: '用户',
  jobs: '工作',
  job: '工作',
  blog: '博客',
  works: '作品',
  user: '用户',
  profile: '主页',

  AD: '广告',
  FREEMIUM: '会员增值 / 订阅',
  FULLTIME: '全职项目',
  SIDE_PROJECT: '副业项目',
  PRODUCT: '物品交易',
  FREE: '用爱发电',
  OTHRES: '其他',

  // ArticleCat
  ALL: '全部',
  FEATURE: '功能建议',
  BUG: '问题反馈',
  QUESTION: '求助',
  OTHER: '其他',
  RESOLVE: '问题解决',
  // articleState;
  TODO: '待办项',
  WIP: '进行中',
  DONE: '已完成',
  REJECT_DUP: '重复问题',
  REJECT_NO_PLAN: '无计划',
  REJECT_NO_FIX: '不修复',
  REJECT_REPRO: '无法重现',
  REJECT_STALE: '陈帖归档',
}

export const Trans = (key) => I18nDict[key] || key

export const holder = 1
