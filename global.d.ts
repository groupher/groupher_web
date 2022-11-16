/* eslint-disable @typescript-eslint/no-explicit-any */

interface IWindow extends Window {
  appVersion?: string
  /**
   * used for check platform hook
   */
  chrome?: any
  safari?: any
  StyleMedia?: any
  HTMLElement?: any

  // for baidu analysis
  _hmt?: any
}

export type TWindow = IWindow | null
