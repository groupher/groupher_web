'use client'

import BookDemo from '@/widgets/BookDemo'

export const dynamic = 'force-static'
export const revalidate = 3600

const BookDemoPage = () => {
  return <BookDemo />
}

export default BookDemoPage
