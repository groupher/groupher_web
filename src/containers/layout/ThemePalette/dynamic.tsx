import dynamic from 'next/dynamic'

export const CodeSyxHighlight = dynamic(() => import('./CodeSyxHighlight'), {
  ssr: false,
})

export const holder = 1
