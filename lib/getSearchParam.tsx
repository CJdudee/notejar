'use client'

import React from 'react'

import { useSearchParams } from 'next/navigation'

export default function getSearchParam() {
  
    const searchParams = useSearchParams()

    const search = searchParams.get('tab')

    console.log(search)
}
