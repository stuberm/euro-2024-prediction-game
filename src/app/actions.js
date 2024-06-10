'use server'

import { redirect } from 'next/navigation'
import PocketBase from 'pocketbase'
import { cookies } from 'next/headers'

export async function login (formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // TODO: server-side validation

  const pb = new PocketBase(process.env.POCKETBASE_URL)
  let redirectPath

  try {
    const { token, record: model } = await pb.collection('users')
      .authWithPassword(email, password)

    const cookie = JSON.stringify({ token, model })

    cookies().set('pb_auth', cookie, {
      secure   : true,
      path     : '/',
      sameSite : 'strict',
      httpOnly : true
    })

    redirectPath = '/matches'
  } catch (error) {
    if (error.response && error.response.message) {
      const { message } = error.response
      redirectPath = `/?message=${message}`
      return
    }
    console.error(error)
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }
}

export async function logout () {
  cookies().delete('pb_auth')
  redirect('/')
}

export async function updateBet (match, home, away, bet) {
  const pb = new PocketBase(process.env.POCKETBASE_URL)
  const cookie = cookies().get('pb_auth')
  const user = JSON.parse(cookie.value).model.id
  if (bet) {
    const response = await pb.collection('bets').update(bet, { home, away, user })
    return response
  } else {
    const response = await pb.collection('bets').create({ match, home, away, user })
    return response
  }
}
