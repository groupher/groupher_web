/*
 * a theme inspired by green && unbuntu
 */
import { lighten, darken } from 'polished'

const primaryColor = '#5da579'

const bannerBg = '#bccebb' // '#AEC4AD'
const contentBg = '#D3DFD1'
const contentBoxBg = '#e0e8db' // '#DBE3D6'
const fontColor = primaryColor
const sidebarBg = '#3B4F43'
const markdownFont = '#83a085'

const descText = '#83a085'
const bannerTitle = '#708e7a'
const primaryMate = '#b57a5b'

const green = {
  _meta: {
    category: 'light',
  },
  name: 'green',
  logoText: bannerTitle,
  cover: '#B4C9B2',
  coverIndex: '#9e96c3',
  contrastFg: 'orange',
  htmlBg: contentBoxBg,
  spaceBg: '#212d26',
  mobileTab: bannerBg,
  loading: {
    basic: bannerBg,
    animate: lighten(0.03, bannerBg),
    // basic: '#113B4A',
    // animate: '#02495a',
  },
  error: {
    title: primaryColor,
    desc: darken(0.1, primaryColor),
    bg: lighten(0.02, contentBoxBg),
  },

  font: fontColor,
  link: '#269A95',
  main: '#7DC0C5',
  bodyBg: contentBg,
  selectionBg: '#839496',
  baseColor: {
    red: '#ca5f4d',
    orange: '#ad735c',
    yellow: '#B0BA6C',
    green: '#699411',
    cyan: '#24878C',
    blue: '#456fbd',
    purple: '#7d519e',

    grey: '#106d8a',
    pink: '#b36976',

    pinkLite: '#82606b',
    pinkBtnText: '#ded0d0',
  },
  header: {
    fg: primaryColor,
    bg: bannerBg,
    spliter: darken(0.04, bannerBg),
    fixed: contentBg,
    tabActive: bannerTitle,
    tabOthers: descText,
    cardBg: '#d4dfcf',
    cardBorder: '#ccd8d6',
    cardLogoText: '#A0BBBD',
    cardTitle: '#a0b5b9',
  },
  banner: {
    title: bannerTitle,
    bg: bannerBg,
    desc: descText,
    spliter: bannerBg,
    number: bannerTitle,
    active: primaryMate,
    numberDesc: descText,
    numberDivider: '#aab9ab',
    numberHoverBg: lighten(0.03, bannerBg),
  },
  thread: {
    bg: contentBoxBg,
    filterResultHint: descText,
    articleTitle: '#62867A',
    articleStrip: contentBoxBg,
    articleDigest: descText,
    articleTag: '#74a0ab',
    articleLink: descText,
    articleDivider: '#d0dbdc',
    commentsUserBorder: contentBoxBg,
    extraInfo: primaryMate,
    articleSpliter: '#BBCEBC',
    // like github
    repoTitle: '#62867A',
  },
  content: {
    bg: contentBoxBg,
    border: contentBoxBg,
    cardBg: lighten(0.05, contentBoxBg),
    cardBorder: lighten(0.08, contentBoxBg),
    cardBorderHover: lighten(0.1, contentBoxBg),
  },
  footer: {
    text: lighten(0.1, descText),
    hover: descText,
    title: '#77706B',
    bottomBg: '#252325',
  },
  sidebar: {
    bg: sidebarBg,
    activeBar: 'yellowgreen',
    holder: lighten(0.15, sidebarBg),
    logoText: primaryColor,
    menuHover: lighten(0.1, sidebarBg),
    pinActive: 'yellowgreen',
    menuLink: '#A6BBAF',
    borderColor: lighten(0.05, sidebarBg),
    headerShadow: '-2px 2px 2px 0px rgb(39, 53, 45)',
    headerShadowBorderBottom: '1px solid #576957',
    footerShadow: '-1px -4px 4px 0px rgb(39, 53, 45)',
    footerShadowBorderBottom: '1px dashed #576957',
    searchInputBottom: '#606f64',
    searchInputBottomActive: '#92C446',
    searchInputHolder: '#607765',
  },
  drawer: {
    title: bannerTitle,
    desc: lighten(0.05, descText),
    font: descText,
    bg: contentBg,
    shadow: '-5px 0px 14px 0px rgba(41, 18, 18, 0.19)',
    closerShadow: '-5px 0px 14px 0px rgba(41, 18, 18, 0.19)',
    markdownHelperBg: lighten(0.04, contentBg),
    accountBg: contentBoxBg,
    articleBg: contentBoxBg,
    helper: '#b0bfa8',
    helperHover: descText,
    topLine: primaryColor,
    icon: '#845145',
    divider: '#ced8c6',
    /* single article page sidebar divider */
    sideDivider: '#b2c3b0',
  },
  article: {
    link: primaryMate,
    linkHover: lighten(0.05, primaryMate),
    reactionTitle: descText,
    reactionHoverBg: lighten(0.04, contentBg),
  },
  comment: {
    bg: contentBg,
    icon: bannerTitle,
    didIcon: primaryMate,
    title: bannerTitle,
    username: bannerTitle,
    number: primaryMate,
    floor: primaryMate,
    reply: bannerTitle,
    replyBg: '#e8efe5',
    placeholder: lighten(0.05, descText),
    filter: descText,
    filterActive: bannerTitle,
    action: descText,
    // mention text displayed in article
    mentionText: bannerTitle,
    mentionTextBg: '#f7f0dc',
    // mention popover background
    mentionBg: contentBoxBg,
    mentionBorder: bannerTitle,
    mentionActiveBg: lighten(0.01, contentBoxBg),
    mentionShadow: '0px 2px 10px 1px rgba(47, 46, 46, 0.3)',

    indentLine: '#035163',
    indentActive: '#4b6669',
  },
  editor: {
    title: bannerTitle,
    content: descText,
    placeholder: '#a6bba7',
    headerBg: contentBoxBg,
    contentBg: contentBoxBg,
    border: contentBoxBg,
    borderActive: primaryColor,
    borderNormal: darken(0.05, contentBoxBg),
    footer: descText,
    footerHover: darken(0.05, descText),
  },
  pagination: {
    itemBg: contentBg,
    itemBorderColor: '#C3D4C3',
    disableText: descText,
    text: primaryColor,
    inactiveNum: primaryColor,
  },
  heatmap: {
    activityLow: darken(0.05, '#5FA47A'),
    activityHight: 'yellowgreen',
    empty: '#d3dccc',
    borderHover: primaryColor,
    monthLabel: descText,
    scale_1: '#dbe290',
    scale_2: '#99c06f',
    scale_3: '#609d4c',
    scale_4: '#61793e',
    scale_5: '#37642c',
  },
  geoMap: {
    oceanColor: lighten(0.06, '#D2DFD1'),
    regionBg: darken(0.05, '#BACEBC'),
    restRegionBg: '#D2DFD1',
    borderStroke: lighten(0.05, '#8EAB94'),
    markerBg: '#C2DEB6',
    markerShadow: '#C2DEB6',
  },
  bannerHeatmap: {
    activityLow: '#007D7C',
    activityHight: '#26A9A0',
    empty: '#d3dccc',
    borderHover: primaryColor,
    monthLabel: descText,
    scale_1: '#dbe290',
    scale_2: '#99c06f',
    scale_3: '#609d4c',
    scale_4: '#61793e',
    scale_5: '#37642c',
  },
  markdown: {
    title: '#85a083',
    fg: markdownFont,
    titleBottom: '#d8e6d5',
    hrColor: '#154452',
    blockquoteBorder: '0.25em solid #34535C',
    blockquoteFg: darken(0.09, markdownFont),
    strongFg: lighten(0.2, markdownFont),
    strongBg: '#34535C',
    link: '#caad39',
    tableBg: lighten(0.01, contentBoxBg),
    tableBg2n: lighten(0.05, contentBoxBg),
    tableborder: `1px solid ${lighten(0.07, contentBoxBg)}`,
    taskDone: '#528416',
    taskPeding: lighten(0.1, contentBoxBg),
    br: '#d8e6d5',
  },
  code: {
    bg: lighten(0.03, contentBoxBg),
  },
  shell: {
    link: lighten(0.2, contentBg),
    searchInput: '#99B09B',
    searchIcon: '#99B09B',
    barBg: darken(0.01, contentBg),
    border: darken(0.04, '#D3DFD1'),
    title: '#718E7A',
    desc: '#849F88',
    activeBg: darken(0.05, contentBg),
  },
  button: {
    primary: primaryColor,
    fg: lighten(0.4, primaryColor),
    hoverBg: lighten(0.1, primaryColor),
    activeBg: darken(0.01, primaryColor),
    clicked: primaryColor,
  },
  navigator: {
    activeBottom: primaryColor,
    borderRight: darken(0.05, bannerBg),
    hoverBg: lighten(0.05, bannerBg),
  },
  popover: {
    bg: contentBoxBg,
    borderColor: primaryColor,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
  },
  tags: {
    dotOpacity: 0.7,
    text: '#74a0ab',
  },
  tagger: {
    text: '#8095ad',
    bg: '#BBCEBC',
    border: '#BBCEBC',
    closeBtn: '#8095ad',
  },
  tabs: {
    headerActive: '#628672',
    header: '#83A086',
    contentBg: lighten(0.03, contentBoxBg),
    headerBg: lighten(0.02, contentBoxBg),
    headerActiveTop: primaryColor,
    border: darken(0.05, contentBoxBg),
    bottomLine: '#c6d4c6',
  },
  modal: {
    bg: '#e1e8d9',
    border: primaryColor,
    innerSelectBg: '#333040',
    subPanel: '#00313d',
    subPanelShadow: 'drop-shadow(3px 3px 6px #002a34)',
  },
  form: {
    inputBg: lighten(0.03, contentBoxBg),
    text: descText,
    label: bannerTitle,
    border: descText,
    shadow: 'rgba(184, 198, 192, 0.3)',
  },
  a: {
    hover: primaryColor,
    active: darken(0.1, primaryColor),
  },
  toast: {
    bg: contentBoxBg,
    border: descText,
    message: descText,
    title: primaryColor,
    infoBar: primaryColor,
    errorBar: '#f59381',
    successBar: '#9dd035',
    warnBar: '#f5a30e',
  },
  table: {
    headerBg: '#D2DFD1',
    headTitle: '#80A086',
    text: '#8FAA94',
    border: '#C3D3C2',
    hoverBg: darken(0.03, '#DFE8DB'),
  },
  searchHighlight: {
    doramonFg: 'orange',
    doramonBg: 'transparent',
  },
  tooltip: {
    text: '#F0F6FA',
    bg: '#2B2B2B',
  },
  avatar: {
    opacity: 0.8,
    quote: '#217470',
    fallbackBg: '#074857',
    shadow: '0px 0px 4px 0px rgb(0 0 0 / 50%) inset',
    quoteShadow: '0px 0px 3px 0px rgb(0 0 0 / 30%) inset',
  },
}

export default green
