

import React from 'react'

export default async function getUserInfo(id) {
  
    const user = await fetch(`${process.env.NEXT_URL}/api/users/${id}`, { cache: 'no-cache'})

    const userJson = await user.json()

    return userJson
}
