



import getUserInfo from '@/lib/getUserInfo'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

export default  function UserInfoTab({ user } : {
    user: any
}) {

    const [ userInfo, setUserInfo ] = useState() 
    const [isLoading, setIsLoading ] = useState(true)
    // const {data: session, status } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         redirect('/')
    //     }
    // })

    useEffect(() => {


      async function fetchUserInfo() {
  
        const userinfo = await getUserInfo(id)

          setUserInfo(userinfo)
        
        setIsLoading(false)
      }
  
      
  
      
      fetchUserInfo()
  
    }, [])

    const { id } = user


    if(isLoading === true || !userInfo) {
      return (
        <p className='p-4 text-center text-xl'>Loading</p>
      )
    }

    // const userinfo = await getUserInfo(id)

    // console.log(userinfo)

  

    const { username, roles } = userInfo

  return (

    <Suspense fallback={<p className=' p-4 text-center bg-slate-300  text-xl'>Loading</p>}>
      
    <div className='p-4 flex h-40 bg-slate-300'>

        <p className='m-4 text-2xl font-semibold'>{ username }</p>

    </div>

    </Suspense>

  )
}
