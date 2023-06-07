import { COLOR_NAME } from '@/constant/colors'
import { THREAD } from '@/constant/thread'

export const DEFAULT_CREATE_TAG = {
  id: '',
  color: COLOR_NAME.BLACK,
  // index?: number
  raw: '',
  title: '',
  thread: THREAD.POST.toUpperCase(),
  group: '',
}

export const holder = 1