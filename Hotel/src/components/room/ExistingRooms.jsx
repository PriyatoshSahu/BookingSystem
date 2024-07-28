import React, { useEffect, useState } from 'react'
import { deleteRooms,getAllRooms } from '../utils/ApiFunction'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { Col, Row } from 'react-bootstrap'
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";



//  The rooms state holds an array of room objects, where each object contains properties like 
//  room_id, roomType, and roomPrice. The setRooms function is used to update the state 


//   filteredRooms and setFilteredRooms: These state variables hold the filtered list of rooms based
//   on certain criteria, such as room type.

//  selectedRoomType and setSelectedRoomType: These state variables store the currently selected room type.
//  They are typically used in conjunction with filtering to determine which type of rooms to display.
//   When selectedRoomType changes, the list of rooms is filtered accordingly to show only rooms of the selected type.

const ExistingRooms = () => {
    const [rooms , setRooms]= useState([{ id: "", roomType: "", roomPrice: "" }])
    const [ currentPage , setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(8)
    const [isLoading , setIsLoading] = useState(false)
    const [filteredRooms , setFilteredRooms] = useState([{ id: "", roomType: "", roomPrice: "" }])
    const [selectedRoomTyp, setSelectedRoomTyp]=useState("")
    const [successMessage,setSuccessMessage]= useState("")
    const [errorMessage,setErrorMessage]= useState("")




    // useEffect(() => {
    //     const fetchData = () => {
    //         setIsLoading(true);
            
    //           getAllRooms().then((result) => {
    //                 setRooms(result);
    //                 setIsLoading(false);
    //             })
    //             .catch((error) => {
    //                 setErrorMessage(error.message);
    //                 setIsLoading(false);
    //             });
    //     };
    
    //     fetchData();
    
    // }, []);




    useEffect(()=>{
        fetchRooms()
    },[])


    const fetchRooms = async()=>{
        setIsLoading(true)
        try{
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)
        }
        catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    } 




    useEffect(()=>{
        if(selectedRoomTyp===""){
            setFilteredRooms(rooms)

        }
        else{
            // const filterRooms = rooms.filter((room)=>room.roomType === selectedRoomTyp) -->> this is line is an extra line if you write its fine if you dont write its also fine 

            setFilteredRooms(selectedRoomTyp)
        }
        setCurrentPage(1)
    }, [rooms,selectedRoomTyp])





    const handlePaginationClick = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }


    
    const handledeleteRooms = async (roomId)=>{
        try{
            const result =await deleteRooms(roomId)
            if(result === ""){
                setSuccessMessage(`Room no ${roomId} is delete`)
                fetchRooms()
            }
            else{
                console.error(`error deleting room ${result.message}`)
            }
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        },3000)
    }





    const calculatePages = (filteredRooms,roomsPerPage,rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)

    //  if there are any filtered rooms (filteredRooms) available. If there are, it sets totalRooms to the length
    //  of the filtered rooms array (filteredRooms.length). Otherwise, if no rooms are filtered, it sets totalRooms 
    //  to the length of the original rooms array (rooms.length). This ensures that the pagination reflects either the
    //  filtered rooms or all available rooms, depending on the filtering state.



        // example suppose the totalrooms is 6 and the roomsperpage is 8 
        // so if you write math.ceil(6/8) the output is 1 
        // and if the totalroom is 9 or above than 8 at that time math.ceil(9/8) the output is 2 
        // 
    }


    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom-roomsPerPage
    const currentRoom = filteredRooms.slice(indexOfFirstRoom,indexOfLastRoom)



  return (
    <>
    {isLoading ? (
        <p>loading</p>
    ): (
        <>
        <section className='container mt-5 mb-5'>
            <div className='d-flex justify-content-between mb-3 mt-5'>
                <h2>existing rooms</h2>
            </div>

           <Row>
             
                <Col md={6} className='mb-3 mb-md-0'>
                     <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/> 
                </Col>

                <Col md={6} className='d-flex justify-content-end'>
                    <Link to={"/add-room"}>
                        <FaRegPlusSquare />Add Room      
                    </Link>
                </Col>
                          
            </Row>

            <table className='table table-bordered table-hover'>
                <thead >
                    <tr className='text-center'>
                        <th>Id</th>
                        <th>RoomType</th>
                        <th>RoomPrice</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {currentRoom.map((room)=>(
                        <tr  key={room.room_id} className='text-center'>
                            <td>{room.room_id}</td>
                            <td>{room.roomtype}</td>
                            <td>{room.rooomPrice}</td>
                            <td>

                                <Link to={`/edit-room/${room.room_id}`}>
                                    <span className='btn btn-info btn-sm'>< IoEyeOutline/></span>
                                    <span className='btn btn-warning btn-sm'><FaEdit /></span>
                                </Link>
                                

                                <button 
                                className='btn btn-danger btn-sm'
                                onClick={()=>{
                                handledeleteRooms(room.room_id)}}>
                                <FaTrash />
                                </button>
                            
                            </td>
                            
                        </tr>
                    ))}

                </tbody>
            </table>
            <RoomPaginator currentPage={currentPage} 
            totalPage={calculatePages(filteredRooms,roomsPerPage,rooms)} 
            onPageChange={handlePaginationClick} />

        </section>
        </>
    )}
    </>
  )
}

export default ExistingRooms