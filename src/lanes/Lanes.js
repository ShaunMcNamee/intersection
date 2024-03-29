import Car from '../car/Car'

const Lanes = ({ laneData }) => {
  return (
    <>
      <div className="northLanes">
        {laneData.northLanes.rt.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="south"
                className={`sb-right-turn sb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.northLanes.rs.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="south"
                className={`sb-right-straight sb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.northLanes.ls.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="south"
                className={`sb-left-straight sb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.northLanes.lt.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="south"
                className={`sb-left-turn sb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.northLanes.s1.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="north"
                className={`nb-straight-1 sb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.northLanes.s2.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="north"
                className={`nb-straight-2 sb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
      </div>

      <div className="westLanes">
        {laneData.westLanes.rt.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="east"
                className={`eb-right-turn eb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.westLanes.rs.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="east"
                className={`eb-right-straight eb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.westLanes.ls.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="east"
                className={`eb-left-straight eb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.westLanes.lt.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="east"
                className={`eb-left-turn eb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.westLanes.s1.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="west"
                className={`wb-straight-1 eb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.westLanes.s2.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="west"
                className={`wb-straight-2 eb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
      </div>

      <div className="eastLanes">
        {laneData.eastLanes.rt.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="west"
                className={`wb-right-turn wb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.eastLanes.rs.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="west"
                className={`wb-right-straight wb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.eastLanes.ls.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="west"
                className={`wb-left-straight wb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.eastLanes.lt.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="west"
                className={`wb-left-turn wb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.eastLanes.s1.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="east"
                className={`eb-straight-1 wb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.eastLanes.s2.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="east"
                className={`eb-straight-2 wb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
      </div>

      <div className="southLanes">
        {laneData.southLanes.rt.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="north"
                className={`nb-right-turn nb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.southLanes.rs.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="north"
                className={`nb-right-straight nb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.southLanes.ls.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="north"
                className={`nb-left-straight nb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.southLanes.lt.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="north"
                className={`nb-left-turn nb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.southLanes.s1.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="south"
                className={`sb-straight-1 nb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
        {laneData.southLanes.s2.map((car, index) => {
          if (car.id !== undefined) {
            return (
              <Car
                color={car.color}
                direction="south"
                className={`sb-straight-2 nb-car-${index}`}
              />
            )
          } else {
            return null
          }
        })}
      </div>
    </>
  )
}

export default Lanes
