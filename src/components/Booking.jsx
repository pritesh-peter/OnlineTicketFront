import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Seat from './Seat';
import { bookSeatService, loadAllBookedSeatDetails, loadAllBookedSeatDetailsByDate, loadAllSeatDetails, loadAllSeats } from '../services/booking-service'
import { Button, Col, Container, Input, Row } from 'reactstrap';
import Base from './Base';
import userContext from '../context/userContext'
import { useContext } from 'react';
import { toast } from 'react-toastify';


function Booking() {

    const userContextData = useContext(userContext)

    const [allSeats,setAllSeats]=useState([]);
    const [bookedSeats,setBookedSeats]=useState([]);
    const [bookedSeatByUser,setBookedSeatByUser] = useState([]);
    const [bookingDate,setBookingDate] = useState(null);

    const bookSeat = async () => {
        if(!userContextData.user.login){
            toast.error("Need to login first !!")
            return
        }
        if(bookedSeatByUser.length>0){
            bookedSeatByUser.map(bookedSeat=>{
                bookSeatService(userContextData.user.data.id,bookedSeat.id,{"booked":true,"bookedDate":bookingDate})
                .then(data=>{
                    toast.success("Booked successfully");
                }).catch(error=>{
                    console.log(error);
                })
            })
        }
    }

useEffect(()=>{

    let today = new Date().toISOString().slice(0, 10)    
    setBookingDate(today);

    const getAllSeat = async () =>{
        let data = await loadAllSeats();
        setAllSeats(data);
        }
  
      const getAllBookedSeatDetails = async () =>{
         let data = await loadAllBookedSeatDetailsByDate(1,today);
         setBookedSeats(data);
        }
  
      getAllSeat();
      getAllBookedSeatDetails();
        },[]);

    const getAllBookedSeatDetails = async (date) =>{
        console.log("datecall",date)
        let data = await loadAllBookedSeatDetailsByDate(1,date);
        if(date){
            setBookedSeats(data);
        }else{
            setBookedSeats([]);

        }
        }
     


    const selectSeat = (selectedSeat,bookedByMe) => {
        console.log("Book seat service from seat component",selectedSeat,bookedByMe);
        if(!bookedByMe){
            setBookedSeatByUser([...bookedSeatByUser,selectedSeat]);
        }else{
           let notBookedSeatByUser = bookedSeatByUser.filter(seat=>seat.id !== selectedSeat.id); 
            setBookedSeatByUser(notBookedSeatByUser); 
        }
    }

    const handleBookingDate = (event) => {
        console.log(event);
        setBookingDate(event.target.value);
        getAllBookedSeatDetails(event.target.value);
    }

  return (
    <userContext.Consumer>
    {
        (user) =>(
    <Base>
    <div>
        <Container>
        <Row>
      {  allSeats?.map((seat,i)=>(
        <Seat key={i} seat={seat} bookedSeats={bookedSeats} selectSeat={selectSeat}/>
            
            ))}
        <Row>
    <div>
        <Row>
  <Col>
  <Input
        id="bookingDate"
        name="bookingDate"
        onChange={handleBookingDate}
        value={bookingDate?bookingDate:''}
        type="date"
      />
      </Col>
      <Col>
  <Button
        onClick={()=>bookSeat()}
        color="primary"
    >
    Confirm Booking
    </Button>
    </Col>
    </Row>
    </div>
    </Row>
    </Row>
</Container>
    </div>
    </Base>
)
}
    </userContext.Consumer>
  )
}

export default Booking