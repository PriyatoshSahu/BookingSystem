import React,{ useEffect, useState } from "react"
import { getRoomById, updateRoom } from "../utils/ApiFunction"
import { Link, useParams } from "react-router-dom"

const EditRoom = () => {

  const [room,setRoom]=useState({
    photo : "",
    roomType : "",
    roomPrice : ""
})

let [imagePreview , setImagePreview] = useState("")
const [successMessage,setSuccessMessage] = useState("")
const [errorMessage,setErrorMessage] = useState("")
const {roomId} = useParams()
console.log(roomId)


const handleImageHandler = (e)=>{
  const selectedImage = e.target.files[0]
  setRoom({...room,photo:selectedImage})
  setImagePreview(URL.createObjectURL(selectedImage))
}

const handleRoomInputChange = (event)=>{
  const name = event.target.name
  const value = event.target.value
  setRoom({...room , [name] : value})
}


useEffect (()=>{
  const fetchRoomById = async()=>{
    try{
      const roomData = await getRoomById(roomId)
      setRoom(roomData)
      setImagePreview(roomData.photo)
      console.log(roomData.rooomPrice)
    }
    catch(error){
      // console.error(error)
    }
  }

  fetchRoomById()
},[roomId])

const handleSubmit = async (e)=>{
  e.preventDefault()

  try{
    const response = await updateRoom(roomId,room)
    if(response.status === 200){
      setSuccessMessage("room update successfully")
      const updateRoomData = await getRoomById(roomId)
      setRoom(updateRoomData)
      setImagePreview(updateRoomData.photo)
      setErrorMessage("")
    }
    else{
      setErrorMessage("not update")
    }
  }
  catch(error){
    console.error(error)
    setErrorMessage(error.message)
  }


}



  return (
    <>
    <div className='container , mt-5 mb-5'>
    <h2 className='mt-5 mb-2'>Edit Room</h2>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6 '>
                
                {successMessage && (
                    <div className='alert alert-success' role="alert"> {successMessage} </div>
                )}
                
                {errorMessage && (
                    <div className='alert alert-danger fade show'> {errorMessage} </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='roomType' className='form-label'>Room Type</label>
                        <input type="text"
                        className="form-control"
                        id="roomType"
                        name="roomType"
                        // value={room.roomType}
                        onChange={handleRoomInputChange}></input>

                    </div>


                    <div className='mb-3'>
                        <label htmlFor='roomPrice' className='form-label'>Room Price</label>
                        <input
                        className='form-control'
                        id='roomPrice'
                        type='number'
                        name='roomPrice'
                        // value={room.roomPrice}
                        onChange={handleRoomInputChange}
                        />
                    </div>


                    <div className='mb-3'>
                        <label htmlFor='photo' className='form-label'>Room Image</label>
                        <input
                        id='photo'
                        name='photo'
                        type='file'
                        className='form-control'
                        onChange={handleImageHandler}
                        />
                        {imagePreview && (
                            <img src={`data:image/jpeg;base64, ${imagePreview}`}
                            style={{maxWidth:"400px" , maxHeight:"400px"}}
                            className='mt-3'/>
                        )}
                    </div>

                    <div className='d-grid d-flex mt-2'>
                      <Link to={"/existing-room"}>back</Link>
                        <button className='btn btn-outline-primary ml-5' type="submit">
                            Edit Room
                        </button>
                    </div>

                </form>
            </div>

        </div>
    </div>
    
    
    </>
  )
}

export default EditRoom