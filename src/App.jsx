import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AdminContext } from './context/AdminContext';
import AddStation from './pages/Admin/AddStation';
import AllAppointment from './pages/Admin/AllAppointment';
import Dashboard from './pages/Admin/Dashboard';
import StationList from './pages/Admin/StationList';
import Login from './pages/Login';

const App = () => {

  const { aToken } = useContext(AdminContext)


  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <Navbar />
      <ToastContainer />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointment' element={<AllAppointment />} />
          <Route path='/add-station' element={<AddStation />} />
          <Route path='/station-list' element={<StationList />} />
        </Routes>
      </div>
    </div>
  ) : (

    <>

      <Login />
      <ToastContainer />

    </>

  )
}

export default App
