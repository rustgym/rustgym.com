import React, { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    S.auth.loadSession()
  })
  return (
    <div>
      home
    </div>
  )
}

export {Home}