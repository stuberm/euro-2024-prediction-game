'use client'

import { updateBet } from '@/app/actions'
import { useState } from 'react'
import PropTypes from 'prop-types'

const MatchCard = ({ match, bet }) => {
  const [storedBet, setStoredBet] = useState(bet)
  const [home, setHome] = useState(storedBet?.home || '')
  const [away, setAway] = useState(storedBet?.away || '')

  return (
    <div className='relative border border-slate-500 rounded-xl p-4 bg-slate-900'>
      <p className='text-sm text-slate-300 text-center mb-2'>{match.type}</p>
      <p className='text-sm text-slate-300 text-center mb-2'>{new Date(match.date).toLocaleString('de-DE')}</p>
      <div className='flex items-center'>
        <div className='mr-4'>{match.expand.home_team.code}</div>
        <div className=''>
          <input
            type='number' className='text-4xl text-center w-full'
            value={home}
            disabled={match.played}
            onChange={
              async event => {
                setHome(event.target.value)
                const newValue = parseInt(event.target.value, 10)
                if (typeof newValue === 'number' && !isNaN(newValue)) {
                  const updatedBet = await updateBet(match.id, newValue, away, storedBet?.id)
                  setStoredBet(updatedBet)
                }
              }
            }
          />
        </div>
        <div className='px-3'>:</div>
        <div className=''>
          <input
            type='number' className='text-4xl text-center w-full'
            value={away}
            disabled={match.played}
            onChange={
              async event => {
                setAway(event.target.value)
                const newValue = parseInt(event.target.value, 10)
                if (typeof newValue === 'number' && !isNaN(newValue)) {
                  const updatedBet = await updateBet(match.id, home, newValue, storedBet?.id)
                  setStoredBet(updatedBet)
                }
              }
            }
          />
        </div>
        <div className='ml-4'>{match.expand.away_team.code}</div>
      </div>
      {match.played
        ? (
          <div className='flex items-center justify-center mt-4'>
            <div className='text-2xl px-3'>{match.home_goals}</div><div className='px-3'>:</div><div className='text-2xl px-3'>{match.away_goals}</div>
            {bet && bet.points && bet.points > 0 && (
            <div className='absolute top-3 right-3 text-2xl bg-purple-900 border border-purple-600 rounded-full w-10 h-10 flex items-center justify-center'>{bet.points}</div>
            )}
          </div>
          )
        : <div className='h-8 mt-4' />}
    </div>
  )
}

MatchCard.propTypes = {
  match : PropTypes.object.isRequired,
  bet   : PropTypes.object
}

export default MatchCard
