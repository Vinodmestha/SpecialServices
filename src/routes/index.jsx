import React from 'react'
import { useRouteError, useRoutes } from 'react-router-dom'
import MainRoutes from './MainRoutes'

export default function Routes(props) {
    const error = useRouteError
    const routes = useRoutes([
        {
            path: "/*",
            element: <MainRoutes {...props} />,
            errorElement: <div>Error Page</div>
        },
    ])
    return routes;
}