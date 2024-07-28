import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../common/Header'
const BookingSuccess = () => {

    const location = useLocation()
    console.log(location)
    const message = location.state?.message
    const error = location.state?.error


  return (
    <div className='container'>
        <Header title='Booking success'> 
        <div className='mt-5'>
            {message ? (
                <div>
                    <h3 className='text-success'>booking success</h3>
                    <p className='text-success'>{message}</p>
                </div>
            ):(

            <div>
                <h3 className='text-danger'>error booking room</h3>
                <p className='text-danger'>{error}</p>
            </div>

            )}
        </div>
        </Header>

    </div>
  )
}

export default BookingSuccess