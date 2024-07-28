import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunction'


const prAacticeAddRoom = () => {
    const[newRoom , setNewRoom] =useState({
        photo:null,
        roomType :"",
        roomPrice:""
    })
    const[imagePreview , setImagePreview] =useState("")
    const[errorMessage,setErrorMesshae]=useState("")
    const[successMessage,setSuccesesMessage]=useState("")


    const handleFormInputChange = (e)=>{
        const name = e.target.name
        const value= e.target.value

        if(name==="roomPrice"){
            if(!isNaN(value)){
                value = parseInt(value)
            }
            else{
                value=""
            }
        }

        setNewRoom({...newRoom,  [name] : value})

    }

    const handleimage = (e)=>{
        const image = e.target.files[0]
        setNewRoom({...newRoom,photo:image})
        setImagePreview(URL.createObjectURL(image))

    }


    const handleSubmit = async (e)=>{
        e.preventDefault()
        const result = await addRoom(newRoom.photo,newRoom.roomPrice,newRoom.roomType)
        if(result!==undefined){
            setSuccesesMessage("room is added successfully")
            setNewRoom({photo:null,roomPrice:"",roomType:""})
            setImagePreview("")
        }
        else{
            setErrorMesshae("room not added")
        }
    }


  return (
    <>
    <div>
        <div>
            <h2>add room</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>room type</label>
                    <div>
                        <practiceRoomType handleFormInputChange={handleFormInputChange} newRoom={newRoom}/>
                    </div>
                </div>




                <div>
                    <label>room price</label>
                    <input 
                    id='roomPrice'
                    name='roomPrice'
                    value={newRoom.roomPrice}
                    onChange={handleFormInputChange}
                    type='number'>
                    </input>
                </div>


                <div>
                    <input 
                    id='roomphoto'
                    name='roomphoto'
                    value={newRoom.photo}
                    onChange={handleimage}
                    type='file'>
                    </input>
                    {imagePreview && (
                            <img src={imagePreview}
                            style={{maxWidth:"400px" , maxHeight:"400px"}}
                            className='mb-3'/>
                        )}
                </div>


                <div>
                    <Link to={"/"}> back</Link>
                    <button type='submit'>save</button>
                </div>

            </form>
        </div>
    </div>
    
    </>
  )
}

export default prAacticeAddRoom