import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { TranslateProvider } from './core/component/TranslateProvider'
import store from './store'
import vi from './locales/en-vi.json'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TranslateProvider translate={ { vi } }>
        <Provider store={ store }>
          <App />
        </Provider>
      </TranslateProvider>
    </BrowserRouter>
  </React.StrictMode>
)
