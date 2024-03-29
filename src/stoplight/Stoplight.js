const Stoplight = ({ stoplightData }) => {
  return (
    <div className="stoplights">
      {stoplightData.north.map((color, index) => (
        <div
          style={{
            backgroundColor: color,
            gridColumn: 4 - index,
            gridRow: 1,
          }}
        />
      ))}
      {stoplightData.east.map((color, index) => (
        <div
          style={{
            backgroundColor: color,
            gridColumn: 7,
            gridRow: 4 - index,
          }}
        />
      ))}
      {stoplightData.south.map((color, index) => (
        <div
          style={{
            backgroundColor: color,
            gridColumn: index + 4,
            gridRow: 7,
          }}
        />
      ))}
      {stoplightData.west.map((color, index) => (
        <div
          style={{
            backgroundColor: color,
            gridColumn: 1,
            gridRow: index + 4,
          }}
        />
      ))}
    </div>
  )
}

export default Stoplight
