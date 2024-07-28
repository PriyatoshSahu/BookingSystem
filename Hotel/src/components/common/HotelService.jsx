import React from 'react'
import { Card, Col, Container , Row } from 'react-bootstrap'
import Header from './Header'
import { FaRegClock } from "react-icons/fa6";
import { IoIosWifi } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";
import { FaCarAlt } from "react-icons/fa";
import { IoBeerOutline } from "react-icons/io5";
import { FaSnowflake } from "react-icons/fa";


const HotelService = () => {
  return (
    <>
    <Container className='mb-2 '>

        <Header title={"our services"} />
        
        <Row>
            <h3 className='text-center'>
                services at <span className='hotel-color'> seaview hotel</span>
                 <div>
                    <span className='gap-6 ml-5'> 
                    <FaRegClock />  24 hour front desk
                    </span>
                 </div>
            </h3>
        </Row>
        
        <hr/>

        <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
            <Col>
             <Card>
                <Card.Body>

                    <Card.Title className='hotel-color'>

                    <IoIosWifi /> wifi

                    </Card.Title>

                    <Card.Text>enjoy high speed internet</Card.Text>

                </Card.Body>
             </Card>
            </Col>


            <Col>
            <Card>
                <Card.Body>
                    
                    <Card.Title className='hotel-color'>

                    <FaUtensils /> BreakFst

                    </Card.Title>

                    <Card.Text>enjoy delicious breakfast</Card.Text>

                </Card.Body>
            </Card>
            </Col>


            <Col>
            <Card>
                <Card.Body>
                    
                    <Card.Title className='hotel-color'>

                    <GiWashingMachine /> Laundary

                    </Card.Title>

                    <Card.Text>get your laundary within 30 minute</Card.Text>

                </Card.Body>
            </Card>
            </Col>


            <Col>
            <Card>
                <Card.Body>
                    
                    <Card.Title className='hotel-color'>

                    <FaCarAlt /> Parking

                    </Card.Title>

                    <Card.Text>Parking is free </Card.Text>

                </Card.Body>
            </Card>
            </Col>


            <Col>
            <Card>
                <Card.Body>
                    
                    <Card.Title className='hotel-color'>

                    <IoBeerOutline /> Mini-Bar

                    </Card.Title>

                    <Card.Text>Get your mini-bar in your room</Card.Text>

                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card>
                <Card.Body>
                    
                    <Card.Title className='hotel-color'>

                    <FaSnowflake /> Air-Conditioner

                    </Card.Title>

                    <Card.Text>Get your own AC in your room</Card.Text>

                </Card.Body>
            </Card>
            </Col>



        </Row>

    </Container>
    </>
  )
}

export default HotelService