// import { useEffect } from 'react'
// import { includes, values } from 'ramda'

// import type { TArticle, TDirection, TMetric } from '~/spec'
// import EVENT from '~/const/event'
// import TYPE from '~/const/type'

// import { toggleGlobalBlur, clearGlobalBlur } from '~/dom'
// import { Global, debounce } from '~/helper'
// import { send, previewArticle } from '~/signal'
// import asyncSuit from '~/async'

// import type { TStore } from './store'

// const { SR71, $solver, asyncRes } = asyncSuit
// const sr71$ = new SR71({
//   /* @ts-ignore */
//   receive: values(EVENT.DRAWER),
// })

// let store: TStore | undefined
// let sub$ = null

// // those types will not treat as page link
// const FUNCTION_TYPES = [
//   TYPE.DRAWER.C11N_SETTINGS,
//   TYPE.DRAWER.MODELINE_MENU,
//   TYPE.DRAWER.CUSTOM_BG_EDITOR,
// ]

// /**
//  * close current drawer
//  */
// export const closeDrawer = (): void => {
//   store.close()

//   // force call MDEditor's componentWillUnmount to store the draft
//   // wait until drawer move out of the screean
//   setTimeout(() => {
//     send(EVENT.DRAWER.AFTER_CLOSE)
//     store.resetViewing()

//     // 偶尔会有没有关闭的情况，确保关闭模糊
//     toggleGlobalBlur(false)
//   }, 200)
// }

// export const naviToArticle = (article: TArticle): void => {
//   store.markPreviewHomeURLIfNeed()
//   previewArticle(article)
//   send(EVENT.RELOAD_ARTICLE)
// }

// // handler swiped event for up/down swipe
// // 判断最终是回到原来的位置还是隐藏 panel
// export const onSwipedYHandler = (
//   ev,
//   setSwipeUpY: (i: number) => void,
//   setSwipeDownY: (i: number) => void,
//   ignoreSwipeAviliable = false,
// ): void => {
//   const { optionsData: options, swipeThreshold, swipeUpAviliable, swipeDownAviliable } = store

//   if (options.direction === 'bottom') {
//     const swipeDonwY = Number.parseInt(ev.absY, 10)

//     if (swipeDonwY < swipeThreshold) {
//       setSwipeDownY(0)
//       store.mark({ canBeClose: false })
//     } else if (ev.dir === 'Down' && (swipeDownAviliable || ignoreSwipeAviliable)) {
//       closeDrawer()
//       setSwipeDownY(null)
//     }
//   } else {
//     // handle top direction situation
//     const swipeUpY = Number.parseInt(ev.absY, 10)

//     if (swipeUpY < swipeThreshold) {
//       setSwipeUpY(0)
//       store.mark({ canBeClose: false })
//     } else if (ev.dir === 'Up' && (swipeUpAviliable || ignoreSwipeAviliable)) {
//       closeDrawer()
//       setSwipeUpY(null)
//     }
//   }
// }

// const handleClearEffect = debounce(() => {
//   clearGlobalBlur()
//   store.mark({ canBeClose: true })
// }, 200)

// const handleRestoreEffect = debounce(() => {
//   toggleGlobalBlur(true)
//   store.mark({ canBeClose: false })
// }, 200)

// // handler swiping event for up/down swipe
// export const onSwipingYHandler = (
//   ev,
//   setSwipeUpY: (i: number) => void,
//   setSwipeDownY: (i: number) => void,
//   ignoreSwipeAviliable = false,
// ): void => {
//   // when top/bottom has no content, the whole panel can be swipeable
//   // like tiktok style
//   const { swipeThreshold, optionsData: options, swipeUpAviliable, swipeDownAviliable } = store

//   if ((ignoreSwipeAviliable || swipeUpAviliable) && ev.dir === 'Up') {
//     const swipeUpY = Number.parseInt(ev.absY, 10)
//     setSwipeUpY(swipeUpY)

//     if (ignoreSwipeAviliable || (swipeUpAviliable && options.direction !== 'bottom')) {
//       swipeUpY >= swipeThreshold ? handleClearEffect() : handleRestoreEffect()
//     }
//   }

//   if ((ignoreSwipeAviliable || swipeDownAviliable) && ev.dir === 'Down') {
//     const swipeDonwY = Number.parseInt(ev.absY, 10)
//     setSwipeDownY(swipeDonwY)

//     if (ignoreSwipeAviliable || (swipeDownAviliable && options.direction !== 'top')) {
//       swipeDonwY >= swipeThreshold ? handleClearEffect() : handleRestoreEffect()
//     }
//   }
// }

// //
// export const toggleSwipeAviliable = (type: TDirection, bool: boolean): void => {
//   type === 'down'
//     ? store.mark({ swipeDownAviliable: bool })
//     : store.mark({ swipeUpAviliable: bool })
// }

// export const toggleHeaderTextVisiable = (bool: boolean): void => {
//   store.mark({ showHeaderText: bool })
// }

// export const resetSwipeAviliable = (): void => store?.resetSwipeAviliable()

// //
// const DataResolver = [
//   {
//     match: asyncRes(EVENT.DRAWER.OPEN),
//     action: (res) => {
//       const payload = res[EVENT.DRAWER.OPEN]
//       const isMobile = false

//       if (!includes(payload.type, FUNCTION_TYPES) && isMobile) {
//         const { data: article } = payload
//         const targetUrl = `/${article.meta.thread.toLowerCase()}/${article.id}`

//         Global.location.href = targetUrl
//         return
//       }

//       console.log('## ## drawer open -> : ', res)
//       console.log('## payload -------> ', payload)

//       store.open(payload)
//     },
//   },
//   {
//     match: asyncRes(EVENT.DRAWER.CLOSE),
//     action: () => closeDrawer(),
//   },
//   {
//     match: asyncRes(EVENT.DRAWER.CONTENT_DRAGABLE),
//     action: (res) => {
//       const payload = res[EVENT.DRAWER.CONTENT_DRAGABLE]
//       store.mark({ disableContentDrag: payload.data })
//     },
//   },
// ]

// // ###############################
// // init & uninit
// // ###############################
// export const useInit = (_store: TStore, windowWidth: number, metric: TMetric): void => {
//   useEffect((): (() => void) => {
//     store = _store
//     if (!sub$) {
//       sub$ = sr71$.data().subscribe($solver(DataResolver, []))
//     }

//     store.mark({ windowWidth, metric })

//     return () => {
//       if (!sub$) return
//       sr71$.stop()
//       sub$.unsubscribe()
//       sub$ = null
//     }
//   }, [_store, windowWidth, metric])
// }
