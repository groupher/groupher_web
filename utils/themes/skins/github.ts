/*
 * a theme inspired by github
 */
import { lighten, darken } from '@/utils/color'

const primaryColor = '#3b434a' // '#000000'

const bannerBg = '#fff'
const contentBg = '#fff'
const contentBoxBg = '#fff'
const fontColor = primaryColor
const markdownFont = '#9eb8bd'
const border = '#EAE9E9'
const link = '#005196' // '#6494cd'

const actionText = '#647392'
const descText = '#666'
const threadTitle = '#333333'
const hoverBg = '#f9f9f9'
// const primaryMate = 'orange'

const github = {
  _meta: {
    category: 'light',
  },
  name: 'github',
  logoText: descText,
  cover: 'white',
  coverIndex: '#F9FCFC',
  contrastFg: '#eca014',
  htmlBg: bannerBg,
  spaceBg: '#fff',
  mobileTab: '#323344',
  loading: {
    basic: '#E0E0E0',
    animate: contentBg,
  },
  error: {
    title: primaryColor,
    desc: darken(primaryColor, 10),
    bg: lighten(contentBoxBg, 2),
  },

  font: fontColor,
  link,
  divider: border,
  hoverBg,
  menuActive: '#f3f3f3',
  linkHover: lighten(link, 5),
  heightIcon: '#e48a3d',
  heightGradient: 'linear-gradient(90deg, rgb(243, 170, 0) 0%, rgb(228, 62, 41) 100%)',
  main: '#7DC0C5',
  bodyBg: contentBg,
  selectionBg: '#FFFEDE',
  textBadge: '#f6f6f6',
  lightText: '#999999',

  gtdBadge: {
    feat: '#3871e0',
    featBg: '#e9f0ff',
    bug: '#eb6a6a',
    bugBg: '#ffefef',
  },

  baseColor: {
    red: '#ca5f4d',
    redBg: '#FDF1F0',

    orange: '#ad735c',
    orangeBg: '#FEF7E8',

    // naming, fix later
    cyanLight: '#00B5CC',
    cyanLightBg: '#e1fcff',

    brown: '#8d691e',
    brownBg: '#fff3df',

    yellow: '#B0BA6C',
    yellowBg: '#FEFBE8',

    green: '#699411',
    greenBg: '#f3fee3',

    greenLight: '#37B784',
    greenLightBg: '#f3fee3',

    cyan: '#24878C',
    cyanBg: '#EBFEFB',

    blue: '#456fbd',
    blueBg: '#E9F6FE',

    purple: '#7d519e',
    purpleBg: '#F7F0FE',

    grey: '#106d8a',

    pink: '#b36976',
    pinkBg: '#FCF1F6',

    pinkLite: '#82606b',
    pinkBtnText: '#ded0d0',

    black: '#333333',
    blackBg: '#f4f4f4',
  },
  header: {
    fg: '#8c8c8c',
    bg: bannerBg,
    spliter: '#efefef',
    fixed: contentBoxBg,
    tabActive: '#EB6224', // articleTitle
    tabOthers: lighten('#849ca0', 10),
    cardBg: '#ffffff',
    cardBorder: '#e6e6e6',
    cardLogoText: 'lightgrey',
    cardTitle: 'darkgrey',
  },
  banner: {
    title: threadTitle,
    bg: bannerBg,
    desc: descText,
    spliter: '#eae9e9',
    numberDesc: '#cccccc',
    number: '#949494',
    active: '#669ede',
    numberDivider: '#eae9e9',
    numberHoverBg: '#f3f3f3',
  },
  article: {
    title: threadTitle,
    digest: descText,
    info: actionText,
    link,
    linkHover: 'orange',
    reactionTitle: '#7f979a',
    reactionHoverBg: '#f3f7f7',
  },
  thread: {
    bg: contentBoxBg,
    articleDivider: '#dce5e6',
    commentsUserBorder: contentBoxBg,
    articleSpliter: '#dee8ea',
  },
  content: {
    bg: contentBoxBg,
    border: '#EEEEEE',
    cardBg: contentBoxBg,
    cardBorder: '#e6e6e6',
    cardBorderHover: primaryColor,
  },
  footer: {
    text: descText,
    hover: '#949CB5',
    title: '#77706B',
    bottomBg: '#252325',
  },
  drawer: {
    title: threadTitle,
    mask: 'rgba(31, 34, 37, 0.15)',
    desc: descText,
    font: primaryColor,
    bg: contentBg,
    shadow: '-5px -1px 20px 0px rgb(143 143 143 / 27%)',
    shadowLite: '-1px 3px 20px 0px rgb(143 143 143 / 27%)',
    closerShadow: '-7px 4px 20px 0px rgb(143 143 143 / 27%)',
    markdownHelperBg: '#F9FCFC',
    accountBg: '#FFFFFF',
    articleBg: '#FFFFFF',
    helper: '#d9e5e6',
    helperHover: '#83a2a5',
    topLine: '#22292E',
    icon: 'tomato',
    divider: '#e0e6e5',
    /* single article page sidebar divider */
    sideDivider: '#e4e4e4',
  },
  comment: {
    bg: contentBg,
    icon: 'grey',
    didIcon: 'orange',
    title: 'grey',
    username: '#7FA7AC',
    number: '#efbc60',
    floor: '#8590a6',
    reply: '#93b3b5',
    replyBg: '#f3f3f3',
    placeholder: '#8c94a3',
    filter: 'grey',
    filterActive: primaryColor,
    action: actionText,
    // mention text displayed in article
    mentionText: '#91a4b5',
    mentionTextBg: '#fcffdb',
    // mention popover background
    mentionBg: '#F9FCFC',
    mentionBorder: primaryColor,
    mentionActiveBg: darken('#F9FCFC', 10),
    mentionShadow: '0px 2px 10px 1px rgba(235, 235, 235, 1)',

    indentLine: '#d5d5d5',
    indentActive: '#8590a6',
  },
  editor: {
    title: '#7ea9ad',
    content: '#a6bebf',
    placeholder: '#B3CFD0',
    headerBg: '#F9FCFC',
    contentBg: '#F9FCFC',
    border: '#D6D6D6',
    borderActive: descText,
    borderNormal: '#e2eaea',
    footer: '#a6bebf',
    footerHover: darken('#a6bebf', 5),
  },

  markdown: {
    title: primaryColor,
    fg: markdownFont,
    titleBottom: lighten(primaryColor, 30),
    hrColor: '#154452',
    blockquoteBorder: '#b8d0ce',
    blockquoteFg: darken(markdownFont, 10),
    strongFg: '#7c999c',
    strongBg: contentBoxBg,
    link,
    tableBg: darken(contentBoxBg, 5),
    tableBg2n: darken(contentBoxBg, 5),
    tableborder: `1px solid ${darken(contentBoxBg, 10)}`,
    taskDone: '#528416',
    taskPeding: darken(contentBoxBg, 10),
    br: '#e8e8e8',
  },
  code: {
    bg: darken(contentBoxBg, 5),
  },
  shell: {
    link,
    searchInput: descText,
    searchIcon: lighten(descText, 10),
    barBg: contentBoxBg,
    border: '#f3f3f3',
    title: threadTitle,
    desc: descText,
    activeBg: '#F5F5F5',
  },
  button: {
    primary: primaryColor,
    fg: '#e7e7e7',
    disabledFg: descText,
    hoverBg: lighten(primaryColor, 10),
    activeBg: darken(primaryColor, 5),
    clicked: primaryColor,
    ghostBorder: '#d5d5d5',
  },
  navigator: {
    activeBottom: primaryColor,
    borderRight: darken(bannerBg, 5),
    hoverBg: '#eee',
  },
  popover: {
    bg: '#ffffffe6',
    borderColor: '#e9e9ea',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
  },
  tags: {
    dotOpacity: 0.7,
    text: descText,
  },
  tagger: {
    text: '#d2a05f',
    bg: '#fff2b3',
    border: '#fff2b3',
    closeBtn: '#d2a05f',
  },
  tabs: {
    headerActive: '#EB6224',
    header: '#b5b5b5',
    contentBg: '#FFFFFF',
    headerBg: '#F7F9F9',
    headerActiveTop: primaryColor,
    border: '#E8E8E8',
    bottomLine: '#E1E4E8',
  },
  modal: {
    bg: contentBoxBg,
    mask: 'rgba(31, 34, 37, 0.1)',
    border: primaryColor,
    innerSelectBg: '#e4eeed45',
    subPanel: '#F5F5F5',
    // subPanelShadow: 'drop-shadow(3px 3px 6px #EAE9E9)',
    subPanelShadow: 'none',
  },
  form: {
    inputBg: '#FFFFFF',
    text: '#88a4ad',
    label: '#88a4ad',
    border: '#B8C6C0',
    shadow: 'rgba(184, 198, 192, 0.3)',
  },
  a: {
    hover: primaryColor,
    active: darken(primaryColor, 10),
  },
  toast: {
    bg: contentBoxBg,
    border,
    message: descText,
    title: threadTitle,
    infoBar: '#E8F0FE',
    errorBar: '#f59381',
    successBar: '#9dd035',
    warnBar: '#f5a30e',
    boxShadow: '-3px 5px 20px 0px rgb(155 155 155 / 20%)',
  },
  mailBox: {
    headHightBg: '#e8f9f8',
  },
  table: {
    headerBg: '#F8F8F8',
    headTitle: '#949494',
    text: '#949497',
    border: '#F0F0F0',
    hoverBg: '#FAFBFC',
  },
  searchHighlight: {
    doramonFg: '#03a9f4',
    doramonBg: 'transparent',
  },
  avatar: {
    opacity: 1,
    quote: '#217470',
    fallbackBg: hoverBg,
    shadow: '0px 0px 4px 0px rgb(0 0 0 / 50%) inset',
    quoteShadow: '0px 0px 3px 0px rgb(0 0 0 / 30%) inset',
  },
}

export default github
