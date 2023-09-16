import React, { useEffect, useState } from 'react'
import { getAllEvents, getRestaurnatsEvents } from '../../../State/Customers/Restaurant/restaurant.action';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../../../Admin/Events/EventCard';

const CustomerEvents = () => {
  const dispatch=useDispatch()
 
  const {restaurant}=useSelector(store=>store);



  useEffect(()=>{
    dispatch(getAllEvents())
  },[])
  return (
    <div className="mt-5 px-5 flex flex-wrap gap-5">
    {restaurant.events.map((item)=> <div>
      <EventCard isCustomer={true} item={item}/>
    </div>)}
   
  </div>
  )
}

export default CustomerEvents