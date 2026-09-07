import { type ClassValue, clsx } from 'clsx'

/** Runs the cn operation at the frontend shared boundary. */
export const cn = (...inputs: ClassValue[]) => clsx(inputs)

export { tr } from './tr'
export { getCSSVar } from './helper'
