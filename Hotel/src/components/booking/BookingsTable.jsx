import React, { useEffect, useState } from 'react'
import { parseISO } from 'date-fns'
import DateSlider from '../common/DateSlider'

const BookingsTable = ({bookingInfo,handleBookingCancelation}) => {    
    const [filterBooking,setFilterBooking]=useState([bookingInfo])

    const getbooking = (startDate,endDate)=>{
        let filter = bookingInfo
        if(startDate && endDate){
            filter = bookingInfo.filter((booking)=>{
            const bookingstartdate = parseISO(booking.checkinDate)
            const bookingenddate = parseISO(booking.checkoutDate)
            // console.log(booking.booking_id)
            return bookingstartdate >= startDate && bookingenddate<= endDate && bookingenddate > startDate

        })
        }
        setFilterBooking(filter)
    }
    useEffect(()=>{
        
        setFilterBooking(bookingInfo)
    },[bookingInfo])



  return (
    
    <section>
        <DateSlider onDateChange={getbooking} onFilterChange={getbooking} />
        <table className='table table-bordered tsble-lover shadow'>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking Id</th>
                    <th>Room id</th>
                    <th>Check-in-date</th>
                    <th>Check-out-date</th>
                    <th>Guestname</th>
                    <th>Guestemail</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Total number of guest</th>
                    <th>Confirmation Code</th>
                    <th colSpan={2}> action </th>
                </tr> 
            </thead>

            <tbody>
                {filterBooking.map((booking,index)=>(
                    <tr>
                        <td>{index+1}</td>
                        <td>{booking.roombooking_id}</td>
                        <td>{booking.room ?.room_id}</td>
                        <td>{booking.checkinDate}</td>
                        <td>{booking.checkoutDate}</td>
                        <td>{booking.user_FullName}</td>
                        <td>{booking.user_Email}</td>
                        <td>{booking.numberOfAdults}</td>
                        <td>{booking.children}</td>
                        <td>{booking.totalNumberOfGuest}</td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td>
                            <button onClick={()=>handleBookingCancelation(booking.booking_Id)}>cancel</button>
                        </td>
                    
                        
                        
                    </tr>
                ))}
            </tbody>

        </table>
        {filterBooking.length===0 && <p> no boking found for the selected dates</p>}
    </section>
  )
}

export default BookingsTable