import React, { useState } from 'react'
import { cancelBooking } from '../utils/ApiFunction'
import { getConfirmationCode } from '../utils/ApiFunction'
const FindBooking = () => {
    
    const[confirmation,setConfirmation] =useState("")
    const[error , setError] = useState("")
    const[isLoading , setIsLoading]= useState(false)
    const[isDelete, setIsDelete] = useState(false)
    const[successMessage,setSuccessMessage] = useState("")
    const[bookingInfo , setBookingInfo] = useState({
        id:"",
        room:{room_id:""},
        bookingConfirmationCode:"",
        roomnumber:"",
        guestName:"",
        guestEmail:"",
        checkindate:"",
        checkoutdate:"",
        numberofadults:"",
        numberofchildren:"",
        totalnumberofguest:""
        
    })

    const clearbookinginfo = { 
     id:"",
    room:{room_id:""},
    bookingConfirmationCode:"",
    roomnumber:"",
    guestName:"",
    guestEmail:"",
    checkindate:"",
    chechoutdate:"",
    numberofadults:"",
    numberofchildren:"",
    totalnumberofguest:""
}




const handleInputChange = (e)=>{
    setConfirmation(e.target.value)
}




const handleFormSubmit =  async(e)=>{
    e.preventDefault()
    setIsLoading(true)

    try{
        const result = await getConfirmationCode(confirmation)
        setBookingInfo(result)
        setError("")
    }

    catch(error){
        setBookingInfo(clearbookinginfo)
        if(error.response && error.response.status === 404){
        setError(error.response.result.message)
    }
    else{
        setError(error.response)
        }
      }
       setTimeout(() => {
          setIsLoading(false)
        },2000)
    }



const handleBookingCancelation = async(bookingId)=>{
    try{
        const result = await cancelBooking(bookingInfo.roombooking_id)
        setSuccessMessage("booking has been canceled successfully")
        setIsDelete(true)
        setBookingInfo(clearbookinginfo)
        setConfirmation("")
        setError("")
    }

    catch(error){
        setError(error.message)
    }
}
    


  return (
     <>
     <div className='container d-flex flex-column justify-content-center align-items-center'>  
        <h2>find my booking</h2>
        <form onSubmit={handleFormSubmit} className='col-md-6'>
            <div className='input-group mb-3 '>
                <input 
                className='form-control'
                type='text' 
                onChange={handleInputChange}
                id='confirmation'
                name='confirmation'
                placeholder='enter confirmation code of booking'
                value={confirmation}
                />

                <button type='submit' className='btn btn-hotel input-group-text'>find booking</button>
            </div>
         </form>

                {isLoading ? (
                    <div>find bookingo</div>
                ) : error ? (
                    <div>{error}</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div>
                        <h3>booking Confirmation</h3>
                        <p>BookingConfirmation : {bookingInfo.bookingConfirmationCode}</p>
                        <p> booking id : {bookingInfo.roombooking_id}</p>
                        <p> room number : {bookingInfo.room.room_id}</p>
                        <p>checkindate : {bookingInfo.checkinDate}</p>
                        <p>checkoutDate : {bookingInfo.checkoutDate}</p>
                        <p>full name : {bookingInfo.user_FullName}</p>
                        <p>email : {bookingInfo.user_Email}</p>
                        <p>adult : {bookingInfo.numberOfAdults}</p>
                        <p>children : {bookingInfo.children}</p>
                        <p>totalnumberofguest : {bookingInfo.totalNumberOfGuest}</p>


                        {!isDelete && (
                            <button onClick={()=>handleBookingCancelation(bookingInfo.bookindId)}>cancel booking</button>
                        )}
                    </div>
                ):(
                    <div> find booking </div>
                )}

                {isDelete &&(
                    <div className='alert alert-success mt-3'> booking has been cancelled successfully</div>
                )}                
            
       
     </div>
     </>
  )
}

export default FindBooking