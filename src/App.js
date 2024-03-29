import './App.css'
import Lanes from './lanes/Lanes'
import Stoplight from './stoplight/Stoplight'
import useCarsMove from './useCarsMove/useCarsMove'

const exampleData = {
  lanes: {
    northLanes: {
      rt: [{ id: 123, color: 'white' }, {}, {}, {}, {}],
      rs: [{}, {}, {}, {}, {}],
      ls: [{}, {}, {}, {}, {}],
      lt: [{}, {}, {}, {}, {}],
      s1: [{}, {}, {}, {}, { id: 1231, color: 'blue' }],
      s2: [{}, {}, {}, {}, {}],
    },
    eastLanes: {
      rt: [{}, { id: 1234, color: 'lime' }, {}, {}, {}],
      rs: [{}, {}, {}, {}, {}],
      ls: [{}, {}, {}, {}, {}],
      lt: [{}, {}, {}, {}, {}],
      s1: [{}, {}, {}, {}, {}],
      s2: [{}, {}, {}, {}, {}],
    },
    southLanes: {
      rt: [{}, {}, { id: 1235, color: 'white' }, {}, {}],
      rs: [{}, {}, {}, {}, {}],
      ls: [{}, {}, {}, {}, {}],
      lt: [{}, {}, {}, {}, {}],
      s1: [{}, {}, {}, {}, {}],
      s2: [{}, {}, {}, {}, {}],
    },
    westLanes: {
      rt: [{}, {}, {}, { id: 1236, color: 'white' }, {}],
      rs: [{}, {}, {}, {}, {}],
      ls: [{}, {}, {}, {}, {}],
      lt: [{}, {}, {}, {}, {}],
      s1: [{}, {}, {}, {}, {}],
      s2: [{}, {}, {}, {}, {}],
    },
  },
  stoplight: {
    north: ['orange', 'red', 'red', 'red'],
    east: ['red', 'red', 'red', 'red'],
    south: ['red', 'red', 'green', 'red'],
    west: ['red', 'red', 'red', 'red'],
  },
}

function App() {
  const data = useCarsMove()
  console.log(data)

  return (
    <div className="App">
      <Lanes laneData={exampleData.lanes} />
      <Stoplight stoplightData={data.stoplight} />
    </div>
  )
}

export default App
