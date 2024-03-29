import { useState, useEffect } from 'react'

const turnTime = 2000 // Every "turn" will be 2 seconds
const leftTurnCount = 3 // Turns that left turn will be green
const straightCount = 5 // Turns straight will be green
const states = ['NSL', 'NSS', 'EWL', 'EWS'] // The 4 states the light can be in for now. either North / South are turning left, or North / South are going straight, or East / West is turning left, or East / West is going straight

const useCarsMove = () => {
  const [count, setCount] = useState(leftTurnCount)
  const [lightState, setLightState] = useState(states[0])

  const updateCarsAndLights = () => {
    // If we are not at 0 yet, reduce by one
    if (count > 0) {
      setCount(count - 1)
    } else {
      // Now it is time to change the state
      switch (lightState) {
        case 'NSL':
          setCount(straightCount)
          setLightState('NSS')
          break
        case 'NSS':
          setCount(leftTurnCount)
          setLightState('EWL')
          break
        case 'EWL':
          setCount(straightCount)
          setLightState('EWS')
          break
        case 'EWS':
          setCount(leftTurnCount)
          setLightState('NSL')
          break
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => updateCarsAndLights(), turnTime)
    return () => {
      clearInterval(interval)
    }
  }, [count])

  let northLeft = 'red'
  if (lightState === 'NSL') {
    if (count === 0) {
      northLeft = 'yellow'
    } else {
      northLeft = 'green'
    }
  } else if (lightState === 'NSS') {
    northLeft = 'orange'
  }

  let eastLeft = 'red'
  if (lightState === 'EWL') {
    if (count === 0) {
      eastLeft = 'yellow'
    } else {
      eastLeft = 'green'
    }
  } else if (lightState === 'EWS') {
    eastLeft = 'orange'
  }

  let northStraight = 'red'
  if (lightState === 'NSS') {
    if (count === 0) {
      northStraight = 'yellow'
    } else {
      northStraight = 'green'
    }
  }

  let eastStraight = 'red'
  if (lightState === 'EWS') {
    if (count === 0) {
      eastStraight = 'yellow'
    } else {
      eastStraight = 'green'
    }
  }

  return {
    stoplight: {
      north: [northLeft, northStraight, northStraight, northStraight],
      east: [eastLeft, eastStraight, eastStraight, eastStraight],
      south: [northLeft, northStraight, northStraight, northStraight],
      west: [eastLeft, eastStraight, eastStraight, eastStraight],
    },
  }
}

export default useCarsMove
