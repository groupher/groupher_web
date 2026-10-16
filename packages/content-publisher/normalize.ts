import { CONTENT_SOURCE_FORMAT, type TContentSource } from '@groupher/contracts/content-publish'
import { deserializeMarkdown } from '@groupher/rich-editor/node'

export type TNormalizedContent = {
  diagnostics: ReturnType<typeof deserializeMarkdown>['diagnostics']
  value: unknown[]
}

/** Normalizes every supported source to the canonical Plate representation. */
export const normalizeContentSource = (source: TContentSource): TNormalizedContent => {
  switch (source.format) {
    case CONTENT_SOURCE_FORMAT.PLATE:
      return { diagnostics: [], value: source.value }
    case CONTENT_SOURCE_FORMAT.MARKDOWN: {
      const result = deserializeMarkdown(source.markdown)
      return { diagnostics: result.diagnostics, value: result.value }
    }
  }
}
