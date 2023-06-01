import React from 'react'
import HomeWelcome from './HomeWelcome'
import HomeApp from './HomeApp'

const home = () => {
  const accessToken = localStorage.getItem('accessToken')
  return accessToken ? <HomeApp /> : <HomeWelcome />
}
export default home