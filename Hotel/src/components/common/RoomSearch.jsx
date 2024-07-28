import moment from 'moment'
import React, { useState } from 'react'
import { getallavailableroom } from '../utils/ApiFunction'
import { Col, Container, Form, Row , Button } from 'react-bootstrap'
import RoomTypeSelector from './RoomTypeSelector'
import RoomSearchResult from './RoomSearchResult'

const RoomSearch = () => {
    const [searchQuery , setSearchQuery] = useState({
        checkInDate : "",
        checkOutDate:"",
        roomType:""
    })

    const [errorMessage , setErrorMessage]=useState("")
    const [availableRooms,setAvailableRooms]=useState([])
    const [isLoading,setIsLoading] = useState(false)

    const handleSearch = (e)=>{
        e.preventDefault()
        const checkin = moment(searchQuery.checkInDate)
        const checkout = moment(searchQuery.checkOutDate)
        if(!checkin.isValid() || !checkout.isValid()){
            setErrorMessage("please enter valid date range")
        return
    }
    if(!checkout.isSameOrAfter(checkin)){
        setErrorMessage("checkout date must be after checkin date ")
        return
    }

    setIsLoading(true)
    getallavailableroom(searchQuery.checkInDate,searchQuery.checkOutDate,searchQuery.roomType)
    .then((response)=>{
        setAvailableRooms(response.data)
        setTimeout(() => 
            setIsLoading(false), 2000);
    }).catch((error)=>{
        console.log(error)
    }).finally(()=>{
        setIsLoading(false)
    })
}

    const handleinputChange = (e)=>{
        const{name,value}= e.target
        setSearchQuery({...searchQuery,[name]:value})
        const checkin = moment(searchQuery.checkInDate)
        const checkout = moment(searchQuery.checkOutDate)
        if(checkin.isValid() && checkout.isValid()){
            setErrorMessage("")
        }        
    }

    const clearSearch = ()=>{
        setSearchQuery({
            checkInDate:"",
            checkOutDate:"",
            roomtype:""
        })
        setAvailableRooms([])
    }
  return (
    <>
    <Container className='mt-5 mb-5 py-5 shadow'>
        <Form onSubmit={handleSearch}>
            <Row className='justify-coontent-center'>

                <Col xs={12} md={6}>
                    <Form.Group controlId='checkInDate'>
                        <Form.Label>CheckinDate</Form.Label>
                        <Form.Control type='date' name='checkInDate' value={searchQuery.checkInDate}
                        onChange={handleinputChange} min={moment().format("YYYY-MM-DD")} />
                    </Form.Group>
                </Col>


                <Col xs={12} md={6}>
                    <Form.Group controlId='checkOutDate'>
                        <Form.Label>CheckOutDate</Form.Label>
                        <Form.Control type='date' name='checkOutDate' value={searchQuery.checkOutDate}
                        onChange={handleinputChange} min={moment().format("YYYY-MM-DD")} />
                    </Form.Group>
                </Col>

                <Col xs={12} md={3}>
                    <Form.Group>
                        <Form.Label>enter a room type</Form.Label>
                        <div className='d-flex'>
                            <RoomTypeSelector handleRoomInputChange={handleinputChange} newRoom={searchQuery}/> 
                            <Button className='ml-2' type="submit" variant='secondary'>search</Button>
                        </div>
                    </Form.Group>
                </Col>

            </Row>
        </Form>

        {isLoading ? (
            <p> available rooms </p>
        ) : availableRooms ? (
            <RoomSearchResult results={availableRooms} onClearSearch={clearSearch}/>

        ):(
            <p> no rooms available for the selected date and roomtype</p>
        )}

        {errorMessage &&  <p> {errorMessage}</p>}
    </Container>
    </>
  )
}

export default RoomSearch