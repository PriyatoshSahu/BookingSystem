import React, { useEffect, useState } from 'react'
import { getAllRoomTypes } from '../utils/ApiFunction'

const practiceRoomType = ( handleFormInputChange , newRoom) => {

    const[roomtype,setRoomType]=useState("")
    const[newRoomType,SetNewRoomType]= useState("")
    const[showRoomInput ,setShowNewRoomInput]=useState("false")

    const addNewRoom = (e)=>{
        SetNewRoomType = e.target.value
    }

    useEffect(()=>{
        getAllRoomTypes().then((data)=>{
            setRoomType(data)
        })
    },[])

    const handleaddnewroom = ()=>{
        if(newRoomType!==""){
            setRoomType({...roomtype,newRoomType})
            setShowNewRoomInput(false)
            SetNewRoomType("")
        }
    }



  return (
    <>
    {roomtype.length>0 &&(
        <div>
            <select id="rootype"
            name='roomtype'
            value={newRoom.roomtype}
            onChange={(e)=>{
                if(e.target.value==="add new"){
                    setShowNewRoomInput(true)
                }
                else{
                    handleFormInputChange(e)
                }
            }}>


                <option>
                    select a roomtype
                </option>

                <option value={"add new"}>
                    add a new roomtype
                </option>

                {roomtype.map((type,index)=>(
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {showRoomInput && (
             <div>
            <input id='roomtype'
            name='roomtype'
            placeholder='enter a new roomtype'
            type='text'
            value={newRoom.roomtype}
            onChange={handleFormInputChange}>
            </input>

            <button onClick={handleaddnewroom}>add</button>
             </div>   
            )}
        </div>

  )}
    </>
  )
}

export default practiceRoomType