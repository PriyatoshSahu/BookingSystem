import React, { useEffect, useState } from 'react'
import { getAllRoomTypes } from '../utils/ApiFunction'

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {



    // roomTypes:                  Stores an array of room types fetched from the API.
    // showNewRoomTypeInput:       Controls the visibility of the input field for adding a new room type.
    // newRoomType:                Stores the value entered into the input field for adding a new room type.

    const [roomTypes , setRoomTypes] =useState([""])
    const[showNewRoomTypeInput , setShowNewRoomTypeInput]=useState(false)
    const[newRoomType,setNewRoomType]=useState("")


    // useEffect: This hook is used to fetch all room types from the API when the component mounts ([] as
    //  the dependency array ensures it runs only once). It updates the roomTypes state with the fetched data.

    useEffect(()=>{
        getAllRoomTypes().then((data)=>{
            setRoomTypes(data)
        })
        .catch(error => {
            console.error("Error fetching room types:", error)
        })
    },[])
    
    // handleNewRoomInputChange: This function is called when
    //  the value of the input field for adding a new room type changes. It updates the newRoomType state with the new value.

    const handleNewRoomInoutChange=(e)=>{
        setNewRoomType(e.target.value)
    }
    

    // handleAddNewRoomType: This function is called when the user clicks the "Add" button to add a new room type. It first checks
    //  if the newRoomType state is not equal to an empty string it adds the new roomtype to the roomTypes array, and make the 
    //  newRoomType state to an empty string, and hides the input field for adding a new room type (showNewRoomTypeInput is set 
    // to false).

    const handleAddNewRoomType = ()=> {
        if(newRoomType!==""){
            setRoomTypes([...roomTypes,newRoomType])
            handleRoomInputChange({ target: { name: "roomType", value: newRoomType }})
            setNewRoomType("")
            setShowNewRoomTypeInput(false)

        }
    }



  return (
    <>
    {roomTypes.length > 0 && (
        <div>
            <select id='roomType'
            name='roomType'
            value={newRoom.roomTypes}
            onChange={(e)=>{
                if(e.target.value=="add new"){
                    setShowNewRoomTypeInput(true)
                }
                else{
                    handleRoomInputChange(e)
                }
            }}>


                <option>
                    select  a roomType
                </option>

                <option value={"add new"}>
                    Add new Room
                </option>

                {roomTypes.map((type,index)=>(
                    <option key={index} value={type}> 
                            {type} 
                    </option>
                ))}

            </select>

            {showNewRoomTypeInput &&(
                <div className='input-group'>
                    <input className='form-control'
                    type='text'
                    placeholder='enter a new room type'
                    onChange={handleNewRoomInoutChange}
                    >
                    </input>

                    <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>
                        Add 
                    </button>
                 </div>
            )}
        </div>
    )}
    </>
  )
}

export default RoomTypeSelector