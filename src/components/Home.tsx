import React from 'react'
import "./Home.css"

const Home = () => {
  return (
    // <div className='grid grid-cols-3 grid-row-3 grid-flow-row gap-4 '>  {/* Each div is a block in a 3x3 grid*/}
    <div className="container">
  <div className="grid grid-cols-3 grid-row-3 gap-6">
    <div
      className="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
      1
    </div>
    <div
      className="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
      2
    </div>
    <div
      className="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
      3
    </div>
    <div
      className="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
      4
    </div>
    <div
      className="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
      5
    </div>
    <div
      className="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl"
    >
      6
    </div>

  </div>
</div>
  )
}

export default Home
