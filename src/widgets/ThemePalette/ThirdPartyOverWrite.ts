import { createGlobalStyle } from 'styled-components'

import { theme } from '@/css'

// third party style overwrite
const CustomOverWrite = createGlobalStyle`
  .comment-editor {
    .public-DraftEditor-content {
      min-height: 150px;
      font-size: 1rem;
      color: ${theme('editor.content')};
    }
  }
  .comment-reply-editor {
    font-size: 0.8rem;

    .public-DraftEditor-content {
      min-height: 200px;
      color: ${theme('editor.content')};
    }
  }

  .public-DraftEditor-content {
    min-height: 500px;
    font-size: 1.3em;
    color: ${theme('editor.content')};
  }

  .lazy-load-image-background.blur {
    filter: blur(3px);
  }

  .lazy-load-image-background.blur.lazy-load-image-loaded {
    filter: blur(0);
    transition: filter 0.2s;
  }

  .lazy-load-image-background.blur > img {
    opacity: 0;
  }

  .lazy-load-image-background.blur.lazy-load-image-loaded > img {
    opacity: 1;
    transition: opacity 0.2s;
  }
`

export default CustomOverWrite
