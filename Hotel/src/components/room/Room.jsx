import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../utils/ApiFunction'
import RoomCard from './RoomCard'
import { Col, Container, Row } from 'react-bootstrap'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'

const Room = () => {
    const [data ,setData] = useState([])
    const[error , setError] = useState(null)
    const[isLoading , setIsLoading] =useState(false)
    const[currentPage , setCurrentPage] = useState(1)
    const[roomPerPage] = useState(6)
    const[filterData,setFilterData] = useState([{id : ""}])

    useEffect(()=>{

        setIsLoading(true)
        getAllRooms().then((data) => {
        setData(data)
        setFilterData(data)
        setIsLoading(false)
    }).catch((error)=>{
        setError(error.message)
        setIsLoading(false)
    })
  },[])
  
    if(isLoading){
        return <div>loading...</div>
    }
    if(error){
        <div>Error :  {error} </div>
    }

    const handlePageChange = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    
     // if filterdata.length= 7 and roomsperpage = 6 
    // 7/6 = 2 because we use math.Ceil(7/6)
    // so the output is 2 mean the total page is 2 

    const totalPage = Math.ceil(filterData.length/roomPerPage)
    
    const renderRooms = ()=>{
        const startIndex = (currentPage-1)* roomPerPage
        const endIndex = startIndex +roomPerPage
        return filterData.slice( startIndex , endIndex ).map((room) => <RoomCard key={room.room_id} room={room} /> )
    }




  return (
    <Container>
        <Row>
            <Col md={6} className='mb -3 mb-md-0'>
                <RoomFilter data={data} setFilteredData={setFilterData}></RoomFilter>
            </Col>
            <Col md={6} className='d-flex align-item-center justify-content-end'>
                <RoomPaginator currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
            </Col>
        </Row>

        <Row>{renderRooms()}</Row>

        <Row>
            <Col md={6} className='d-flex align-item-center justify-content-end'>
                <RoomPaginator currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
            </Col>
        </Row>



    </Container>
  )
}

export default Room