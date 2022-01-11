import React from 'react'
import { Provider } from 'react-redux'
import IndexRouter from './router/IndexRouter'
import './App.css'
import store from './redux/store'

function App() {
  return <Provider store={store}><IndexRouter /></Provider>
}

export default App
