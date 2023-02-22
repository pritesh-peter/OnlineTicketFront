import React from 'react'
import { useContext } from 'react';
import Base from '../../components/Base';
import userContext from '../../context/userContext';


const ProfileInfo= ()=> {

  const user = useContext(userContext)
  return (
    <Base>
    <div>
        <h1>Welcome  {user.name} to User Info</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis recusandae commodi quo repellat, quae illo voluptatem dolores et at maiores optio quibusdam sequi eveniet suscipit aperiam molestias modi nulla inventore deserunt, asperiores doloremque harum, corrupti voluptate! Ut, dolore, praesentium autem expedita corporis neque quis commodi deleniti voluptatem temporibus, optio eum! Dolor, voluptatibus quos? Voluptatibus ut tenetur quidem aliquam sint atque!</p>
    </div>
    </Base>
  )
}

export default ProfileInfo;