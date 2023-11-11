
import { date_format, time_format } from '@/utils/helpers'
import Link from 'next/link'

export default function HomePageNotes({header, content, createdAt, updatedAt, _id, user }: {
  header: string,
  content: string,
  createdAt: Date,
  updatedAt: Date, 
  user: any,
  _id: string
}) {
    const madeAt = date_format(createdAt)
    const editedAt = date_format(updatedAt)

    const madeTime = time_format(createdAt)
    const editedTime = time_format(updatedAt)

  return (
    <div className='bg-slate-200  px-6 py-8 rounded-md outline mb-4  '>

      <div className='flex justify-between gap-4 md:flow-root'>

        <Link href={`/notes/${_id}`} className='block text-xl sm:text-2xl sm:flex mb-5  hover:text-gray-500 float-left '>
          Title: {header}
        </Link>

        <Link href={`/profile/${user._id}`} className=' text-2xl hover:text-gray-500 float-right '>

          <div className='flex gap-2'>

            <p>By: {user.username}</p>
            {/* this div is used for the profile pic/color */}
            <div style={{ background: user.profileColor ?  user.profileColor : '#fff' }} className='rounded-xl w-7 h-7 ' />

          </div>

        </Link>

      </div>

      <div className='rounded-md '>

        {/* <HomePageTipTap text={content} /> */}
        <div className='block md:grid grid-cols-2 mt-4 '>

          <p className=' text-center  text-sm '>Created At: {madeAt} : {madeTime}</p>

          {madeTime === editedTime ?
          null : 
          (<p className='  text-center text-sm  '>Updated At: {editedAt} : {editedTime}</p>)} 
        
        </div>

      </div>

        
      <div className='text-center   mt-8 w-full   '>

        <Link href={`/notes/${_id}`} className=' outline outline-2 p-2 mt-5 rounded-md  hover:bg-gray-300 pr-10 pl-10'>View</Link>
        
      </div>
    </div>
  )
}


{/* <HomePageTipTap text={content} /> */}
{/* {content.length < 50
? (<p>{content}</p>)
: (<p>{content.substring(0,200)}...</p>)} */}
{/* {content.length < 200  */}
{/* ? (<p>{content}</p>) */}
{/* : (<p>{content.slice(0, 197)}...</p>)} */}