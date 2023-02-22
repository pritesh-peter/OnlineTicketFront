import { myAxios, privateAxios } from "./helper"

export const  loadAllBookedSeatDetails = async (userId) => {

    return await myAxios.get(`/booking/user/${userId}/seatsavailable`).then(response=>response.data)
};

export const  loadAllBookedSeatDetailsByDate = async (userId,date) => {

    return await myAxios.get(`/booking/user/${userId}/seatsavailable/${date}`).then(response=>response.data)
};

export const  bookSeatService = async (userId,seatId,seats) => {

    return await privateAxios.post(`/booking/user/${userId}/seat/${seatId}`,seats).then(response=>response.data)
};


export const  loadAllSeats = async () => {

    return await myAxios.get(`/seats`).then(response=>response.data)
};