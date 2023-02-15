import { createGlobalStyle } from 'styled-components'

// import { media } from '@/utils/css/media'
import css, { theme } from '@/utils/css'
import normalize from './normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize};
  html {
    background-color: ${theme('htmlBg')};
    -webkit-font-smoothing: antialiased;
  }
  body {
    ${css.media.mobile`
      position: relative;
   `};
    background-color: ${theme('htmlBg')};
    margin: 0;
    overflow-x: hidden;
  }

  *::-moz-selection {
    background-color: ${theme('selectionBg')} !important;
  }

  *::selection {
    background-color: ${theme('selectionBg')} !important;
  }
  a:hover {
    color: ${theme('a.hover')};
  }
  a:active {
    color: ${theme('a.active')};
  }

// mentions
  .markdown-editor-mention {
    color: ${theme('comment.mentionText')};
    background: ${theme('comment.mentionTextBg')};
    cursor: pointer;
    display: inline-block;
    padding-left: 4px;
    padding-right: 4px;
    margin-bottom: 4px;
    border-radius: 3px;
    text-decoration: none;
  }
  .markdown-editor-mention:hover,
  .markdown-editor-mention:focus {
    color: ${theme('comment.mentionText')};
    background: ${theme('comment.mentionTextBg')};
    outline: 0; /* reset for :focus */
  }

  .markdown-editor-suggestions {
    border: 1px solid;
    border-color: ${theme('comment.mentionBorder')};
    background: ${theme('comment.mentionBg')};
    box-shadow: ${theme('comment.mentionShadow')};
    margin-top: 10px;
    position: absolute;
    min-width: 160px;
    max-width: 300px;

    border-radius: 2px;
    cursor: pointer;
    z-index: 2;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    box-sizing: border-box;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  .markdown-editor-mentionSuggestionsEntry {
    transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
    padding: 7px 10px 3px 10px;
    padding-left: 10px;
    display: flex;
  }
  .markdown-editor-mentionSuggestionsEntry:active {
    background-color: ${theme('baseColor.red')};
  }
  .markdown-editor-mentionSuggestionsEntryFocused {
    background-color: ${theme('comment.mentionActiveBg')};
    padding: 7px 10px 3px 10px;
    display: flex;
  }

  .markdown-editor-mentionSuggestionsEntryText {
    display: inline-block;
    margin-left: 8px;

    ${css.cutRest('200px')};
    max-width: 368px;
    font-size: 1rem;
    margin-bottom: 0.2em;
    color: ${theme('article.title')};
  }

  .markdown-editor-mentionSuggestionsEntryAvatar {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 12px;
  }

  .markdown-editor-link {
    color: ${theme('markdown.link')};

    &:hover {
      color: ${theme('markdown.link')};
      text-decoration: underline;
    }
  }

  // masonry cards styles

  .masonry-cards-grid {
    display: flex;
    width: auto;

    ${css.media.mobile`
      margin-left: 0;
    `};
  }
  .masonry-cards-grid_column {
    background-clip: padding-box;
    padding: 20px;

    ${css.media.mobile`
      padding: 5px;
    `};
  }

  .tippy-box {
    background: ${theme('popover.bg')} !important;
  }
  /** customize tooltip animation globally */
  .tippy-box[data-state='visible'] {
    background: ${theme('popover.bg')} !important;
    backdrop-filter: blur(18px);

    transition: all .25s ease-in-out !important;
  }
  .tippy-box[data-placement^=top][data-state='visible'] {
    transform: translateY(-5px);
  }
  .tippy-box[data-placement^=bottom][data-state='visible'] {
    transform: translateY(5px);
  }
  .tippy-box[data-placement^=left][data-state='visible'] {
    transform: translateX(-5px);
  }
  .tippy-box[data-placement^=right][data-state='visible'] {
    transform: translateX(5px);
  }
  /* .tippy-box[data-state='hidden'] {
    opacity: 0;
  } */

  // 不然图片下面后有个条
  .lazy-load-image-background.blur.lazy-load-image-loaded {
    line-height: 0.8;
  }
`
export default GlobalStyle
