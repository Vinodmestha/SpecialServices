import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from './Home'
import SeatLayout from '../../components/SeatLayout'
import SpecialService from '../../components/SpecialService'
// import Multicity from './Home/Multicity'

function MainRoutes() {
    const routes = useRoutes([
        {
            path: "/",
            element: <Home />
            // element: <Multicity />
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