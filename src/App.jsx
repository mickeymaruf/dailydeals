import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from './app/store'
import router from './Routes/Routes'
import './styles/App.css'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
