import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunction'
import { useNavigate, useParams } from 'react-router-dom'
import moment from "moment"
import { Form, FormControl ,Button } from 'react-bootstrap'
import BookingSummary from './BookingSummary'

const BookingForm = () => {
    const[isValidated , setIsValidated] = useState(false)
    const[isSubmitted , setIsSubmitted] = useState(false)
    const[errorMessage , setErrorMessage] = useState("")
    const[roomPrice , setRoomPrice] = useState(0)

    const[booking ,setBooking]= useState({
        guestName: "",
        guestEmail:"",
        checkInDate:"",
        checkOutDate:"",
        numberOfAdults:"",
        numberOfChildren:"" 
       })

       const{roomId}= useParams()
       const navigate = useNavigate()

       const[roomInfo , setRoomInfo ]= useState({
        photo:"",
        roomType:"",
        roomPrice:""
       })


       const handleInputChange = (e)=>{
        // const{name,value}= e.target
        const name = e.target.name
        const value= e.target.value
        setBooking({...booking , [name]:value})
        setErrorMessage("")
       }
       

       
	const getRoomPriceById = async (roomId) => {
		try {
			const response = await getRoomById(roomId)
			setRoomPrice(response.rooomPrice)
		} catch (error) {
			// throw new Error(error)
		}
	}

	useEffect(() => {
		getRoomPriceById(roomId)
	}, [roomId])


    //    useEffect(()=>{
    //     if(room_id){
    //     getRoomPriceById(room_id)
    // }
    //    },[room_id])


       const calculatePayment= ()=>{
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate, 'days')
        const paymentPerDay = roomPrice ? roomPrice : 0
        return diffInDays*paymentPerDay
       }

       const isGuestCountValid = ()=>{
        const adultCount = (booking.numberOfAdults)
        const childrenCount = (booking.numberOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount>=1 && adultCount>=1
       }


       const isCheckOutDateValid = ()=>{
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Check out date must be after checkin date")
            return false
        }
        else{
            setErrorMessage("")
            return true
        }
       }


       const handleSubmit =  async(e)=>{
        e.preventDefault()
        const form = e.currentTarget
        if(form.checkValidity() === false ||  !isGuestCountValid() || !isCheckOutDateValid()){
            e.stopPropagation()
        }
        else{
            setIsSubmitted(true)
            
        }
        setIsValidated(true)
       }



       const handleFormsSubmit = async()=>{
        try{
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", { state : { message : confirmationCode } } )

        }

        catch(error){
            setErrorMessage(error.message)
            // console.log(errorMessage)
            navigate("/booking-success", { state : { error : error.message } } )
        }
       }







  return (
    <>
    <div className='container mb-5'>

        <div className='row'>
            <div className='col-md-7'>
                <div className='card card-body mt-5'>
                    <h4 className='card card-title'>Reserve Room</h4>
                    <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                  
                    <Form.Group>
                            <Form.Label htmlFor="guestName">Full Name</Form.Label>
                            <FormControl
                            required 
                            type='text' 
                            id='guestName' 
                            name='guestName'
                            value={booking.guestName}
                            placeholder='enter your full name'
                            onChange={handleInputChange}/>
                            <Form.Control.Feedback type="invalid">
                                please enter your full name
                            </Form.Control.Feedback>
                   </Form.Group>




                  <Form.Group>
                            <Form.Label htmlFor="guestEmail">Email</Form.Label>
                            <FormControl 
                            required 
                            type='email' 
                            id='guestEmail'
                            name='guestEmail'
                            value={booking.user_Email}
                            placeholder='enter your email'
                            onChange={handleInputChange}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                please enter your email
                            </Form.Control.Feedback>
                </Form.Group>


                     <fieldset style={{border:"2px"}}>
                        <legend>lodging period</legend>
                        <div className='row'>

                        <div className='col-6'>
                         <Form.Label htmlFor="checkInDate">CheckIn date</Form.Label>
                            <FormControl required 
                            type='date' 
                            id='checkInDate'
                            name='checkInDate'
                            value={booking.checkinDate}
                            placeholder='checkin date'
                            min={moment().format("MMM Do, YYYY")}
                            onChange={handleInputChange}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                please select check in date
                            </Form.Control.Feedback>
                        </div>


                        <div className='col-6'>
                         <Form.Label htmlFor="checkOutDate">Checkout date</Form.Label>
                            <FormControl required 
                            type='date' 
                            id='checkOutDate'
                            name='checkOutDate'
                            value={booking.checkoutDate}
                            placeholder='checkout date'
                            min={moment().format("YYYY-MM-DD")}
                            onChange={handleInputChange}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                please select check out date
                            </Form.Control.Feedback>
                        </div>

                        {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                        </div>
                     </fieldset>


                     <fieldset>
                        <legend>Number Of Guest</legend>
                        
                        <div className='row'>

                        <div className='col-6'>
                         <Form.Label htmlFor="numberOfAdults">Adults</Form.Label>
                            <FormControl required 
                            type='number' 
                            id='numberOfAdults'
                            name='numberOfAdults'
                            value={booking.numberOfAdults}
                            placeholder='number of adults'
                            min={1}
                            onChange={handleInputChange}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                please select at least 1 adult
                            </Form.Control.Feedback>
                        </div>

                        <div className='col-6'>
                         <Form.Label htmlFor="numberOfChildren">Children</Form.Label>
                            <FormControl required 
                            type='number' 
                            id='numberOfChildren'
                            name='numberOfChildren'
                            value={booking.children}
                            placeholder='number of children'
                            onChange={handleInputChange}>
                            </FormControl>
                            <Form.Control.Feedback type="invalid">
                                please select children 
                            </Form.Control.Feedback>
                        </div>

                        </div>
                     </fieldset>

                     <div className='form-group mb-2 mt-2'>
                        <button className='btn btn-hotel' type='submit'>continue</button>
                     </div>
                    </Form>
                </div>
            </div>
            <div className='col-md-5'>
                {isSubmitted &&  (
                     <BookingSummary booking={booking}
                      payment={calculatePayment()}
                      isFormValid={isValidated}
                      onConfirm={handleFormsSubmit}
                      />
                )}
            </div>
        </div>
    </div>
    
    </>
  )
}

export default BookingForm