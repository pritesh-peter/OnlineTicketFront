import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Input, Row, Table } from 'reactstrap';
import { getCurrentUserDetail, isLoggedIn } from '../../auth';
import Base from "../../components/Base";
import userContext from '../../context/userContext';
import { loadAllBookedSeatDetailsByDate, loadAllSeats } from '../../services/booking-service';


function AdminDashboard() {

    const userContextData = useContext(userContext)
    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)
    const [allSeats,setAllSeats]=useState([]);
    const [bookedSeats,setBookedSeats]=useState([]);
    const [bookingDate,setBookingDate] = useState(null);

    const navigate = useNavigate();


    useEffect(()=> {
        setUser(getCurrentUserDetail())
        setLogin(isLoggedIn())

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
       
      },[])

      const getAllBookedSeatDetails = async (date) =>{
        console.log("datecall",date)
        let data = await loadAllBookedSeatDetailsByDate(1,date);
        if(date){
            setBookedSeats(data);
        }else{
            setBookedSeats([]);

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
        <Table striped>
  <thead>
    <tr>
      <th>
        Booking ID
      </th>
      <th>
        Name
      </th>
      <th>
        Email
      </th>
      <th>
        Seat
      </th>
      <th>
        Price
      </th>
    </tr>
  </thead>
  <tbody>
    {bookedSeats?.map(bookedSeat=>(
        <tr>
        <th scope="row">
          {bookedSeat.id}
        </th>
        <td>
          {bookedSeat.user.name}
        </td>
        <td>
          {bookedSeat.user.email}
        </td>
        <td>
          {bookedSeat.seat.name}
        </td>
        <td>
          {bookedSeat.seat.price}
        </td>
      </tr>

    )
    )
    }
   <tr>
        <td>
          Date
        </td>
        <td>
        <Input
        id="bookingDate"
        name="bookingDate"
        onChange={handleBookingDate}
        value={bookingDate?bookingDate:''}
        type="date"
      />
        </td>
      </tr>
  </tbody>
</Table>
        </Row>
</Container>
    </div>
    </Base>
)
}
    </userContext.Consumer>
  )
  
}

export default AdminDashboard