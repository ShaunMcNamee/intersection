import './App.css'
import Lanes from './lanes/Lanes'
import Stoplight from './stoplight/Stoplight'
import useCarsMove from './useCarsMove/useCarsMove'

function App() {
  const data = useCarsMove()

  return (
    <div className="App">
      <Lanes laneData={data.lanes} />
      <Stoplight stoplightData={data.stoplight} />
    </div>
  )
}

export default App
