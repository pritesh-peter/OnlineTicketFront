import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ListGroup, ListGroupItem } from 'reactstrap'

function CategorySideMenu() {
   
  return (
    <div>
    <ListGroup>
        <ListGroupItem tag={Link} to="/" action={true} className='border-0'>
            All Shows
        </ListGroupItem>
    </ListGroup>
    </div>
  )
}

export default CategorySideMenu