import React, { useState } from 'react'

const RoomFilter = ({data,setFilteredData}) => {
    const [filter ,setFilter] = useState("")

    
    const handleSelectCahange = (e)=>{
        
        //  Extract the selected room type from the event target's value
        const selectedRoomType = e.target.value

        //  Update the filter state with the selected room type
        setFilter(selectedRoomType);


        // The includes() method is a JavaScript array method that determines whether an array includes a certain element,
        //  returning true or false as appropriate.
        //  here the filter method is used a inbuilt method of js to filter data


        // all the room filtered based upon the roomtype after filtering we set them to the setfilterdata
        if(data){
        const filteredRooms = data.filter((room) => room.roomtype.toLowerCase().includes(selectedRoomType.toLowerCase()));
        setFilteredData(filteredRooms);
    }
    }
    const clearFilter = ()=>{
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes= ["", ...new Set(data.map((room)=> room.roomtype))]


  return (
    <div className='input-group mb-3'>
        <span className='input-group-text' id='room-type-filter'>Filter Room By Type</span>
        
        <select className='form-select'
         aria-label='room type filter'
         value={filter}
          onChange={handleSelectCahange}>

            <option value="">
                Select a Room Type To Filter
            </option>
            
            {roomTypes.map((type , index)=>(
                <option key={index} value={String(type)}> 
                {String(type)} 
                </option>
            ))}
        </select>

        <button className='btn btn-hotel ' type='button' onClick={clearFilter}>
            clear filter
        </button>
    </div>
  )
}

export default RoomFilter