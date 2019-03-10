import React from 'react'
import qs from 'qs'
import { saveToken, verify, loginRedirect } from '$lib/auth'

const SessionPage = ({ location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  saveToken(query.token)
  verify().then(() => loginRedirect())
  return <div>Saving session...</div>
}

export default SessionPage