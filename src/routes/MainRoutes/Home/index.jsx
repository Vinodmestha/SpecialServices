import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    return (
        <div className='flex justify-center items-center h-screen'>
            <div>
                <button
                    className='py-1 px-3 border-2  rounded-md hover:bg-red-400 hover:text-white mr-4 '
                    onClick={() => {
                        navigate("/seat-layout")
                    }}>
                    Seat Layout
                </button>
                <button className='py-1 px-3 border-2 rounded-md hover:text-white hover:bg-red-400' onClick={() => {
                    navigate("/special-service")
                }}>
                    Special Service
                </button>
            </div>
        </div>
    )
}

export default Home