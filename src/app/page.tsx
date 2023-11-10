'use client'

import Link from 'next/link'

import LandingPage from '@/containers/content/LandingPage'

export default function Page() {
  return (
    <div>
      <Link href="/home">go to home </Link>

      <LandingPage />
    </div>
  )
}
