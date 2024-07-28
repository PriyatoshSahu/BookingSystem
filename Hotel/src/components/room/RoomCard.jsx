
// this component is for the room card which one you see in the Browse All Rooms link 


import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// This uses Bootstrap's grid system to define a column. It specifies that the column 
// should take up 12 grid units on extra small devices and adds some margin at the bottom.

const RoomCard = ({ room }) => {
  return (


    // <Card>: This is a Bootstrap component representing a card.
    // <Card.Body className='d-flex flex-wrap align-items-center'>: This sets up the card body with flexbox to arrange its children in a row. It also wraps its content to ensure it doesn't overflow.


   <Col key={room.room_id} className='mb-4' xs={12}>
   <Card>
    <Card.Body className='d-flex flex-wrap align-items-center'>
        <div className='flex-shrrink-0 mr-3 mb-3 mb-md-0'>
            
            <Link to={`/book-room/${room.roomId}`} className='btn btn-hotel btn-sm'>

            
            <Card.Img variant='top' src={`data:img/png;base64, ${room.photo}`}
            alt='Room photo'
            style={{width:"100%" , maxWidth:"200px" , height:"auto" }} />

            </Link>
        </div>

        <div className='flex-grow-1 ml-3 px-5'>
            <Card.Title className='hotel-color' > {room.roomtype}</Card.Title>
            <Card.Title className='room-price' > {room.rooomPrice}</Card.Title>
            <Card.Text> Some Room Information </Card.Text>
        </div>
        
        <div className='flex-shrink-0 mt-3'>
            <Link to={`/book-room/${room.room_id}`} className='btn btn-hotel btn-sm'>
                Book Now 
                 </Link>

        </div>
    </Card.Body>
    </Card>
    </Col>
  )
}

export default RoomCard