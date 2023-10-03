

import React from 'react'

export default async function getUserInfo(id) {
  
    const user = await fetch(`http://localhost:3000/api/users/${id}`, { cache: 'no-cache'})

    const userJson = await user.json()

    return userJson
}
