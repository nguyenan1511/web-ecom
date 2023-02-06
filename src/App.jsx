import { Suspense, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routers from './router'
import 'antd/dist/antd.css';
import { GlobalStyle } from './GlobalStyle';

function App() {
  const [ count, setCount ] = useState(0)

  const element = useRoutes(routers)
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={ <div>...LOADING...</div> }>

        { element }

      </Suspense>
    </>
  )
}

export default App
