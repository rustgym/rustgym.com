import React, { useEffect } from 'react'

const Home = () => {
  S.auth.loadSession()
  return (
    <div>
      home
    </div>
  )
}

export {Home}