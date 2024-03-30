import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const turnTime = 2000 // Every "turn" will be 2 seconds
const leftTurnCount = 3 // Turns that left turn will be green
const straightCount = 5 // Turns straight will be green
const states = ['NSL', 'NSS', 'EWL', 'EWS'] // The 4 states the light can be in for now. either North / South are turning left, or North / South are going straight, or East / West is turning left, or East / West is going straight
const createEmptyCarState = () => [{}, {}, {}, {}, {}]
const createEmptyCarStates = () => ({
  rt: createEmptyCarState(),
  rs: createEmptyCarState(),
  ls: createEmptyCarState(),
  lt: createEmptyCarState(),
  s1: createEmptyCarState(),
  s2: createEmptyCarState(),
}) // The beginning of the array is always closer to the stoplight

const useCarsMove = () => {
  const [count, setCount] = useState(leftTurnCount)
  const [lightState, setLightState] = useState(states[0])
  const [carsState, setCarsState] = useState({
    northLanes: createEmptyCarStates(),
    eastLanes: createEmptyCarStates(),
    southLanes: createEmptyCarStates(),
    westLanes: createEmptyCarStates(),
  })

  useEffect(() => {
    const moveUpStoppedCars = (carArray) => {
      const newCars = createEmptyCarState()

      carArray.forEach((car, index) => {
        if (car.id !== undefined) {
          if (index === 0) {
            //Stay in place
            newCars[index] = car
          } else {
            if (newCars[index - 1].id === undefined) {
              //Move up
              newCars[index - 1] = car
            } else {
              //Stay in place
              newCars[index] = car
            }
          }
        }
      })

      return newCars
    }

    const driveCarsOffScreen = (carArray) => {
      const newCars = createEmptyCarState()

      carArray.forEach((car, index) => {
        if (car.id !== undefined) {
          if (index === 4) {
            //Drive off the screen
          } else {
            newCars[index + 1] = car
          }
        }
      })

      return newCars
    }

    const generateNewCar = () => {
      const chanceOfCar = Math.floor(Math.random() * 10) // 0-9
      if (chanceOfCar < 2) {
        // a 1 or 0, so 20% chance
        const colorNumber = Math.floor(Math.random() * 5) // 0-4
        let color = 'white'
        switch (colorNumber) {
          case 0:
            color = 'blue'
            break
          case 1:
            color = 'lime'
            break
          case 2:
            color = 'green'
            break
          case 3:
            color = 'orange'
            break
          case 4:
            color = 'white'
            break
          default:
            color = 'white'
            break
        }
        return {
          id: uuidv4(),
          color,
        }
      }

      return {}
    }
    const updateCarsAndLights = () => {
      const newNorthCars = createEmptyCarStates()
      const newEastCars = createEmptyCarStates()
      const newSouthCars = createEmptyCarStates()
      const newWestCars = createEmptyCarStates()

      // Regardless of light, cars that have past the light are going to drive off the screen. I don't even have to check these, they can all move up a level
      newNorthCars.s1 = driveCarsOffScreen(carsState.northLanes.s1)
      newNorthCars.s2 = driveCarsOffScreen(carsState.northLanes.s2)
      newEastCars.s1 = driveCarsOffScreen(carsState.eastLanes.s1)
      newEastCars.s2 = driveCarsOffScreen(carsState.eastLanes.s2)
      newSouthCars.s1 = driveCarsOffScreen(carsState.southLanes.s1)
      newSouthCars.s2 = driveCarsOffScreen(carsState.southLanes.s2)
      newWestCars.s1 = driveCarsOffScreen(carsState.westLanes.s1)
      newWestCars.s2 = driveCarsOffScreen(carsState.westLanes.s2)
      // Cars that are still allowed to move will move
      switch (lightState) {
        case 'NSL':
          // North / South left turns move
          carsState.northLanes.lt.forEach((car, index) => {
            if (index === 0) {
              //Turn left across the light
              newEastCars.s1[0] = car
            } else {
              //Move up
              newNorthCars.lt[index - 1] = car
            }
          })
          carsState.southLanes.lt.forEach((car, index) => {
            if (index === 0) {
              //Turn left across the light
              newWestCars.s1[0] = car
            } else {
              //Move up
              newSouthCars.lt[index - 1] = car
            }
          })

          // North / South straight cars move up
          newNorthCars.ls = moveUpStoppedCars(carsState.northLanes.ls)
          newNorthCars.rs = moveUpStoppedCars(carsState.northLanes.rs)
          newNorthCars.rt = moveUpStoppedCars(carsState.northLanes.rt)
          newSouthCars.ls = moveUpStoppedCars(carsState.southLanes.ls)
          newSouthCars.rs = moveUpStoppedCars(carsState.southLanes.rs)
          newSouthCars.rt = moveUpStoppedCars(carsState.southLanes.rt)

          // East / West cars can just move up
          newEastCars.lt = moveUpStoppedCars(carsState.eastLanes.lt)
          newEastCars.ls = moveUpStoppedCars(carsState.eastLanes.ls)
          newEastCars.rs = moveUpStoppedCars(carsState.eastLanes.rs)
          newEastCars.rt = moveUpStoppedCars(carsState.eastLanes.rt)
          newWestCars.lt = moveUpStoppedCars(carsState.westLanes.lt)
          newWestCars.ls = moveUpStoppedCars(carsState.westLanes.ls)
          newWestCars.rs = moveUpStoppedCars(carsState.westLanes.rs)
          newWestCars.rt = moveUpStoppedCars(carsState.westLanes.rt)
          break
        case 'NSS':
          // North and south cars go through the light
          carsState.northLanes.ls.forEach((car, index) => {
            if (index === 0) {
              //Drive across the light
              newSouthCars.s1[0] = car
            } else {
              newNorthCars.ls[index - 1] = car
            }
          })
          carsState.northLanes.rs.forEach((car, index) => {
            if (index === 0) {
              //Drive across the light
              newSouthCars.s2[0] = car
            } else {
              newNorthCars.rs[index - 1] = car
            }
          })
          carsState.northLanes.rt.forEach((car, index) => {
            if (index === 0) {
              //Turn right across the light
              newWestCars.s2[0] = car
            } else {
              newNorthCars.rt[index - 1] = car
            }
          })
          carsState.southLanes.ls.forEach((car, index) => {
            if (index === 0) {
              //Drive across the light
              newNorthCars.s1[0] = car
            } else {
              newSouthCars.ls[index - 1] = car
            }
          })
          carsState.southLanes.rs.forEach((car, index) => {
            if (index === 0) {
              //Drive across the light
              newNorthCars.s2[0] = car
            } else {
              newSouthCars.rs[index - 1] = car
            }
          })
          carsState.southLanes.rt.forEach((car, index) => {
            if (index === 0) {
              //Turn right across the light
              newEastCars.s2[0] = car
            } else {
              newSouthCars.rt[index - 1] = car
            }
          })

          // North / South cars can left turn only if there isn't a car at the front of the straight lanes they will cross
          carsState.northLanes.lt.forEach((car, index) => {
            if (index === 0) {
              if (
                carsState.southLanes.ls[0].id === undefined &&
                carsState.southLanes.rs[0].id === undefined
              ) {
                //Turn left across the light if safe
                newEastCars.s1[0] = car
              } else {
                //Stay in place
                newNorthCars.lt[0] = car
              }
            } else {
              if (newNorthCars.lt[index - 1].id === undefined) {
                //Move up
                newNorthCars.lt[index - 1] = car
              } else {
                //Stay in place
                newNorthCars.lt[index] = car
              }
            }
          })
          carsState.southLanes.lt.forEach((car, index) => {
            if (index === 0) {
              if (
                carsState.northLanes.ls[0].id === undefined &&
                carsState.northLanes.rs[0].id === undefined
              ) {
                //Turn left across the light if safe
                newWestCars.s1[0] = car
              } else {
                //Stay in place
                newSouthCars.lt[0] = car
              }
            } else {
              if (newSouthCars.lt[index - 1].id === undefined) {
                //Move up
                newSouthCars.lt[index - 1] = car
              } else {
                //Stay in place
                newSouthCars.lt[index] = car
              }
            }
          })

          // East / West cars can just move up
          newEastCars.lt = moveUpStoppedCars(carsState.eastLanes.lt)
          newEastCars.ls = moveUpStoppedCars(carsState.eastLanes.ls)
          newEastCars.rs = moveUpStoppedCars(carsState.eastLanes.rs)
          newEastCars.rt = moveUpStoppedCars(carsState.eastLanes.rt)
          newWestCars.lt = moveUpStoppedCars(carsState.westLanes.lt)
          newWestCars.ls = moveUpStoppedCars(carsState.westLanes.ls)
          newWestCars.rs = moveUpStoppedCars(carsState.westLanes.rs)
          newWestCars.rt = moveUpStoppedCars(carsState.westLanes.rt)
          break
        case 'EWL':
          // East / West left turns move
          carsState.eastLanes.lt.forEach((car, index) => {
            if (index === 0) {
              //Turn left across the light
              newSouthCars.s1[0] = car
            } else {
              //Move up
              newEastCars.lt[index - 1] = car
            }
          })
          carsState.westLanes.lt.forEach((car, index) => {
            if (index === 0) {
              //Turn left across the light
              newNorthCars.s1[0] = car
            } else {
              //Move up
              newWestCars.lt[index - 1] = car
            }
          })

          // East / West straight cars move up
          newEastCars.ls = moveUpStoppedCars(carsState.eastLanes.ls)
          newEastCars.rs = moveUpStoppedCars(carsState.eastLanes.rs)
          newEastCars.rt = moveUpStoppedCars(carsState.eastLanes.rt)
          newWestCars.ls = moveUpStoppedCars(carsState.westLanes.ls)
          newWestCars.rs = moveUpStoppedCars(carsState.westLanes.rs)
          newWestCars.rt = moveUpStoppedCars(carsState.westLanes.rt)

          // North / South cars can just move up
          newNorthCars.lt = moveUpStoppedCars(carsState.northLanes.lt)
          newNorthCars.ls = moveUpStoppedCars(carsState.northLanes.ls)
          newNorthCars.rs = moveUpStoppedCars(carsState.northLanes.rs)
          newNorthCars.rt = moveUpStoppedCars(carsState.northLanes.rt)
          newSouthCars.lt = moveUpStoppedCars(carsState.southLanes.lt)
          newSouthCars.ls = moveUpStoppedCars(carsState.southLanes.ls)
          newSouthCars.rs = moveUpStoppedCars(carsState.southLanes.rs)
          newSouthCars.rt = moveUpStoppedCars(carsState.southLanes.rt)
          break
        case 'EWS':
          // East and West cars go through the light
          carsState.eastLanes.ls.forEach((car, index) => {
            if (index === 0) {
              //Drive across the light
              newWestCars.s1[0] = car
            } else {
              newEastCars.ls[index - 1] = car
            }
          })
          carsState.eastLanes.rs.forEach((car, index) => {
            if (index === 0) {
              //Drive across the light
              newWestCars.s2[0] = car
            } else {
              newEastCars.rs[index - 1] = car
            }
          })
          carsState.eastLanes.rt.forEach((car, index) => {
            if (index === 0) {
              //Turn right across the light
              newNorthCars.s2[0] = car
            } else {
              newEastCars.rt[index - 1] = car
            }
          })
          carsState.westLanes.ls.forEach((car, index) => {
            if (index === 0) {
              //Drive across the light
              newEastCars.s1[0] = car
            } else {
              newWestCars.ls[index - 1] = car
            }
          })
          carsState.westLanes.rs.forEach((car, index) => {
            if (index === 0) {
              //Drive across the light
              newEastCars.s2[0] = car
            } else {
              newWestCars.rs[index - 1] = car
            }
          })
          carsState.westLanes.rt.forEach((car, index) => {
            if (index === 0) {
              //Turn right across the light
              newSouthCars.s2[0] = car
            } else {
              newWestCars.rt[index - 1] = car
            }
          })

          // East / West cars can left turn only if there isn't a car at the front of the straight lanes they will cross
          carsState.eastLanes.lt.forEach((car, index) => {
            if (index === 0) {
              if (
                carsState.westLanes.ls[0].id === undefined &&
                carsState.westLanes.rs[0].id === undefined
              ) {
                //Turn left across the light if safe
                newSouthCars.s1[0] = car
              } else {
                //Stay in place
                newEastCars.lt[0] = car
              }
            } else {
              if (newEastCars.lt[index - 1].id === undefined) {
                //Move up
                newEastCars.lt[index - 1] = car
              } else {
                //Stay in place
                newEastCars.lt[index] = car
              }
            }
          })
          carsState.westLanes.lt.forEach((car, index) => {
            if (index === 0) {
              if (
                carsState.eastLanes.ls[0].id === undefined &&
                carsState.eastLanes.rs[0].id === undefined
              ) {
                //Turn left across the light if safe
                newNorthCars.s1[0] = car
              } else {
                //Stay in place
                newWestCars.lt[0] = car
              }
            } else {
              if (newWestCars.lt[index - 1].id === undefined) {
                //Move up
                newWestCars.lt[index - 1] = car
              } else {
                //Stay in place
                newWestCars.lt[index] = car
              }
            }
          })

          // North / South cars can just move up
          newNorthCars.lt = moveUpStoppedCars(carsState.northLanes.lt)
          newNorthCars.ls = moveUpStoppedCars(carsState.northLanes.ls)
          newNorthCars.rs = moveUpStoppedCars(carsState.northLanes.rs)
          newNorthCars.rt = moveUpStoppedCars(carsState.northLanes.rt)
          newSouthCars.lt = moveUpStoppedCars(carsState.southLanes.lt)
          newSouthCars.ls = moveUpStoppedCars(carsState.southLanes.ls)
          newSouthCars.rs = moveUpStoppedCars(carsState.southLanes.rs)
          newSouthCars.rt = moveUpStoppedCars(carsState.southLanes.rt)
          break
        default:
          break
      }

      // Randomly add news cars at the back of the lanes
      if (newNorthCars.lt[4].id === undefined)
        newNorthCars.lt[4] = generateNewCar()
      if (newNorthCars.ls[4].id === undefined)
        newNorthCars.ls[4] = generateNewCar()
      if (newNorthCars.rs[4].id === undefined)
        newNorthCars.rs[4] = generateNewCar()
      if (newNorthCars.rt[4].id === undefined)
        newNorthCars.rt[4] = generateNewCar()

      if (newEastCars.lt[4].id === undefined)
        newEastCars.lt[4] = generateNewCar()
      if (newEastCars.ls[4].id === undefined)
        newEastCars.ls[4] = generateNewCar()
      if (newEastCars.rs[4].id === undefined)
        newEastCars.rs[4] = generateNewCar()
      if (newEastCars.rt[4].id === undefined)
        newEastCars.rt[4] = generateNewCar()

      if (newSouthCars.lt[4].id === undefined)
        newSouthCars.lt[4] = generateNewCar()
      if (newSouthCars.ls[4].id === undefined)
        newSouthCars.ls[4] = generateNewCar()
      if (newSouthCars.rs[4].id === undefined)
        newSouthCars.rs[4] = generateNewCar()
      if (newSouthCars.rt[4].id === undefined)
        newSouthCars.rt[4] = generateNewCar()

      if (newWestCars.lt[4].id === undefined)
        newWestCars.lt[4] = generateNewCar()
      if (newWestCars.ls[4].id === undefined)
        newWestCars.ls[4] = generateNewCar()
      if (newWestCars.rs[4].id === undefined)
        newWestCars.rs[4] = generateNewCar()
      if (newWestCars.rt[4].id === undefined)
        newWestCars.rt[4] = generateNewCar()

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
          default:
            setCount(leftTurnCount)
            setLightState('NSL')
            break
        }
      }

      setCarsState({
        northLanes: newNorthCars,
        eastLanes: newEastCars,
        southLanes: newSouthCars,
        westLanes: newWestCars,
      })
    }

    const interval = setInterval(() => updateCarsAndLights(), turnTime)
    return () => {
      clearInterval(interval)
    }
  }, [count, lightState, carsState])

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
    lanes: carsState,
    stoplight: {
      north: [northLeft, northStraight, northStraight, northStraight],
      east: [eastLeft, eastStraight, eastStraight, eastStraight],
      south: [northLeft, northStraight, northStraight, northStraight],
      west: [eastLeft, eastStraight, eastStraight, eastStraight],
    },
  }
}

export default useCarsMove
