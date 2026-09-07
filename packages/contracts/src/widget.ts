/** Browser event names emitted by the public Widget loader. */
export const WIDGET_EVENT = {
  ERROR: 'groupher-widget:error',
} as const

export type TWidgetEventName = (typeof WIDGET_EVENT)[keyof typeof WIDGET_EVENT]

export type TWidgetErrorDetail = {
  cause?: unknown
  message: string
}

export type TWidgetErrorEvent = CustomEvent<TWidgetErrorDetail>
