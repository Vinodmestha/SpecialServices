import React from 'react'
import { useRoutes } from 'react-router-dom'
// import Home from './Home'
import SeatLayout from '../../components/SeatLayout'
import SpecialService from '../../components/SpecialService'
// import BusSeat from '../../components/BusSeat'
// import Multicity from './Home/Multicity'
import AddPassenger from './Home/AddPassenger'
// import DateSelect from './Home/Calender'
// import BusSeat from './Home/BusSeat'
// import Input from './Home/Input'

function MainRoutes() {
    const routes = useRoutes([
        {
            path: "/",
            element: <AddPassenger />
            // element: <Input />
            // element: <Home />
            // element: <BusSeat />
            // element: <DateSelect />
        },
        {
            path: "/seat-layout",
            element: <SeatLayout />
        },
        {
            path: "/special-service",
            element: <SpecialService />
        }
    ])
    return routes;
}

export default MainRoutes