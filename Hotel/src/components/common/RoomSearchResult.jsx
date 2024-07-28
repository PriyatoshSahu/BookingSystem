import React, { useState } from 'react'
import RoomCard from '../room/RoomCard'
import { Row } from 'react-bootstrap'
import RoomPaginator from './RoomPaginator'

const RoomSearchResult = ({results,onClearSearch}) => {
    const[currentPage ,setCurrentPage]=useState(1)
    const resultPerPage=3
    const totalResults = results.length
    const totalPages = Math.ceil(totalResults/resultPerPage)


    const handlePageChange = (pageNumber)=> {
        setCurrentPage(pageNumber)
    }

    const startIndex = (currentPage-1) * resultPerPage
    const endIndex= startIndex+resultPerPage
    const paginatedResult= results.slice(startIndex,endIndex)

     
  return (
    <>
    {results.length > 0 ? (
        <>
        <h5>search result</h5>
        <Row>
            {paginatedResult.map((room)=>(
                <RoomCard key={room.id} room={room}/>
            ))}
        </Row>


        <Row>
            {totalPages>resultPerPage && (
                <RoomPaginator currentPage={currentPage} totalPage={totalPages} onPageChange={handlePageChange} />
            )}

            <button onClick={onClearSearch}>clear search</button>
        </Row>
        </>
    ):(
        <p></p>
    )}
    
    </>
  )
}

export default RoomSearchResult