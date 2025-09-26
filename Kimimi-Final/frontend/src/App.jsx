
import {Outlet} from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


function App() {
  return (
  <div className='flex'>
    <ToastContainer />
    <Navigation />

    <main className='w-full'>
       <Outlet />
    </main>
  </div>
  )
}

export default App
