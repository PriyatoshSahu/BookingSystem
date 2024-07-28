import React from 'react'
import axios from "axios"
import { Form } from 'react-bootstrap'
import { GiRuneSword } from 'react-icons/gi'
export const api = axios.create
({baseURL:"http://localhost:9091"})


// The FormData object is used here to send multipart/form-data in the HTTP request body
// Using FormData allows you to construct a set of key/value pairs that correspond to form fields.
//  This is necessary when you're dealing with file uploads (such as images) along with other form data.


export async function addRoom(photo , roomType,  roomPrice){
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)
    
    const response = await api.post("/rooms/add/newroom",formData)

    if(response.status === 201){
        return true
    }
    else{
        return false
    }


}



export async function getAllRoomTypes(){
    try{
        const response = await api.get("/rooms/room/types")
        return response.data

    }

    catch(error){
        throw new Error("error Fetching room types")

    }
   
}


export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all-rooms")
        return result.data
    }
    catch(error){
        throw new Error("error fetching rooms")
    }
}

export async function deleteRooms(room_id){
    try{
        const result = await api.delete(`/rooms/delete/room/${room_id}`)
        return result.data
    }
    catch(error){
        throw new Error(`error fetching rooms ${error.message}`)
        }
}


export async function updateRoom(room_id , roomData){
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)

    const response = await api.put(`/rooms/update/${room_id}`,formData)
    return response
}

export async function getRoomById(roomId){
    try{
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    }
    catch(error){
        throw new Error("error fetching room")
    }
}


// from here the Booking Api started

// to book a room or to save a booking

export async function bookRoom(roomId , booking){
    try{
        const response = await api.post(`/booking/room/${roomId}/booking`, booking)
        return response.data
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }   
        else{
            throw new Error(`error room booking :${error.message}`)
        }
    }
}

export async function getAllBooking(){
    try{
    const result = await api.get("/booking/all-booking")
    return result.data
    }
    catch(error){
        throw new Error (`error fetching bookings : ${error.message}`)
    }
}

export async function getConfirmationCode(confirmation){
    try{
        const result = await api.get(`/booking/confirm/${confirmation}`)
        return result.data
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`error finding booking ${error.message}`)
        }
    }
}


export async function cancelBooking(booking_id){
    try{
        const result = await api.delete(`/booking/booking/${booking_id}`)
        return result.data
    }
    catch(error){
        throw new Error(`error cancel booking ${error.message}`)
    }
}

export async function getallavailableroom(checkInDate,checkOutDate,roomType){

        const result = await api.get(`rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
        return result

}