import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cancelBooking, getAllBooking } from '../utils/ApiFunction'
import Header from '../common/Header'
import BookingsTable from './BookingsTable'

const Bookings = () => {
  const[bookingInfo,setBookingInfo] = useState([])
  const[isLoading, setIsLoading]=useState(true)
  const[error,setError]=useState("")

  useEffect(()=>{
    setTimeout(()=>{
      getAllBooking().then((data)=>{
        setBookingInfo(data)
        setIsLoading(false)
      }).catch((error)=>{
        setError(error.message)
        setIsLoading(false)
      })
    },1000)
  },[])

  const hanldeBookingCancelation = async(booking_id)=>{
    try{
      await cancelBooking(booking_id)
      const data= await getAllBooking()
      setBookingInfo(data) 
    }
    catch(error){
      setError(error.message)
    }


  }
  return (
    <section className='ocntainer'style={{backgroundColor:"whitesmoke"}} >
      <Header title={"existing booking"}/>
      {error && <div className='text-danger'>{error}</div>}
      {isLoading ? (<div>loading existing booking</div>) : (<BookingsTable bookingInfo={bookingInfo} handleBookingCancelation={hanldeBookingCancelation}/>)}
    </section>
  )
}

export default Bookings