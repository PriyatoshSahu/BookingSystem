import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { getRoomById } from '../utils/ApiFunction'
import { IoIosWifi } from "react-icons/io";
import { FaUtensils } from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";
import { FaCarAlt } from "react-icons/fa";
import { IoBeerOutline } from "react-icons/io5";
import { FaSnowflake } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import RoomCarousel from '../common/RoomCarousel'

const CheckOut = () => {
  
  const[error,setError]=useState("")
  const[isLoading,setIsLoading]=useState(true)
  const[roomInfo,setRoomInfo]=useState({photo:"",roomType:"",roomPrice:""})
  const{roomId}=useParams()

  useEffect(()=>{
    setTimeout(()=>{
      getRoomById(roomId).then((response)=>{
        setRoomInfo(response)
        setIsLoading(false)
      }).catch((error)=>{
        setError(error)
        setIsLoading(false)
      })
    })
  },[roomId])




  return (
    <div>
      <section className='container'>
        <div className='row'>
          <div className='col-md-3 mt-5 mb-5'>
            {isLoading ? (
              <p>loading room information</p>
            ):error?(
              <p>{error}</p>

            ):(
            <div className='room-info'>
              <img src={`data:img/png;base64, ${roomInfo.photo}`} alt='room photo'
                style={{width:"90%", height:'200px' }}>  
              </img>
              <table className='table table-bordered'>
                <tbody>
                  <tr>
                    <th>roomtype</th>
                    <td>{roomInfo.roomtype}</td>
                  </tr>
                  <tr>
                    <th>roomPrice</th>
                    <td>${roomInfo.rooomPrice}</td>
                  </tr>
                  
                  <tr>
                    <th>room service</th>
                    <td>
                      <ul className='list-unstyled'>
                        <li>
                        <IoIosWifi /> wifi
                        </li>
                        <li>
                        <FaUtensils /> BreakFst
                        </li>
                        <li>
                        <GiWashingMachine /> Laundary
                        </li>
                        <li>
                        <FaCarAlt /> Parking
                        </li>
                        <li>
                        <IoBeerOutline /> Mini-Bar
                        </li>
                        <li>
                        <FaSnowflake /> Air-Conditioner
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
              )}
          </div>
          <div className='col-md-6'><BookingForm/></div>
        </div>
      </section>
      <div className='container'>
        <RoomCarousel/>
      </div>
    </div>
  )
}

export default CheckOut