
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {

  const router = useRouter()

  router.push('/')
  return (
    <div>page</div>
  )
}
//maybe i would put the home page here