import Layout from './Components/Layout'
import ScatterChart from './Components/ScatterChart'

function App() {
  // Sample data
  const data = [
    { x: 1, y: 23 },
    { x: 2, y: 3 },
    { x: 3, y: 15 },
    { x: 4, y: 35 },
    { x: 5, y: 45 },
    { x: 6, y: 25 },
    { x: 7, y: 17 },
    { x: 8, y: 32 },
    { x: 9, y: 43 }
  ]
  return (
    <Layout>
      <ScatterChart width={400} height={400}></ScatterChart>
    </Layout>
  )
}

export default App
