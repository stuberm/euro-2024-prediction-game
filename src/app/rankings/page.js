import { cookies } from 'next/headers'
import PocketBase from 'pocketbase'

async function getData () {
  const cookie = cookies().get('pb_auth')

  // This never happens because of the middleware,
  // but we must make typescript happy
  if (!cookie) throw new Error('Not logged in')

  // const { model } = JSON.parse(cookie.value)
  const pb = new PocketBase(process.env.POCKETBASE_URL)
  const standings = await pb.collection('users').getList(1, 100, { sort: 'points', order: 'desc' })
  return standings
}

export default async function Standings () {
  const data = await getData()
  return (
    <div>
      {data.items.map((user, index) => (
        <div key={user.id} className='flex justify-between items-center py-3 px-5 border-b border-slate-700'>
          <div>{index + 1}</div>
          <div>{user.name}</div>
          <div>{user.points}</div>
        </div>
      ))}
    </div>
  )
}
