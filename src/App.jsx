import { Suspense, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routers from './router'
import 'antd/dist/antd.css';

function App() {
  const [ count, setCount ] = useState(0)

  const element = useRoutes(routers)
  return (
    <>
      <Suspense fallback={ <div>...LOADING...</div> }>

        { element }

      </Suspense>
    </>
  )
}

export default App
