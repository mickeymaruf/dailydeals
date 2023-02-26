import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { setAuthToken } from './features/auth/authSlice'
import router from './Routes/Routes'
import './styles/App.css'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuthToken(localStorage.getItem('DAILY_DEALS_ACCESS_TOKEN')))
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
