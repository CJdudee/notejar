



import getUserInfo from '@/lib/getUserInfo'
import { Suspense, useEffect, useState } from 'react'
import LoadingProfile from '../LoadingProfile'

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
    const { id } = user

    useEffect(() => {


      async function fetchUserInfo() {
  
        const userinfo = await getUserInfo(id)

          setUserInfo(userinfo)
        
        setIsLoading(false)
      }
      fetchUserInfo()
  
    })



    if(isLoading === true || !userInfo) {
      return (
        <LoadingProfile />
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
