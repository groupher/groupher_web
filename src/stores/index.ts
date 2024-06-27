/**
 * NOTE: this file is generate automatically, DO NOT modify
 * unless you're sure what you're doing
 */

// TRootStore imported by container/xx/store, which is imported by RootStore index
// cause the cycle import issue, but type info is removed after ts compile,
// so cycle issue it's fine, ingore it
/* eslint-disable import/no-cycle */

// domain store
/* export { default as RouteStore } from './RouteStore' */
export { default as RouteStore } from '@/containers/Route/store'
export { default as ViewingStore } from './ViewingStore'
export { default as ArticlesStore } from './ArticlesStore'

// utils store
export { default as RichEditorStore } from '@/containers/editor/RichEditor/store'
export { default as ErrorBoxStore } from '@/containers/tool/ErrorBox/store'
// export { default as SidebarStore } from '@/containers/unit/Sidebar/store'
export { default as DrawerStore } from '@/containers/tool/Drawer/store'
// export { default as HeaderStore } from '@/containers/unit/Header/store'

// threads store
// export { default as ReposThreadStore } from '@/containers/thread/ReposThread/store'

// toolbox
// export { default as RepoEditorStore } from '@/containers/editor/RepoEditor/store'
export { default as CommentsStore } from '@/containers/unit/Comments/store'
export { default as AccountEditorStore } from '@/containers/editor/AccountEditor/store'

// user page

// editor
export { default as CommunityEditorStore } from '@/containers/editor/CommunityEditor/store'
// export { default as WorksEditorStore } from '@/containers/editor/WorksEditor/store'

// GEN: EXPORT CONTAINERS STORE HERE
export { default as CoverEditorStore } from '@/containers/editor/CoverEditor/store'
export { default as TagSettingEditorStore } from '@/containers/editor/TagSettingEditor/store'
// export { default as BlogEditorStore } from '@/containers/editor/BlogEditor/store'
export { default as ArticleViewerStore } from '@/containers/viewer/ArticleViewer/store'
export { default as ArticleEditorStore } from '@/containers/editor/ArticleEditor/store'
export { default as ModeLineMenuStore } from '@/containers/unit/ModeLineMenu/store'
export { default as ModeLineStore } from '@/containers/unit/ModeLine/store'
export { default as MushroomStore } from '@/containers/Mushroom/store'
