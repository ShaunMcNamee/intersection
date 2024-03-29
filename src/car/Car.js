import blue from '../images/blue.png'
import lime from '../images/lime.png'
import green from '../images/green.png'
import white from '../images/white.png'
import orange from '../images/orange.png'
import none from '../images/none.png'
import './Car.css'

const Car = ({ color, direction, className }) => {
  let carColor = orange
  switch (color) {
    case 'blue':
      carColor = blue
      break
    case 'lime':
      carColor = lime
      break
    case 'green':
      carColor = green
      break
    case 'white':
      carColor = white
      break
    case 'orange':
      carColor = orange
      break
    default:
      carColor = none
  }

  return (
    <img
      src={carColor}
      className={`car ${direction} ${className}`}
      alt="a car"
    />
  )
}

export default Car
