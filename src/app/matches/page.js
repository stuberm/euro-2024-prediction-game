import MatchCard from '@/components/MatchCard'
import { cookies } from 'next/headers'
import PocketBase from 'pocketbase'

async function getData () {
  const cookie = cookies().get('pb_auth')

  // This never happens because of the middleware,
  // but we must make typescript happy
  if (!cookie) throw new Error('Not logged in')

  const { model } = JSON.parse(cookie.value)
  const pb = new PocketBase(process.env.POCKETBASE_URL)
  const matches = await pb.collection('matches').getList(1, 20, { expand: 'home_team,away_team' })
  const bets = await pb.collection('bets').getList(1, -1, { filter: `user.id = "${model.id}"` })
  return { matches, bets }
}

export default async function Matches () {
  const data = await getData()
  return (
    <div>
      <div className='grid grid-cols-3 gap-4'>
        {data.matches.items.map(match => {
          const bet = data.bets.items.find(bet => bet.match === match.id)
          return (
            <MatchCard key={match.id} match={match} bet={bet} />
          )
        })}
      </div>
    </div>
  )
}
