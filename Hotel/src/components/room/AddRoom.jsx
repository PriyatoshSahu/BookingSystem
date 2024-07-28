import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunction'
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom'

const AddRoom = () => {
    const [newRoom,setNewRoom]=useState({
        photo : null,
        roomType : "",
        roomPrice : ""
    })
    const[imagePreview , setImagePreview] = useState("")
    const [successMessage,setSuccessMessage] = useState("")
    const [errorMessage,setErrorMessage] = useState("")


    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        
        
        if(name === "roomPrice"){
            if(!isNaN(value)){
               value = parseInt(value)
            }
            else{
                value=""
            }
        }

        setNewRoom({...newRoom, [name]:value})
    }

    const handleImageHandler = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom,photo:selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    
    }

const handleSubmit = async (e) => {

    e.preventDefault()
    try{
        const success = await addRoom(newRoom.photo,newRoom.roomType,newRoom.roomPrice)
        if(success!==undefined){
            setSuccessMessage("room is added to the database")
            setNewRoom({photo:null,roomType:"",roomPrice:""})
            setImagePreview("")
            setErrorMessage("")
        }
        else{
            setErrorMessage("error adding room to the database")
        }
    }
    catch(error){
        setErrorMessage(error.message)
    }
}



  return (
    <>
    <section className='container , mt-5 mb-5'>
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6 '>
                <h2 className='mt-5 mb-2'>Add a New Room</h2>
                
                {/* {successMessage && ...}: This is a JavaScript expression used within JSX to conditionally render 
                the alert component. It's essentially a short-circuit evaluation. */}
                
                {successMessage && (
                    <div className='alert alert-success fade show'> {successMessage} </div>
                )}
                
                {errorMessage && (
                    <div className='alert alert-danger fade show'> {errorMessage} </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='roomType' className='form-label'>Room Type</label>
                        <div>
                            
                            <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>

                        </div>
                    </div>



     {/* htmlFor='roomPrice': This specifies that the label is associated with the form element whose id attribute is set to 'roomPrice'.
   
     when a user clicks on the label, it focuses on the form element with the corresponding id, making it more accessible and 
     user-friendly. In your case, clicking on the "Room Price" label would automatically focus the cursor in the input field with
     the id attribute set to 'roomPrice'. */}

                    <div className='mb-3'>
                        <label htmlFor='roomPrice' className='form-label'>Room Price</label>
                        <input
                        className='form-control'
                        required
                        id='roomPrice'
                        type='number'
                        name='roomPrice'
                        // The value attribute is used to set the initial value of the input field.
                        value={newRoom.roomPrice}
                        // The onChange event handler is triggered whenever the value of the input field changes, i.e., when the user types in or modifies the value
                        onChange={handleRoomInputChange}
                        />
                    </div>


                    <div className='mb-3'>
                        <label htmlFor='photo' className='form-label'>Room Photo</label>
                        <input
                        id='photo'
                        name='photo'
                        type='file'
                        className='form-control'
                        onChange={handleImageHandler}
                        />
                        {imagePreview && (
                            <img src={imagePreview}
                            style={{maxWidth:"400px" , maxHeight:"400px"}}
                            className='mb-3'/>
                        )}
                    </div>
                    <div className='d-grid d-flex mt-2'>
                        <Link to={"/existing-room"} className='btn btn-outline-info ' >  back </Link>

                        <button className='btn btn-outline-primary ml-5'>
                            Save Room
                        </button>
                    </div>

                </form>
            </div>

        </div>
    </section>
    
    
    </>
  )
}

export default AddRoom