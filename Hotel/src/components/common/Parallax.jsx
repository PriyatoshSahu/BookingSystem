import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax = () => {
  return (
    <div className='parallax mb-5'>
        <Container className='text-center px-5 py-5 justify-content-center'>
            <div className='animated-texts bounceIn'>
                <h1> welcome to <span className='hotel-color'> seaview hotel</span></h1>
                <h3>we provide the best service as per your needs</h3>
            </div>
        </Container>
    </div>
  )
}

export default Parallax