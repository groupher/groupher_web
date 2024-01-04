/*
 * light mode
 */
import { lighten, darken } from '@/utils/color'

const primaryColor = '#333333' // '#000000'
const bannerBg = '#fff'
const contentBg = '#fff'
const contentBoxBg = '#fff'
const fontColor = primaryColor
const markdownFont = '#9eb8bd'
const border = '#EAE9E9'
const link = '#0075d9' // '#256eab' // '#005196' // '#6494cd'

const actionText = '#647392'
const descText = '#666'
const threadTitle = '#333333'
const hoverBg = '#efefef78' // '#efefef9c' // with alpha
const hint = '#9d9999'

const day = {
  _meta: {
    category: 'light',
  },
  name: 'day',
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
    greyBg: '#fbfbfb',
  },
  font: fontColor,
  link,
  blackActive: '#3171DB',
  divider: border,
  alphaBg: '#ffffff95',
  alphaBg2: '#fffffff2',
  hoverBg,
  hoverActive: 'white',
  menuHoverBg: 'white',
  lineDivider: '#acacacc9',
  hoverBorder: hoverBg,
  hoverLinear: 'linear-gradient(315deg, rgba(255, 255, 255, 0) 0%, #fafafa 100%)',
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
  articleCardShadow: '0 2px 40px 0 rgb(224 226 228 / 27%)',
  articleCardHover: '#c1c1c1',
  dashboardBlockOpacity: 0.65,

  rainbow: {
    red: '#ca5f4d',
    redBg: '#ffbfba3d',
    redSoft: 'linear-gradient(90deg, #fec0bb33 0%, #f8e4e226 100%)',

    orange: 'orange',
    orangeBg: '#FEF7E8',
    orangeSoft: 'linear-gradient(90deg, #fcb32d26 0%, #f5dfb726 100%)',

    brown: '#8d691e',
    brownBg: '#fff3df',
    brownSoft: 'linear-gradient(90deg, #cf806921 0%, #dbd0d01c 100%)',

    yellow: '#c7b96d',
    yellowBg: '#FEFBE8',
    yellowSoft: 'linear-gradient(90deg, #fffde5 0%, rgb(255 252 241 / 37%) 100%)',

    green: '#699411',
    greenBg: '#eefdd89c',
    greenSoft: 'linear-gradient(90deg, #e3f3cc4a 0%, #f2ffe05c 100%)',

    greenLight: '#79d08f',
    greenLightBg: '#e3f3cc4a',
    greenLightSoft: 'linear-gradient(90deg, #e3f3cc4a 0%, #f2ffe05c 100%)',

    cyan: '#24878C',
    cyanBg: '#e1fcff',
    cyanSoft: 'linear-gradient(90deg, #e1fcff94 0%, #e1fcff5e 100%)',

    // naming, fix later
    cyanLight: '#00B5CC',
    cyanLightBg: '#e1fcff94',
    cyanLightSoft: '#e1fcff94',

    blue: '#5073C6',
    blueBg: '#E7EDF7',
    blueSoft: 'linear-gradient(90deg, #f3f7ff 0%, #f5f8ffb5 100%);',

    purple: '#7d519e',
    purpleBg: '#f7d8fd38',
    purpleSoft: 'linear-gradient(90deg, #f7d8fd38 0%, #f5e5f838 100%)',

    grey: '#106d8a',

    pink: '#b36976',
    pinkBg: '#ffd8ea59',
    pinkSoft: '#ffd8ea59',

    pinkLite: '#82606b',
    pinkBtnText: '#ded0d0',

    black: '#333333',
    blackRow: '#333333',
    blackBg: '#f4f4f4',
    blackSoft: '#f4f4f4',
  },
  grey: {
    rare: '#fafafa',
    middle: '#F1F3F4',
    hard: '#F1F3F4',
  },
  shadow: {
    md: 'rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;',
    lg: '',
    xl: '',
    xxl: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  },
  // inspired by https://endless.design/
  gradientBg: {
    purple: 'linear-gradient(152deg,#faf5ff9c 0%,rgb(222 198 243) 100%)',
    blue: 'linear-gradient(310deg,#f6f3ff54 13%,rgb(209 237 255 / 83%) 100%)',
    green: 'linear-gradient(28deg,#fffbf6 0%,rgb(216 240 221 / 80%) 100%)',
    orange: 'linear-gradient(244deg,#fffcf75e 0%,rgb(255 234 217 / 72%) 100%)',
    pink: 'linear-gradient(224deg,#fde4ff24 0%,rgb(255 223 234 / 79%) 100%)',
    black: 'linear-gradient(25deg,#fafafaba 20%,#bdccce63 100%)',
    cyan: 'linear-gradient(213deg,#fffff3ba 13%,#aff5ffc2 100%)',
    yellow: 'linear-gradient(150deg,#ffe5e529 20%,rgb(255 251 216 / 58%) 100%)',
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
    shadow: 'rgb(241 241 241) 0px 0px 50px 0px inset',
  },
  drawer: {
    title: threadTitle,
    mask: 'rgba(31, 34, 37, 0.15)',
    desc: descText,
    font: primaryColor,
    bg: contentBg,
    shadow: '-8px 8px 20px 11px rgb(143 143 143 / 2%)',
    shadowLite: '-8px 8px 20px 11px rgb(143 143 143 / 2%)',
    closerShadow: '-7px 4px 20px 0px rgb(143 143 143 / 2%)',
    border: 'transparent',
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
    bg: primaryColor,
    fg: 'white',
    ghost: primaryColor,
    border: primaryColor,
    disabledFg: descText,
    hoverBg: lighten(primaryColor, 10),
    activeBg: darken(primaryColor, 5),
    clicked: primaryColor,
    ghostBorder: hint,
    upvoteBorder: '#c5c5c5b0',
    boxShadow: 'rgb(202 202 202 / 10%) -1px 1px 16px 2px',
  },
  navigator: {
    activeBottom: primaryColor,
    borderRight: darken(bannerBg, 5),
    hoverBg: '#eee',
  },
  popover: {
    bg: '#fafafa', // '#fffffff2',
    borderColor: '#e9e9ea',
    boxShadow: '-3px 2px 20px 0px rgb(58 58 58 / 15%)',
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
    mask: 'rgba(31, 34, 37, 0.1)',
    border: primaryColor,
    shadow: '-2px 4px 20px 0px rgb(158 157 157 / 23%)',
    innerSelectBg: '#e4eeed45',
    subPanel: '#F5F5F5',
    // subPanelShadow: 'drop-shadow(3px 3px 6px #EAE9E9)',
    subPanelShadow: 'none',
  },
  form: {
    inputBg: '#ffffff95',
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
    title: threadTitle,
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
    menuCat: threadTitle,
    menuTitle: descText,
    blockActiveBg: '#ffffff95',
  },
  toggle: {
    shadow: '0 0 10px 0 rgb(185 185 185 / 25%) inset',
    ball: 'white',
  },
  hiddenPanel: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 40%)',
}

export default day
