import React from 'react'

export default async function getBlogsFetch() {
    const res = await fetch('http://localhost:3000/api/blog')

    if (!res.ok) {

        throw new Error('fail to fetch')


    }

    return res.json()
}
