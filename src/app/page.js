import { login } from './actions'

export default function Home () {
  return (
    <main className='h-screen w-screen flex items-center justify-center bg-gradient-to-r from-violet-900 to-slate-900 text-white'>
      <form action={login} className='flex flex-col items-center w-96'>
        <div className='text-5xl mb-5'>
          Euro 2024
        </div>
        <div className='mb-10'>
          Prediction Game
        </div>
        <div className='mb-4 w-full'>
          <label htmlFor='email' className='block text-sm text-slate-300'>Email</label>
          <input type='email' id='email' name='email' className='mt-1 p-2 w-full bg-transparent border border-slate-400 rounded-md' />
        </div>

        <div className='mb-4 w-full'>
          <label htmlFor='password' className='block text-sm text-slate-300'>Password</label>
          <input type='password' id='password' name='password' className='mt-1 p-2 w-full bg-transparent border border-slate-400 rounded-md' />
        </div>

        <button type='submit' className='bg-purple-600 p-3 w-full rounded-md mt-3'>Login</button>
      </form>
    </main>
  )
}
