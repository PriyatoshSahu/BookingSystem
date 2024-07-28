import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '/node_modules/bootstrap/dist/js/bootstrap.min.js'
import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms'
import RoomFilter from './components/common/RoomFilter'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './components/home/Home'
import EditRoom from './components/room/EditRoom'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import CheckOut from './components/booking/CheckOut'
import BookingSuccess from './components/booking/BookingSuccess'
import Bookings from './components/booking/Bookings'
import FindBooking from './components/booking/FindBooking'
const App = () => {
  return (
    <>
    <main>
      
    

    {/* <BrowserRouter>
    <Routes>
      <Route>
      </Route>
    </Routes>
   </BrowserRouter> */}

   <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/edit-room/:roomId' element={<EditRoom/>} />
      <Route path='/existing-room' element={<ExistingRooms/> } />
      <Route path='/add-room' element={<AddRoom/>} /> 
      <Route path='/browse-all' element={<RoomListing/>}/>
      <Route path='/Admin' element={<Admin/>}/>
      <Route path='/book-room/:roomId' element={<CheckOut/>}></Route>
      <Route path='/booking-success' element={<BookingSuccess/>}> </Route>
      <Route path="/existing-booking" element={<Bookings/>}></Route>
      <Route path='/find-booking' element={<FindBooking/>}></Route>
    </Routes>
   </Router>
   <Footer/>


   </main>
    </>
  )
}

export default App