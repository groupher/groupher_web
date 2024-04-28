/*
 * dark mode
 */
import { lighten, darken } from '@/utils/color'

const primaryColor = '#333333' // '#000000'
const bannerBg = '#222222' //  '#161616'
const contentBg = '#222222' // '#161616'
const contentBoxBg = '#222222' // '#161616'
const fontColor = primaryColor
const markdownFont = '#9eb8bd'
const border = '#3c3c3c' // '#282828'
const link = '#418ccc'

const actionText = '#7f8695'
const descText = '#7c7f82'
const threadTitle = '#dddddd'
const hoverBg = '#42424259' // with alpha
const hint = '#9d9999'
// const primaryMate = 'orange'

const night = {
  _meta: {
    category: 'night',
  },
  name: 'night',
  primary: primaryColor,
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
  landing: {
    greyBg: hoverBg,
  },
  font: fontColor,
  link,
  blackActive: '#3171DB',
  divider: border,
  alphaBg: hoverBg,
  alphaBg2: '#1c1c1cb8',
  hoverBg,
  hoverActive: '#3f3f3f',
  menuHoverBg: hoverBg,
  lineDivider: '#5a5a5ac9',
  savingBarBg: '#f7f7f7',
  hoverBorder: '#393939',
  hoverLinear: 'linear-gradient(315deg, rgb(104 104 104 / 0%) 0%, #2c2c2c 100%);',
  menuActive: '#e9e9e991',
  linkHover: lighten(link, 5),
  heightIcon: '#e48a3d',
  heightGradient: 'linear-gradient(90deg, rgb(243, 170, 0) 0%, rgb(228, 62, 41) 100%)',
  main: '#7DC0C5',
  bodyBg: contentBg,
  selectionBg: '#FFFEDE',
  textBadge: '#e2e2e287', // with alpha
  lightText: '#999999',
  hint,
  articleCardShadow: '0 2px 40px 0 rgb(62 62 62 / 27%))',
  articleCardHover: '#575757',
  dashboardBlockOpacity: 0.7,

  rainbow: {
    red: '#ca5f4d',
    redBg: '#7d3b363d',
    redSoft: 'linear-gradient(90deg, #7a37323d 0%, #46211e2b 100%)',

    orange: '#ce9f6f',
    orangeBg: '#4c3e37',
    orangeSoft: 'linear-gradient(90deg, #44352ead 0%, #382c27a1 100%)',

    brown: '#8d691e',
    brownBg: '#3a342b',
    brownSoft: 'linear-gradient(90deg, #45320569 0%, #3929024a 100%)',

    yellow: '#eddd85',
    yellowBg: '#a9a06a30',
    yellowSoft: 'linear-gradient(90deg, #635e184d 0%, #433e2330 100%)',

    green: '#699411',
    greenBg: '#8a97764a',
    greenSoft: 'linear-gradient(90deg, #636e534a 0%, #474e3c36 100%)',

    greenLight: '#37B784',
    greenLightBg: '#69735a4a',
    greenLightSoft: 'linear-gradient(90deg, #636e534a 0%, #474e3c36 100%)',

    cyan: '#24878C',
    cyanBg: '#2c3738',
    cyanSoft: 'linear-gradient(90deg, #2c3738 0%, #2c37386e 100%)',

    // naming, fix later
    cyanLight: '#00B5CC',
    cyanLightBg: '#39494b94',
    cyanLightSoft: '#39494b94',

    blue: '#0073E3',
    blueBg: '#76809654',
    blueSoft: 'linear-gradient(90deg, #505a7254 0%, #3a415038 100%)',

    purple: '#7d519e',
    purpleBg: '#7c618238',
    purpleSoft: 'linear-gradient(90deg, #86539147  0%, #58445d38 100%)',

    grey: '#106d8a',

    pink: '#b36976',
    pinkBg: '#73526159',
    pinkSoft: '#73526159',

    pinkLite: '#82606b',
    pinkBtnText: '#ded0d0',

    black: '#343333',
    blackRow: '#282828',
    blackBg: '#313131',
    blackSoft: '#313131',
  },
  grey: {
    rare: '#272727',
    middle: '#333333',
    hard: '#414141',
  },
  shadow: {
    md: 'rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;',
    lg: '',
    xl: '',
    xxl: 'rgb(21 21 21 / 48%) 0px 11px 24px;',
  },
  gradientBg: {
    purple: 'linear-gradient(-149deg,#373439d4 0%,rgb(86 70 99) 100%)',
    blue: 'linear-gradient(310deg,#303435 13%,rgb(49 84 121 / 83%) 100%)',
    green: 'linear-gradient(133deg,#343434 0%,rgb(58 83 63 / 80%) 100%)',
    orange: 'linear-gradient(244deg,#3d3d3d 0%,rgb(106 82 62 / 72%) 100%)',
    pink: 'linear-gradient(140deg,#fff5fb99 0%,rgb(255 231 230 / 84%) 100%)',
    black: 'linear-gradient(220deg,#fafafaba 0%,#ededede3 100%)',
    cyan: 'linear-gradient(310deg,#eafffe7a 13%,rgb(183 242 246 / 46%) 100%)',
    yellow: 'linear-gradient(53deg,#fffff37a 13%,rgb(255 244 140 / 25%) 100%)',
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
    info: descText,
    link,
    linkHover: 'orange',
    reactionTitle: '#7f979a',
    reactionHoverBg: '#f3f7f7',
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
    shadow: 'rgb(25 25 25) 0px 0px 50px 0px inset',
  },
  drawer: {
    title: threadTitle,
    mask: 'rgb(31 34 37 / 41%)',
    desc: descText,
    font: primaryColor,
    bg: '#252525',
    shadow: '-13px 1px 20px 11px rgb(0 0 0 / 9%)',
    shadowLite: '-5px 5px 20px 11px rgb(13 13 13 / 14%)',
    closerShadow: '-3px 12px 20px 0px rgb(32 29 29 / 83%)',
    border: '#363636',
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

    indentLine: '#E7E9ED',
    indentActive: '#B5BCCB',
  },
  editor: {
    title: '#7ea9ad',
    content: '#a6bebf',
    placeholder: '#B3CFD0',
    headerBg: '#F9FCFC',
    contentBg: '#F9FCFC',
    border: '#414141',
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
    border: '#414141',
    bg: '#2c2c2c',
    fg: 'white',
    ghost: '#9A9696',
    disabledFg: descText,
    hoverBg: lighten(primaryColor, 10),
    activeBg: darken(primaryColor, 5),
    clicked: primaryColor,
    ghostBorder: '#606060',
    upvoteBorder: '#5f5f5fb5',
    boxShadow: 'rgb(24 24 24 / 32%) -1px 1px 16px 2px',
  },
  navigator: {
    activeBottom: primaryColor,
    borderRight: darken(bannerBg, 5),
    hoverBg: '#eee',
  },
  popover: {
    bg: '#2e2e2ef0',
    borderColor: border,
    boxShadow: '-9px 7px 20px 9px rgb(24 24 24 / 44%)',
    activeBorder: '#70707094',
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
    mask: 'rgba(31, 34, 37, 0.55)',
    border: primaryColor,
    shadow: '-4px 5px 20px 5px rgb(21 21 21 / 47%)',
    innerSelectBg: '#e4eeed45',
    subPanel: '#1b1b1b',
    // subPanelShadow: 'drop-shadow(3px 3px 6px #EAE9E9)',
    subPanelShadow: 'none',
  },
  form: {
    inputBg: '#1f1f1f7a',
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
    bg: '#2c2c2c',
    border,
    title: '#afafaf',
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
    shadow: '0px 0px 4px 0px rgb(0 0 0 / 50%) inset',
    quoteShadow: '0px 0px 3px 0px rgb(0 0 0 / 30%) inset',
  },
  dashboard: {
    menuCat: '#c1c1c1',
    menuTitle: '#b7b7b7',
    blockActiveBg: '#2b2a2a7a',
  },
  toggle: {
    shadow: '0 0 20px 0px rgb(0 0 0 / 46%) inset',
    ball: '#ffffffb5',
  },
  hiddenPanel: 'linear-gradient(180deg, rgb(0 0 0 / 0%) 0%, rgb(35 35 35) 40%)',
}

export default night
