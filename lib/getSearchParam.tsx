'use client'

import React from 'react'

import { useSearchParams } from 'next/navigation'

export default function useGetSearchParam() {
  
    const searchParams = useSearchParams()

    const search = searchParams.get('tab')

    console.log(search)
}
