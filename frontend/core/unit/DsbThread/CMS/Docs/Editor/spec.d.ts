import type { DOC_EDITOR_MODE } from './constant'

export type TDocEditorMode = (typeof DOC_EDITOR_MODE)[keyof typeof DOC_EDITOR_MODE]
