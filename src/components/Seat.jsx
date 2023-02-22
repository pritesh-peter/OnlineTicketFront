import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Card, Col, Container, Row } from 'reactstrap';

function Seat({seat,bookedSeats,selectSeat}) {

    const [bookedByMe,setBookedByMe] = useState(false);
    const [booked,setBooked] = useState(false);

    useEffect(()=>{
        if(bookedSeats.length>0){
        let result = bookedSeats.find(item => item.seat.id === seat.id);
            setBooked(result?true:false)
        }else{
            setBooked(false)
        }

    },[seat,bookedSeats])

    const handleSeatsBookedByMe = () =>{
        if(!booked){
            setBookedByMe(!bookedByMe);
            if(bookedByMe){

            }
        }
        selectSeat(seat,bookedByMe);
    }

  return (
    <Col className='md-5'>
        <Card
                onClick={()=>handleSeatsBookedByMe()}
                color={booked?'secondary':bookedByMe?'danger':'success'}
                style={{
                margin:3,
                textAlign:'center',
                alignContent:'center',
                width: '3rem',
                height:'3rem'
                }}
            >
            <h6>{seat.name}</h6>
        </Card> 
        </Col>        
  )
}

export default Seat